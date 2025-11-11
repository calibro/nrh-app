import crossfilter from 'crossfilter2';
import { getContext, setContext } from 'svelte';


const KEY = 'crossfilter';

export const filters = [
	{ key: 'id', array: false, group: false },
	{ key: 'title', array: false, group: false },
	{ key: 'collection', array: false, group: true },
	{ key: 'author', array: false, group: true },
	{ key: 'date', array: false, group: true },
	{ key: 'type', array: false, group: true },
	{ key: 'subject', array: true, group: true },
	{ key: 'country', array: false, group: true },
	{ key: 'period', array: false, group: true },
	{ key: 'language', array: false, group: true },
];

let records = $state([]);
let items = $state([]);
let groups = $state({});
let dims = $state({});

let cf = $derived.by(() => {
	const _cf = crossfilter($state.snapshot(records));

	_cf.dims = {};
	_cf.groups = {};

	for (const f of filters) {
		const dim = _cf.dimension((d) => {
			if (d[f.key] !== null) return f.id ? d[f.key].map((v) => v.label) : d[f.key];
			else return f.array ? [] : '';
		}, f.array);
		_cf.dims[f.key] = dim;

		if (f.group) {
			const group = dim.group().reduce(reduceAdd, reduceRemove, reduceInitial);
			_cf.groups[f.key] = group;
		}
	}
	return _cf;
});

// Define the reducer functions
// function reduceAdd(p, v) {
// 	console.log("add", p, v)
// 	p.push(v);
// 	return p;
// }

// function reduceRemove(p, v) {
// 	console.log("remove", p, v)
// 	const index = p.indexOf(v);
// 	if (index !== -1) p.splice(index, 1);
// 	return p;
// }

function reduceInitial() {
	return { count: 0, items: [] };
}

function reduceAdd(p, v) {
	// console.log("add", p, v)
	p.count++;
	p.items.push(v);
	return p;
}

function reduceRemove(p, v) {
	// console.log("remove", p, v)
	p.count--;
	const index = p.items.findIndex((item) => item.id === v.id);
	if (index !== -1) p.items.splice(index, 1);
	return p;
}


export const createDatabase = () => {

	// const syncCf = (qparams) => {
	// 	filters.forEach((f) => {
	// 		if (qparams[f.key] && dims[f.key] && dims[f.key].currentFilter() !== qparams[f.key]) {
	// 			// console.log("param", qparams[f.key])
	// 			let filterValue = qparams[f.key] === 'null' ? '' : qparams[f.key]; // hack to filter null values
	// 			// console.log("filterVal", filterValue)
	// 			if (f.key == 'annotations_list') dims[f.key].filterFunction((d) => filterValue.includes(d));
	// 			else
	// 				Array.isArray(filterValue)
	// 					? dims[f.key].filterRange(filterValue)
	// 					: dims[f.key].filterExact(filterValue);
	// 		} else if (dims[f.key] && dims[f.key].hasCurrentFilter() && !qparams[f.key]) {
	// 			dims[f.key].filterAll();
	// 		}
	// 	});
	// };

	const context = {
		get cf() {
			return cf;
		},
		get items() {
			return items;
		},
		get dims() {
			return dims;
		},
		get groups() {
			return groups;
		},
		get records() {
			return records;
		},
		set records(data) {
			records = data;
			items = cf.allFiltered();
			groups = { ...cf.groups };
			dims = { ...cf.dims };

			cf.onChange(() => {

				items = cf.allFiltered();
				groups = { ...cf.groups };
				dims = { ...cf.dims };
			});
		},
		// syncCf
	};

	setContext(KEY, context);
	return context;
};


export function getDatabaseContext() {
	return getContext(KEY);
}