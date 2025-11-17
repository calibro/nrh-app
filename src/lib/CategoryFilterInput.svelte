<script>
	let { category, selection = $bindable(), max } = $props();

	const key = $derived(category?.key);
	const count = $derived(category?.value.count);
	const checked = $derived(selection.includes(key));

	function toggleSelection() {
		if (checked) {
			selection = selection.filter((s) => s !== key);
		} else {
			selection = [...selection, key];
		}
	}
</script>

<div class="position-relative px-2 py-1 border-bottom">
	<div
		class="bar position-absolute top-0 start-0 h-100 bg-secondary-subtle border-end border-dark-subtle"
		style="width: {(count / max) * 100}%;"
	></div>
	<div class="form-check position-relative">
		<input
			class="form-check-input"
			type="checkbox"
			{checked}
			onchange={toggleSelection}
			value={key}
			id={key}
			disabled={count === 0}
		/>
		<label class="form-check-label d-flex justify-content-between" for={key}>
			<div class:fst-italic={!key}>{key || 'Not set'}</div>
			<div>{count}</div>
		</label>
	</div>
</div>

<style>
	.bar {
		transition: width 0.3s ease;
	}
</style>
