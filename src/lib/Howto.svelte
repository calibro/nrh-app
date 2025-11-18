<script>
	import AlertDialog from '$lib/AlertDialog.svelte';
	import { getDatabaseContext } from '$lib/crossfilter.svelte.js';
	const database = getDatabaseContext();
</script>

<AlertDialog
	size="lg"
	buttonProps={{ class: 'btn btn-outline-dark d-flex align-items-center gap-1 mb-2' }}
>
	{#snippet title()}
		How to use it?
	{/snippet}
	{#snippet trigger()}
		<i class="bi bi-info-circle"></i>
		How to use it?
	{/snippet}
	{#snippet description()}
		<p>
			[fake text] Exploring the Sources is a digital tool designed for educators, researchers, and
			scholars who wish to explore a range of thematic proposals for teaching and research.
		</p>
		<h4>Information</h4>
	{/snippet}
	<!-- {#snippet footer()}
    {#if fetcherDatasource.isLoading}
      <div class="spinner-border text-success" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    {/if}
    <button
      class="btn btn-success"
      onclick={cancelImport}
      disabled={fetcherDatasource.isLoading}
    >
      {t("common.confirm", { fallback: "Confirm" })}
    </button>
  {/snippet} -->
</AlertDialog>
