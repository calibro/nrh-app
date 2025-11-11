<script>
	import TimeFilter from '$lib/TimeFilter.svelte';
	import { getInterface } from '$lib/interface.svelte.js';
	import Filters from '$lib/Filters.svelte';
	import Legend from '$lib/Legend.svelte';

	let interfaceState = getInterface();

	function toggleFullscreen() {
		if (!document.fullscreenElement) {
			document.documentElement.requestFullscreen();
		}
	}
</script>

<div
	id="sidebar"
	class="position-fixed top-0 start-0 bg-light overflow-y-auto px-3 pb-3 d-flex flex-column"
>
	<div>
		<h5 class="my-3">Visual Rights History</h5>
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
		<button
			class="btn btn-link btn-sm text-dark"
			onclick={toggleFullscreen}
			aria-label="view full screen"><i class="bi bi-arrows-fullscreen"></i></button
		>View in full screen
	</div>
</div>

<style>
	#sidebar {
		width: 300px;
		height: 100vh;
	}
</style>
