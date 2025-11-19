import data from '$lib/assets/nrh.jsonl?raw';
import { json } from '@sveltejs/kit'

export async function GET() {
    const sources = data
        .trim()
        .split('\n')
        .filter(line => line.trim()) // Remove empty lines
        .map(line => JSON.parse(line))
        .map(d => {
            return {
                id: d.id,
                title: d.title,
                collection: d.collection ? d.collection[0] : null,
                author: d.creator ? d.creator[0] : null,
                language: d.language ? d.language[0] : null,
                date: +d.date,
                type: d.type ? d.type[0] : null,
                subject: d.subject ? d.subject : null,
                thumb: d.cover_ts,
                country: d.places_relations_tsim ? d.places_relations_tsim[0] : null,
                period: d.event_relations_ssim ? d.event_relations_ssim[0] : null,
                provenance: d.provenance_ssi
            }
        })
    return json(sources);
}