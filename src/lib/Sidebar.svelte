<script>
	import TimeFilter from '$lib/TimeFilter.svelte';
	import { getInterface } from '$lib/interface.svelte.js';
	import Filters from '$lib/Filters.svelte';
	import Legend from '$lib/Legend.svelte';

	let interfaceState = getInterface();
</script>

<div id="sidebar" class="position-fixed top-0 start-0 bg-light overflow-y-auto px-2 pb-2">
	<h5 class="my-3">Visual Rights History</h5>
	<Legend />
	<div class="mb-4">
		<div class="text-uppercase fs-7 mb-1">Group sources by</div>
		<select class="form-select" bind:value={interfaceState.groupDimension}>
			<option value="country">Country</option>
			<option value="period">Period</option>
		</select>
	</div>

	<TimeFilter />
	<Filters />
</div>

<style>
	#sidebar {
		width: 300px;
		height: 100vh;
	}
</style>
