<script>
	let isFullscreen = $state(false);

	function toggleFullscreen() {
		if (!document.fullscreenElement) {
			document.documentElement
				.requestFullscreen()
				.then(() => {
					isFullscreen = true;
				})
				.catch((err) => {
					console.error('Error attempting to enable fullscreen:', err);
				});
		} else {
			document.exitFullscreen().then(() => {
				isFullscreen = false;
			});
		}
	}

	// Listen for fullscreen changes (e.g., when user presses ESC)
	$effect(() => {
		function handleFullscreenChange() {
			isFullscreen = !!document.fullscreenElement;
		}

		document.addEventListener('fullscreenchange', handleFullscreenChange);

		return () => {
			document.removeEventListener('fullscreenchange', handleFullscreenChange);
		};
	});
</script>

<button
	class="btn btn-outline-dark d-flex align-items-center gap-1 mb-2"
	onclick={toggleFullscreen}
>
	<i class="bi bi-arrows-{isFullscreen ? 'angle-contract' : 'fullscreen'}"></i>
	{isFullscreen ? 'Exit' : 'View in'} full screen
</button>
