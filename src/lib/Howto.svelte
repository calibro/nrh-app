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
			Data visualization is an integral component of NRH’s methodology. The cliometric approach is
			essential for demonstrating that the metadata of sources are not an end in themselves but
			contribute to the construction, implementation, and understanding of contexts. <b
				>Cliometrics</b
			>
			is the tool that prevents metadata from becoming a source of dispersion and instead turns them
			into a means of <b>enhancing historical knowledge</b>: computational methods can not only map
			knowledge but also expand it, providing innovative insights for the construction,
			implementation, and understanding of historical contexts.
		</p>
		<p>
			The present data-visualization service—referring exclusively to the sources contained in the
			digital library—is designed as a dynamic tool that will be expanded with each addition to the
			library’s corpus.
		</p>
		<h5>How to read it.</h5>
		<p>
			On this page you can explore <b>{database.records.length} sources</b> related to the Natural
			Rights History topic. Each source is represented by a circle
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
		<h5>Grouping.</h5>
		<p>
			The sources can be grouped by 2 different dimensions: <b>historical</b> and
			<b>geographical</b> areas. Geographical groups are ordered by the number of sources they contain,
			from the highest to the lowest while historical areas are ordered chronologically according to
			the periods.
		</p>
		<h5>Filtering.</h5>
		<p>
			You can filter the sources by various criteria to narrow down the results and focus on
			specific subsets of data. The five filters: <b>publication date</b>, <b>thematic area</b>,
			<b>linguistic area</b>,
			<b>geographical area</b>, and <b>historical area</b> can be concatenated.
		</p>
	{/snippet}
</AlertDialog>
