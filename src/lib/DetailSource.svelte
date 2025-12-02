<script>
	import { slide } from 'svelte/transition';
	import { getInterface } from '$lib/interface.svelte.js';
	let interfaceState = getInterface();

	const baseUrl = 'https://naturalrightshistory-staging.medialibrary.it/media/schedadl.aspx?id=';
</script>

{#if interfaceState.selectedSource}
	<div
		transition:slide={{ axis: 'y' }}
		class="tooltipContent position-fixed bottom-0 shadow-sm d-flex bg-white border-top"
	>
		<div class="imgContainer bg-secondary-subtle p-3 flex-shrink-0 flex-grow-0 border-end">
			<img
				src={interfaceState.selectedSource.data.thumb}
				alt={interfaceState.selectedSource.data.title}
				class="w-100 h-100 object-fit-contain"
			/>
		</div>
		<div
			class="p-2 d-flex flex-column justify-content-between flex-grow-1 overflow-hidden position-relative"
		>
			<div>
				<div class="fs-7">{interfaceState.selectedSource.data.author}</div>
				<h6 class="mb-0 line-clamp">{interfaceState.selectedSource.data.title}</h6>
				<div class="fs-7">{interfaceState.selectedSource.data.date}</div>
			</div>

			<a
				href={baseUrl + interfaceState.selectedSource.data.id}
				target="_blank"
				class="btn btn-dark btn-sm rounded-pill"
				>Open in Collection <i class="bi bi-arrow-up-right"></i></a
			>
			<button
				class="btn btn-sm btn-link text-dark position-absolute top-0 end-0"
				onclick={() => (interfaceState.selectedSource = null)}
				aria-label="close"><i class="bi bi-x-circle"></i></button
			>
		</div>
	</div>
{/if}

<style>
	.tooltipContent {
		width: 100%;
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
