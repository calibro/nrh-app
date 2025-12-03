<script>
	import { extent } from 'd3-array';
	import { createDatabase } from '$lib/crossfilter.svelte.js';
	import BeeswarmWrapper from '$lib/BeeswarmWrapper.svelte';
	import Sidebar from '$lib/Sidebar.svelte';
	import MenuSidebar from '$lib/MenuSidebar.svelte';
	import { mediaQuery } from '$lib/utils.svelte.js';
	import DetailSource from '$lib/DetailSource.svelte';

	const { data } = $props();

	let database = createDatabase();
	database.records = data.sources;

	const extentX = $derived.by(() => extent([...database.items], (d) => d.date));

	const sm = mediaQuery('(max-width: 767px)');
</script>

<div class="layout d-flex flex-column position-relative">
	{#if !sm.current}
		<Sidebar />
	{:else}
		<MenuSidebar />
	{/if}
	<div class="main-content">
		<div class="container-fluid min-height-100">
			<BeeswarmWrapper {extentX} />
		</div>
	</div>
	{#if sm.current}
		<DetailSource />
	{/if}
</div>

<style>
	.layout {
		/* display: block; */
		max-height: 100vh;
		min-height: 100vh;
		overflow: hidden;
	}

	.main-content {
		margin-left: 0;
		flex: 1 1 100%;
		overflow: scroll;
		/* width: 768px; */
	}

	.min-height-100 {
		height: 100%;
	}

	@media (min-width: 768px) {
		.layout {
			/* display: flex; */
			overflow: hidden;
			min-height: 100vh;
		}

		.main-content {
			margin-left: var(--nrh-sidebar-width);
			overflow: scroll;
			width: unset;
		}
	}
</style>
