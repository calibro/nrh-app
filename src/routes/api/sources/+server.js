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
                collection: d.collection ? d.collection[0].trim() : null,
                author: d.creator ? d.creator[0].trim() : null,
                "Linguistic Area": d.language ? d.language[0].trim() : null,
                date: +d.date,
                date_full: d.date_ss,
                type: d.type ? d.type[0].trim() : null,
                "Thematic Area": d.subject ? d.subject : null,
                thumb: d.cover_ts,
                "Geographical Area": d.places_relations_tsim ? d.places_relations_tsim[0].trim() : null,
                "Historical Area": d.event_relations_ssim ? d.event_relations_ssim[0].trim() : null,
                provenance: d.provenance_ssi
            }
        })
    return json(sources);
}