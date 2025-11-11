import IntervalTree from "interval-tree-1d";

/**
 * Dodge circles along a line to prevent overlaps
 * @param {Array} data - Array of data points
 * @param {Object} options - Configuration options
 * @param {Function} options.x - Accessor function for x position
 * @param {Function|number} options.r - Accessor function or constant for radius
 * @param {number} options.padding - Padding between circles (default: 1)
 * @param {string} options.anchor - Anchor position: 'left', 'right', or 'middle' (default: 'middle')
 * @returns {Array} Array of objects with {data, x, y} properties
 */
export function dodgeCircles(data, options = {}) {
    const {
        x: xAccessor,
        r: rAccessor = 3,
        padding = 1,
        anchor = 'middle'
    } = options;

    if (!xAccessor) throw new Error('x accessor function is required');

    // Determine radius function
    const radius = typeof rAccessor === 'function'
        ? rAccessor
        : () => rAccessor;

    // Determine anchor direction
    const ky = anchor === 'left' ? 1 : anchor === 'right' ? -1 : 0;
    const compare = ky ? compareAscending : compareSymmetric;

    // Extract X positions and sort indices
    const circles = data.map((d, i) => ({
        data: d,
        x: xAccessor(d),
        r: radius(d, i),
        index: i
    })).filter(d => isFinite(d.x) && d.r > 0);

    circles.sort((a, b) => a.x - b.x);

    const Y = new Array(circles.length);
    const tree = IntervalTree();
    const intervals = new Float64Array(2 * circles.length + 2);

    for (let idx = 0; idx < circles.length; idx++) {
        const circle = circles[idx];
        const ri = circle.r;
        const xi = circle.x;

        // Offset baseline for varying radius
        const y0 = ky ? ri + padding : 0;
        const l = xi - ri;
        const h = xi + ri;

        // Start with baseline positions
        let k = 2;
        intervals[0] = 0;
        intervals[1] = 0;

        // Query overlapping circles and compute tangent positions
        tree.queryInterval(l - padding, h + padding, ([, , j]) => {
            const other = circles[j];
            const yj = Y[j] - y0;
            const dx = xi - other.x;
            const dr = padding + ri + other.r;
            const dy = Math.sqrt(dr * dr - dx * dx);
            intervals[k++] = yj - dy;
            intervals[k++] = yj + dy;
        });

        // Find best y-position
        let candidates = intervals.slice(0, k);
        if (ky) candidates = candidates.filter((y) => y >= 0);

        out: for (const y of candidates.sort(compare)) {
            for (let j = 0; j < k; j += 2) {
                if (intervals[j] + 1e-6 < y && y < intervals[j + 1] - 1e-6) {
                    continue out;
                }
            }
            Y[idx] = y + y0;
            break;
        }

        // Insert into interval tree
        tree.insert([l, h, idx]);
    }

    // Apply anchor transformation
    return circles.map((circle, idx) => ({
        data: circle.data,
        x: circle.x,
        y: Y[idx] * (ky || 1)
    }));
}

function compareSymmetric(a, b) {
    return Math.abs(a) - Math.abs(b);
}

function compareAscending(a, b) {
    return a - b;
}