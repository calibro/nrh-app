<script>
	import { fade } from 'svelte/transition';
	import { Tween } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import Tooltip from '$lib/Tooltip.svelte';
	const { element, radius, height, yOffset = 0 } = $props();

	const cx = new Tween(element.x, { easing: cubicOut });
	const cy = new Tween(yOffset + height / 2 - element.y, { easing: cubicOut });

	const tweenedCx = $derived(cx.current);
	const tweenedCy = $derived(cy.current);

	const baseUrl = 'https://naturalrightshistory-staging.medialibrary.it/media/schedadl.aspx?id=';

	let open = $state(false);

	$effect(() => {
		cx.set(element.x);
		cy.set(yOffset + height / 2 - element.y);
	});
</script>

<Tooltip bind:open disableHoverableContent={false}>
	{#snippet trigger(props)}
		<circle
			transition:fade
			class="source"
			class:document={element.data.collection === 'Fonti scritte'}
			class:icon={element.data.collection === 'Fonti iconografiche'}
			cx={tweenedCx}
			cy={tweenedCy}
			r={radius}
			{...(({ type, ...rest }) => rest)(props)}
		>
		</circle>
	{/snippet}
	<div class="tooltipContent rounded shadow-sm d-flex bg-white border">
		<div class="imgContainer bg-secondary-subtle p-3 flex-shrink-0 flex-grow-0 border-end">
			<img
				src={element.data.thumb}
				alt={element.data.title}
				class="w-100 h-100 object-fit-contain"
			/>
		</div>
		<div
			class="p-2 d-flex flex-column justify-content-between flex-grow-1 overflow-hidden position-relative"
		>
			<div>
				<div class="fs-7">{element.data.author}</div>
				<h6 class="mb-0 line-clamp">{element.data.title}</h6>
				<div class="fs-7">{element.data.date}</div>
			</div>

			<a href={baseUrl + element.data.id} target="_blank" class="btn btn-dark btn-sm rounded-pill"
				>Open in Collection <i class="bi bi-arrow-up-right"></i></a
			>
			<button
				class="btn btn-sm btn-link text-dark position-absolute top-0 end-0"
				onclick={() => (open = false)}
				aria-label="close"><i class="bi bi-x-circle"></i></button
			>
		</div>
	</div>
</Tooltip>

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

	.tooltipContent {
		width: 440px;
		height: 150px;
	}

	.imgContainer {
		width: 150px;
		height: 100%;
	}

	.line-clamp {
		display: -webkit-box;
		-webkit-line-clamp: 3;
		line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>
