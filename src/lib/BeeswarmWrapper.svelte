<script>
	import { innerHeight } from 'svelte/reactivity/window';
	import { scaleLinear, scaleTime } from 'd3-scale';
	import { axisBottom } from 'd3-axis';
	import { select } from 'd3-selection';
	import { descending } from 'd3-array';
	import 'd3-transition';
	import BeeswarmDot from '$lib/BeeswarmDot.svelte';
	import BeeswarmLabel from '$lib/BeeswarmLabel.svelte';
	import { dodgeCircles } from '$lib/beeswarm.js';
	import { watch } from 'runed';
	import { Tooltip } from 'bits-ui';
	import { getDatabaseContext } from '$lib/crossfilter.svelte.js';
	import { getInterface } from '$lib/interface.svelte.js';

	const { extentX } = $props();

	let interfaceState = getInterface();
	let database = getDatabaseContext();
	let groups = $state([]);

	const minHeight = 200;
	const radius = 4;
	const padding = 2;
	const r = radius * 2 + padding;
	const marginBottom = 25;
	const margins = { top: 16, right: 16, bottom: marginBottom, left: 16 };

	let wrapperWidth = $state(0);

	let xAxisG;

	const chartHeight = $derived.by(() => (innerHeight.current || 0) - margins.top - margins.bottom);

	let beeswarmHeight = $derived.by(() => {
		const _height = chartHeight / groups.length;
		return _height < minHeight ? minHeight : _height;
	});

	let svgHeight = $derived.by(
		() => beeswarmHeight * groups.length + margins.top + margins.bottom || 0
	);

	const x = $derived(
		scaleLinear()
			.domain(extentX)
			.range([0, wrapperWidth - margins.left - margins.right])
	);

	const xScaleTime = $derived(
		scaleTime()
			.domain(extentX.map((d) => new Date(d, 0, 1)))
			.rangeRound([0, wrapperWidth - margins.left - margins.right])
	);

	const xAxis = $derived(
		axisBottom()
			.scale(xScaleTime)
			.tickSize(-(innerHeight.current || 0))
			.tickPadding(8)
			.tickSizeOuter(0)
		//.tickValues(xScaleTime.ticks().map((d) => d.getFullYear()))
	);

	// Calculate all positions at the wrapper level
	const allDots = $derived.by(() => {
		const dots = [];
		groups.forEach((group, groupIndex) => {
			const dodgedData = dodgeCircles(group.value.items, {
				x: (d) => x(d.date),
				r: radius,
				padding: padding,
				anchor: 'middle'
			});

			dodgedData.forEach((element) => {
				dots.push({
					id: element.data.id,
					element,
					groupIndex,
					groupKey: group.key,
					yOffset: groupIndex * beeswarmHeight
				});
			});
		});
		return dots;
	});

	watch(
		() => database.groups[interfaceState.groupDimension],
		(group) => {
			if (interfaceState.groupDimension === 'none') {
				groups = [{ key: 'none', value: { items: [...database.items] } }];
			} else {
				const countryFilters = [];
				if (interfaceState.groupDimension === 'country') {
					database.dims[interfaceState.groupDimension].top(Infinity).forEach((item) => {
						const value = item[interfaceState.groupDimension];
						if (!countryFilters.includes(value)) {
							countryFilters.push(value);
						}
					});
				}

				groups = [...group.all()]
					.filter((d) => d.value.count > 0)
					.filter((d) => {
						if (interfaceState.groupDimension === 'country') {
							return countryFilters.includes(d.key);
						} else {
							return true;
						}
					})
					.sort((a, b) => {
						if (interfaceState.groupDimension === 'period') {
							return true;
						} else {
							return descending(a.value.count, b.value.count);
						}
					});
			}
		}
	);

	$effect(() => {
		if (xAxisG) select(xAxisG).transition().duration(300).call(xAxis);
	});
</script>

<Tooltip.Provider delayDuration={200}>
	<div class="w-100 h-100 position-relative" bind:clientWidth={wrapperWidth}>
		<svg width={wrapperWidth} height={svgHeight} class="position-relative">
			{#each groups as group, index}
				{#if group.key !== 'none'}
					<g transform={`translate(${margins.left}, ${index * beeswarmHeight + margins.top})`}>
						<BeeswarmLabel key={group.key} count={group.value.count} />
					</g>
				{/if}
			{/each}

			<g transform={`translate(${margins.left}, ${margins.top})`}>
				{#each allDots as dot (dot.id)}
					<BeeswarmDot
						element={dot.element}
						{radius}
						height={beeswarmHeight}
						yOffset={dot.yOffset}
					/>
				{/each}
			</g>
		</svg>
		<svg class="axisSvg top-0" width={wrapperWidth} height={innerHeight.current || 0}>
			<g transform="translate(0,{(innerHeight.current || 0) - marginBottom})">
				<rect x="0" y="0" width={wrapperWidth} height={marginBottom} fill="white" />
			</g>
			<g
				class="axis fs-7"
				bind:this={xAxisG}
				transform="translate({margins.left},{(innerHeight.current || 0) - marginBottom})"
			/>
			<g transform="translate({margins.left},{(innerHeight.current || 0) - marginBottom})">
				<text x="0" y="-4" font-size="0.85rem" fill-opacity="0.65">Publication date →</text>
			</g>
		</svg>
	</div>
</Tooltip.Provider>

<style>
	.axisSvg {
		left: 12px;
		position: absolute;
		pointer-events: none;
	}
	.axis :global(.tick text) {
		font-size: 0.75rem;
	}

	.axis :global(.tick line) {
		stroke-opacity: 0.25;
		/* stroke-dasharray: 2, 2; */
	}
	.axis :global(path.domain) {
		stroke-opacity: 0.25;
		/* stroke-dasharray: 2, 2; */
	}

	@media (min-width: 768px) {
		.axisSvg {
			left: calc(var(--nrh-sidebar-width) + 12px);
			position: fixed;
		}
	}
</style>
