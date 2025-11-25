<script>
	import { watch } from 'runed';
	import { slide } from 'svelte/transition';
	import { getDatabaseContext } from '$lib/crossfilter.svelte.js';
	import CategoryFilterInput from '$lib/CategoryFilterInput.svelte';
	import { periods } from '$lib/utils.svelte.ts';
	const { dimension } = $props();

	let database = getDatabaseContext();
	let categories = $state([]);
	let selection = $state([]);
	let open = $state(false);

	watch(
		() => database.groups[dimension],
		(group) => {
			categories = [...group.all()].sort((a, b) => {
				if (dimension === 'Historical Area') {
					return (
						periods.map((p) => p.label).indexOf(a.key) - periods.map((p) => p.label).indexOf(b.key)
					);
				} else {
					return true;
				}
			});
		}
	);

	const max = $derived(Math.max(...categories.map((d) => d.value.count)));

	watch(
		() => selection,
		(selection) => {
			if (selection.length === 0) {
				database.dims[dimension].filterAll();
			} else {
				database.dims[dimension].filterFunction((d) => selection.includes(d));
			}
		}
	);

	// Expose reset method to parent
	export function reset() {
		selection = [];
	}
</script>

<div>
	<div
		class="position-sticky top-0 z-1 d-flex align-items-center justify-content-between border-bottom border-top bg-light"
	>
		<div class="d-flex align-items-center gap-1 px-2">
			<div class="text-capitalize">{dimension}</div>
			{#if selection.length}
				<div class="p-1 bg-warning border border-light rounded-circle">
					<span class="visually-hidden">Filter active</span>
				</div>
			{/if}
		</div>

		<button class="btn" onclick={() => (open = !open)} aria-label="Toggle filter options">
			<i class="bi bi-{open ? 'dash' : 'plus'}-circle"></i>
		</button>
	</div>
	{#if open}
		<div transition:slide>
			{#each categories as category}
				<CategoryFilterInput {category} bind:selection {max} />
			{/each}
		</div>
	{/if}
</div>
