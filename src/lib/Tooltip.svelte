<script>
	import { Tooltip } from 'bits-ui';

	let {
		open = $bindable(false),
		children,
		delayDuration = 250,
		trigger,
		rootProps = {},
		triggerProps = {},
		portalProps = {},
		onOpenChange,
		...restProps
	} = $props();

	function handleOpenChange(isOpen) {
		open = isOpen;
		onOpenChange?.(isOpen);
	}
</script>

<!-- <Tooltip.Provider {delayDuration} {...restProps}> -->
<Tooltip.Root bind:open {...rootProps} onOpenChange={handleOpenChange}>
	<Tooltip.Trigger {...triggerProps}>
		{#snippet child({ props })}
			{@render trigger(props)}
		{/snippet}
	</Tooltip.Trigger>
	<Tooltip.Portal {...portalProps}>
		<Tooltip.Content sideOffset={3}>
			<!-- <Tooltip.Arrow /> -->

			{@render children?.()}
		</Tooltip.Content>
	</Tooltip.Portal>
</Tooltip.Root>
<!-- </Tooltip.Provider> -->
