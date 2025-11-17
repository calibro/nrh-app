<script>
	import CategoryFilter from '$lib/CategoryFilter.svelte';
	import { getDatabaseContext } from '$lib/crossfilter.svelte.js';

	let database = getDatabaseContext();
	const filtersDimensions = ['subject', 'author', 'language', 'country'];

	let filterComponents = $state({});

	function reset() {
		filtersDimensions.forEach((dimension) => {
			database.dims[dimension].filterAll();
			filterComponents[dimension]?.reset();
		});
	}
</script>

<div class="mb-3">
	<div class="d-flex align-items-center">
		<div class="text-uppercase fs-7">filters</div>
		<button class="btn btn-sm ms-auto" onclick={reset}>Reset</button>
	</div>
	{#each filtersDimensions as dimension}
		<CategoryFilter {dimension} bind:this={filterComponents[dimension]} />
	{/each}
</div>
