<script>
	import { innerHeight } from 'svelte/reactivity/window';
	import { scaleLinear, scaleTime } from 'd3-scale';
	import { axisBottom } from 'd3-axis';
	import { select } from 'd3-selection';
	import 'd3-transition';
	import BeeswarmDot from '$lib/BeeswarmDot.svelte';
	import BeeswarmLabel from '$lib/BeeswarmLabel.svelte';
	import { dodgeCircles } from '$lib/beeswarm.js';

	const { data, extentX } = $props();

	const minHeight = 200;
	const radius = 4;
	const padding = 2;
	const r = radius * 2 + padding;
	const marginBottom = 25;
	const margins = { top: 16, right: 16, bottom: marginBottom, left: 16 };

	let wrapperWidth = $state(0);

	let xAxisG;

	let beeswarmHeight = $derived.by(() => {
		const _height = (innerHeight.current || 0) / data.length;
		return _height < minHeight ? minHeight : _height;
	});

	let svgHeight = $derived.by(() => beeswarmHeight * data.length || 0);

	const x = $derived(
		scaleLinear()
			.domain(extentX)
			.range([0, wrapperWidth - margins.left - margins.right])
	);

	let xScaleTime = $derived(
		scaleTime()
			.domain(extentX.map((d) => new Date(d, 0, 1)))
			.rangeRound([0, wrapperWidth - margins.left - margins.right])
	);

	let xAxis = $derived(
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

	$effect(() => {
		if (xAxisG) select(xAxisG).transition().duration(300).call(xAxis);
	});
</script>

<div class="w-100 h-100 position-relative" bind:clientWidth={wrapperWidth}>
	<svg width={wrapperWidth} height={svgHeight} class="position-relative">
		{#each data as group, index (group.key)}
			{#if group.key !== 'none'}
				<g transform={`translate(${margins.left}, ${index * beeswarmHeight + margins.top})`}>
					<BeeswarmLabel key={group.key} count={group.value.count} />
				</g>
			{/if}
		{/each}

		<g transform={`translate(${margins.left}, ${margins.top})`}>
			{#each allDots as dot (dot.id)}
				<BeeswarmDot element={dot.element} {radius} height={beeswarmHeight} yOffset={dot.yOffset} />
			{/each}
		</g>
	</svg>
	<svg class="axisSvg position-fixed top-0" width={wrapperWidth} height={innerHeight.current || 0}>
		<g transform="translate({margins.left},{(innerHeight.current || 0) - marginBottom})">
			<rect
				x="0"
				y="0"
				width={wrapperWidth - margins.left - margins.right}
				height={marginBottom}
				fill="white"
			/>
		</g>
		<g
			class="axis fs-7"
			bind:this={xAxisG}
			transform="translate({margins.left},{(innerHeight.current || 0) - marginBottom})"
		/>
	</svg>
</div>

<style>
	.axisSvg {
		left: calc(300px + 12px); /* Same as sidebar width */
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
</style>
