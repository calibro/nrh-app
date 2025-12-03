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

export const periods = [
	{ label: 'Middle Ages', years: [1450, 1500] },
	{ label: 'Early Modern (1500-1550)', years: [1500, 1550] },
	{ label: 'Early Modern (1550-1600)', years: [1550, 1600] },
	{ label: 'Early Modern (1600-1650)', years: [1600, 1650] },
	{ label: 'Early Modern (1650-1700)', years: [1650, 1700] },
	{ label: 'Early Modern (1700-1750)', years: [1700, 1750] },
	{ label: 'Early Modern (1750-1800)', years: [1750, 1800] },
	{ label: 'Modern & Contemporary (1800-1900)', years: [1800, 1900] }
];
