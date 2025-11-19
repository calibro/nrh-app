<script>
	import { watch } from 'runed';
	import { getDatabaseContext } from '$lib/crossfilter.svelte.js';
	const database = getDatabaseContext();

	let written = $state([]);
	let iconographic = $state([]);

	watch(
		() => database.groups['collection'],
		(group) => {
			written = [...group.all()].find((d) => d.key === 'Fonti scritte');
			iconographic = [...group.all()].find((d) => d.key === 'Fonti iconografiche');
		}
	);
</script>

<div class="mb-3">
	<div class="d-flex align-items-center gap-2">
		<div class="p-1 bg-danger bg-opacity-75 border border-danger rounded-circle"></div>
		<div class="fs-7">Written sources [{written?.value?.count}]</div>
	</div>
	<div class="d-flex align-items-center gap-2">
		<div class="p-1 bg-primary bg-opacity-75 border border-primary rounded-circle"></div>
		<div class="fs-7">Iconographic sources [{iconographic?.value?.count}]</div>
	</div>
</div>
