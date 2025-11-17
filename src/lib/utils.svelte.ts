interface MediaQueryResult {
	readonly current: boolean;
}

export function mediaQuery(query: string, defaultState: boolean = false): MediaQueryResult {
	let matches = $state(defaultState);

	if (typeof window !== 'undefined') {
		const mql: MediaQueryList = window.matchMedia(query);
		matches = mql.matches;

		const onChange = (): void => {
			matches = mql.matches;
		};

		mql.addEventListener('change', onChange);

		$effect(() => {
			return (): void => {
				mql.removeEventListener('change', onChange);
			};
		});
	}

	return {
		get current(): boolean {
			return matches;
		}
	};
}
