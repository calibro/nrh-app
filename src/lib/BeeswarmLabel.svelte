<script>
	const { key, count } = $props();
	let contentRect = $state();
	const padding = 4;
</script>

<g transform={`translate(${padding * 3}, ${padding * 4})`}>
	<rect
		x={-padding}
		y={-padding}
		rx={padding}
		ry={padding}
		transform={`translate(0, -2)`}
		width={(contentRect?.width || 0) + padding * 2}
		height={(contentRect?.height || 0) + padding * 2}
		class="bwLabel"
	></rect>
	<text bind:contentRect fill="white" font-size="0.85rem" x={0} y={0} dominant-baseline="hanging"
		>{key || 'Not set'} [{count}]</text
	>
</g>

<style>
	.bwLabel {
		fill: var(--bs-secondary);
	}
</style>
