import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {

    const response = await fetch('/api/sources');
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