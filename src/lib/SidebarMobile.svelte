<script>
	import { fade } from 'svelte/transition';
	import TimeFilter from '$lib/TimeFilter.svelte';
	import { getInterface } from '$lib/interface.svelte.js';
	import Filters from '$lib/Filters.svelte';
	import Legend from '$lib/Legend.svelte';
	import Fullscreen from '$lib/Fullscreen.svelte';
	import Howto from '$lib/Howto.svelte';

	let interfaceState = getInterface();
</script>

{#if interfaceState.menuMobileOpen}
	<div
		transition:fade
		id="sidebar-mobile"
		class="bg-light overflow-y-auto px-3 py-3 d-flex flex-column rounded border"
	>
		<div>
			<Legend />
			<div class="mb-4">
				<div class="text-uppercase fs-7 mb-1">Group sources by</div>
				<select class="form-select" bind:value={interfaceState.groupDimension}>
					<option value="none">Default</option>
					<option value="Geographical Area">Geographical Area</option>
					<option value="Historical Area">Historical Area</option>
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
{/if}

<style>
	#sidebar-mobile {
		width: 100%;
		height: calc(100vh - var(--nrh-sidebar-mobile-height) - 5px);
	}
</style>
