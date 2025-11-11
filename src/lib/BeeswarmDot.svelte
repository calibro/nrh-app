<script>
	import { Tween } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	const { element, radius, height, yOffset = 0 } = $props();

	const cx = new Tween(element.x, { easing: cubicOut });
	const cy = new Tween(yOffset + height / 2 - element.y, { easing: cubicOut });

	$effect(() => {
		cx.set(element.x);
		cy.set(yOffset + height / 2 - element.y);
	});

	const tweenedCx = $derived(cx.current);
	const tweenedCy = $derived(cy.current);
</script>

<circle
	class="source"
	class:document={element.data.collection === 'Fonti scritte'}
	class:icon={element.data.collection === 'Fonti iconografiche'}
	cx={tweenedCx}
	cy={tweenedCy}
	r={radius}
	onclick={() => console.log(element)}
>
</circle>

<style>
	.source {
		cursor: pointer;
		fill-opacity: 0.7;
	}

	.document {
		fill: #d86154;
		stroke: #d86154;
	}

	.icon {
		fill: #005ab5;
		stroke: #005ab5;
	}
</style>
