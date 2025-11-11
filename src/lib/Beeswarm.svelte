<script>
	import { dodgeCircles } from './beeswarm.js';
	import { scaleLinear } from 'd3-scale';
	import { extent } from 'd3-array';
	import BeeswarmDot from './BeeswarmDot.svelte';

	const {
		data,
		key,
		width,
		height,
		margins = { top: 16, right: 16, bottom: 16, left: 16 },
		extentX
	} = $props();

	const radius = 4;
	const padding = 1;
	const r = radius * 2 + padding;

	const x = $derived(
		scaleLinear()
			.domain(extentX)
			.range([0, width - margins.left - margins.right])
	);

	const dodgedData = $derived(
		dodgeCircles(data, {
			x: (d) => x(d.date),
			r: radius,
			padding: padding,
			anchor: 'middle'
		})
	);
</script>

<g transform={`translate(${margins.left}, ${margins.top})`}>
	<text x={0} y={0} alignment-baseline="hanging">{key}</text>
	{#each dodgedData as element (element.data.id)}
		<BeeswarmDot {element} {radius} {height} />
	{/each}
</g>
