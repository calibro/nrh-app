<script>
	import TimeFilter from '$lib/TimeFilter.svelte';
	import { getInterface } from '$lib/interface.svelte.js';
	import Filters from '$lib/Filters.svelte';
	import Legend from '$lib/Legend.svelte';
	import Fullscreen from '$lib/Fullscreen.svelte';
	import Howto from '$lib/Howto.svelte';

	let interfaceState = getInterface();
</script>

<div
	id="sidebar"
	class="position-fixed top-0 start-0 bg-light overflow-y-auto px-3 pb-3 d-flex flex-column"
>
	<div>
		<h4 class="my-3">Visual Rights History</h4>
		<Legend />
		<div class="mb-4">
			<div class="text-uppercase fs-7 mb-1">Group sources by</div>
			<select class="form-select" bind:value={interfaceState.groupDimension}>
				<option value="country">Country</option>
				<option value="period">Period</option>
				<option value="none">Default</option>
			</select>
		</div>

		<TimeFilter />
		<Filters />
	</div>
	<div class="mt-auto">
		<div>
			<Howto />
		</div>
		<div>
			<Fullscreen />
		</div>
	</div>
</div>

<style>
	#sidebar {
		width: var(--nrh-sidebar-width);
		height: 100vh;
	}
</style>
