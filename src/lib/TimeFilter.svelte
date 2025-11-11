<script>
	import { extent, range } from 'd3-array';
	import { watch } from 'runed';
	import { getDatabaseContext } from '$lib/crossfilter.svelte.js';

	let database = getDatabaseContext();
	let objects = $derived([...database.groups['date'].all()]);

	let chartData = $derived.by(() => {
		let _data = objects.filter((e) => e.key != '');
		let bounds = extent(_data, (d) => d.key);
		let daterange = range(bounds[0], bounds[1] + 1);
		_data = daterange.map((d) => {
			let year = _data.find((e) => e.key === d);
			if (year) {
				return { key: d, value: year.value.count };
			} else {
				return { key: d, value: 0 };
			}
		});
		return _data;
	});

	let minX = $derived(Math.min(...chartData.map((d) => +d.key)));
	let maxX = $derived(Math.max(...chartData.map((d) => +d.key)) + 1);

	let displayRangeMin = $state();
	let displayRangeMax = $state();

	function reset() {
		displayRangeMin = minX;
		displayRangeMax = maxX;
		database.dims['date'].filterAll();
	}

	watch(
		[() => displayRangeMin, () => displayRangeMax],
		([displayRangeMin, displayRangeMax]) => {
			database.dims['date'].filterRange([displayRangeMin, displayRangeMax]);
		},
		{ lazy: true }
	);
</script>

<div class="mb-4">
	<div class="d-flex align-items-center">
		<div class="text-uppercase fs-7">Publication date filter</div>
		<button class="btn btn-sm ms-auto" onclick={reset}>Reset</button>
	</div>
	<div class="d-flex align-items-center">
		<div class="col-auto">
			<input
				class="form-control"
				type="number"
				min={minX}
				max={displayRangeMax + 1}
				step="1"
				defaultValue={minX}
				bind:value={displayRangeMin}
			/>
		</div>
		<div class="mx-2">–</div>
		<div class="col-auto">
			<input
				class="form-control"
				type="number"
				min={displayRangeMin + 1}
				max={maxX}
				defaultValue={maxX}
				step="1"
				bind:value={displayRangeMax}
			/>
		</div>
	</div>
</div>
