<script>
	import { getInterface } from '$lib/interface.svelte.js';
	import SidebarMobile from './SidebarMobile.svelte';

	let interfaceState = getInterface();
	function toggleMenu() {
		interfaceState.menuMobileOpen = !interfaceState.menuMobileOpen;
	}
</script>

<div class="menuWrapper flex-grow-0 flex-shrink-0 overflow-visible px-2 z-1">
	<div class="d-flex bg-light align-items-baseline justify-content-between ps-2 my-2 rounded">
		<h5 class="my-3">Visual Rights History</h5>
		<button class="btn btn-link text-dark text-decoration-none" onclick={toggleMenu}
			>{interfaceState.menuMobileOpen ? 'Close' : 'Show'} options
			<i class="bi bi-{interfaceState.menuMobileOpen ? 'x-circle' : 'gear-fill'}"></i></button
		>
	</div>

	<SidebarMobile />
</div>

<style>
	.menuWrapper {
		--nrh-sidebar-mobile-height: 76px;
		height: var(--nrh-sidebar-mobile-height);
	}
</style>
