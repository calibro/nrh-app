<script>
	import { extent, descending } from 'd3-array';
	import { createDatabase } from '$lib/crossfilter.svelte.js';
	import { getInterface } from '$lib/interface.svelte.js';
	import BeeswarmWrapper from '$lib/BeeswarmWrapper.svelte';
	import Sidebar from '$lib/Sidebar.svelte';

	const { data } = $props();

	let database = createDatabase();
	database.records = data.sources;

	let interfaceState = getInterface();

	const groups = $derived.by(() => {
		if (interfaceState.groupDimension === 'none') {
			return [{ key: 'none', value: { items: [...database.items] } }];
		} else {
			return [...database.groups[interfaceState.groupDimension].all()].filter(
				(d) => d.value.count > 0
			);
			// .sort((a, b) => {
			// 	if (interfaceState.groupDimension === 'period') {
			// 		return true;
			// 	} else {
			// 		return descending(a.value.count, b.value.count);
			// 	}
			// });
		}
	});

	const extentX = $derived.by(() => extent([...database.items], (d) => d.date));
</script>

<div class="layout">
	<Sidebar />
	<div class="main-content">
		<div class="container-fluid min-height-100">
			<BeeswarmWrapper data={groups} {extentX} />
		</div>
	</div>
</div>

<style>
	.layout {
		display: flex;
		min-height: 100vh;
		overflow: hidden;
	}

	.main-content {
		margin-left: 300px;
		flex: 1;
		overflow: hidden;
	}

	.min-height-100 {
		height: 100%;
	}
</style>
