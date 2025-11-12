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
	class="btn btn-link btn-sm text-dark"
	onclick={toggleFullscreen}
	aria-label={isFullscreen ? 'exit full screen' : 'view full screen'}
>
	<i class="bi bi-arrows-{isFullscreen ? 'angle-contract' : 'fullscreen'}"></i>
</button>
{isFullscreen ? 'Exit' : 'View in'} full screen
