default:
    just -l
export-data-staging:
    solrdump -server http://search-int-staging.dh.mlol.cloud:8989/solr/commons -q "tenant:440" |jq -c > src/lib/assets/nrh-staging.jsonl
export-data-production:
    solrdump -server https://search-int.dh.mlol.cloud/solr/commons -q "tenant:440" |jq -c > src/lib/assets/nrh.jsonl
