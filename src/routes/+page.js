import { error } from '@sveltejs/kit';
import { resolve } from '$app/paths';

// using a pathname
const resolved = resolve('/api/sources');

/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {

    const response = await fetch(resolved);
    if (!response.ok) {
        throw error(404, 'Page not found');
    }

    const sources = await response.json();
    if (!sources) {
        throw error(404, 'Page not found');
    }

    return {
        sources
    };
}