<script>
	import { extent } from 'd3-array';
	import { createDatabase } from '$lib/crossfilter.svelte.js';
	import BeeswarmWrapper from '$lib/BeeswarmWrapper.svelte';
	import Sidebar from '$lib/Sidebar.svelte';

	const { data } = $props();

	let database = createDatabase();
	database.records = data.sources;

	const extentX = $derived.by(() => extent([...database.items], (d) => d.date));
</script>

<div class="layout">
	<Sidebar />
	<div class="main-content">
		<div class="container-fluid min-height-100">
			<BeeswarmWrapper {extentX} />
		</div>
	</div>
</div>

<style>
	.layout {
		display: block;
		min-height: 100vh;
		overflow: scroll;
	}

	.main-content {
		margin-left: 0;
		flex: 1;
		overflow: hidden;
		width: 768px;
	}

	.min-height-100 {
		height: 100%;
	}

	@media (min-width: 768px) {
		.layout {
			display: flex;
			overflow: hidden;
		}

		.main-content {
			margin-left: var(--nrh-sidebar-width);
			overflow: hidden;
			width: unset;
		}
	}
</style>
