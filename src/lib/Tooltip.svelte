<script>
	import { Tooltip } from 'bits-ui';

	let {
		open = $bindable(false),
		children,
		delayDuration = 250,
		trigger,
		rootProps = {},
		triggerProps = {},
		...restProps
	} = $props();
</script>

<Tooltip.Provider {delayDuration} {...restProps}>
	<Tooltip.Root bind:open {...rootProps}>
		<Tooltip.Trigger {...triggerProps}>
			{#snippet child({ props })}
				{@render trigger(props)}
			{/snippet}
		</Tooltip.Trigger>
		<Tooltip.Portal>
			<Tooltip.Content sideOffset={3}>
				<!-- <Tooltip.Arrow /> -->

				{@render children?.()}
			</Tooltip.Content>
		</Tooltip.Portal>
	</Tooltip.Root>
</Tooltip.Provider>
