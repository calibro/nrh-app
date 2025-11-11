<script>
	import { innerHeight } from 'svelte/reactivity/window';
	import BeeswarmDot from './BeeswarmDot.svelte';
	import Beeswarm from './Beeswarm.svelte';
	import { dodgeCircles } from './beeswarm.js';
	import { scaleLinear } from 'd3-scale';

	const { data, extentX } = $props();

	const minHeight = 200;
	const radius = 4;
	const padding = 1;
	const r = radius * 2 + padding;
	const margins = { top: 16, right: 16, bottom: 16, left: 16 };

	let wrapperWidth = $state(0);

	let beeswarmHeight = $derived.by(() => {
		const _height = (innerHeight.current || 0) / data.length;
		return _height < minHeight ? minHeight : _height;
	});

	let svgHeight = $derived(beeswarmHeight * data.length);

	const x = $derived(
		scaleLinear()
			.domain(extentX)
			.range([0, wrapperWidth - margins.left - margins.right])
	);

	// Calculate all positions at the wrapper level
	const allDots = $derived.by(() => {
		const dots = [];
		data.forEach((group, groupIndex) => {
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
</script>

<div class="w-100 h-100" bind:clientWidth={wrapperWidth}>
	<!-- <svg width={wrapperWidth} height={svgHeight}>
		{#each data as group, index}
			<g transform={`translate(0, ${index * beeswarmHeight})`}>
				<Beeswarm
					data={group.value.items}
					key={group.key}
					width={wrapperWidth}
					height={beeswarmHeight}
					{extentX}
				/>
			</g>
		{/each}
	</svg> -->
	<svg width={wrapperWidth} height={svgHeight}>
		{#each data as group, index}
			<g transform={`translate(${margins.left}, ${index * beeswarmHeight + margins.top})`}>
				<text x={0} y={0} alignment-baseline="hanging">{group.key || 'Not set'}</text>
			</g>
		{/each}

		<g transform={`translate(${margins.left}, ${margins.top})`}>
			{#each allDots as dot (dot.id)}
				<BeeswarmDot element={dot.element} {radius} height={beeswarmHeight} yOffset={dot.yOffset} />
			{/each}
		</g>
	</svg>
</div>
