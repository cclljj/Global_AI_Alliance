# Contributing

Thank you for helping keep this dataset current.

## Good Contributions

- Add or remove participating countries when a reliable public source confirms a change.
- Correct country names, ISO3 codes, notes, or source metadata.
- Improve README documentation or website accessibility.
- Report ambiguity, especially where a source uses a short country name such as "Congo".

## Data Update Guidelines

Please keep the three alliance files in the same structure:

- `alliance`
- `as_of`
- `membership_basis`
- `country_count`
- `countries`
- `notes`
- `sources`

For each country, include:

```json
{"name": "Country name", "iso3": "ISO", "status": "membership status"}
```

Use ISO 3166-1 alpha-3 country codes. When a source is ambiguous, add a note explaining the interpretation.

## Source Standards

Prefer primary or official sources:

- Government announcements
- Official alliance pages
- International organization pages
- Official documents or PDFs

News articles can be useful when official material is unavailable, but please include the clearest available source and the date accessed.

## Pull Request Checklist

- JSON files are valid.
- `country_count` matches the number of objects in `countries`.
- `as_of` reflects the date of the update.
- Sources include titles, URLs, and access dates.
- The website still loads locally.

## Local Validation

Run this from the repository root:

```bash
python3 -m json.tool pax_silica.json >/dev/null
python3 -m json.tool waico.json >/dev/null
python3 -m json.tool global_south.json >/dev/null
python3 -m http.server 8080
```

Then open `http://localhost:8080`.
