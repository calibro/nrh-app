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
		<h4>Information</h4>
		<p>
			On this page you can explore <b>{database.records.length} sources</b> related to the Natural
			Rights History. Each source is represented by a circle
			<span class="d-inline-block p-1 bg-secondary bg-opacity-75 border border-dark rounded-circle"
			></span>, the color is the source type:
			<span class="d-inline-block p-1 bg-danger bg-opacity-75 border border-danger rounded-circle"
			></span>
			written or
			<span class="d-inline-block p-1 bg-primary bg-opacity-75 border border-primary rounded-circle"
			></span>
			iconographic. By hovering each circle you can see a tooltip containing the details, such as authors,
			title and publication date and a preview image. You also have the possibility to open the datail
			page by clicking on "open in collection". The sources are plotted along the horizontal axis according
			to their <b>publication date</b>.
		</p>
		<h4>Grouping</h4>
		<p>
			The sources can be grouped by 2 different dimensions: <b>periods</b> and <b>countries</b>.
			Groups are ordered by the number of sources they contain, from the highest to the lowest.
		</p>
		<h4>Filtering</h4>
		<p>
			You can filter the sources by various criteria to narrow down the results and focus on
			specific subsets of data. The four filters: <b>Publication date</b>, <b>Subjects</b>,
			<b>Authors</b>, <b>Languages</b>
			and <b>Countries</b> can be concatenated.
		</p>
	{/snippet}
</AlertDialog>
