# Global AI Alliance

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-live-2ea44f?logo=github)](https://cclljj.github.io/Global_AI_Alliance/)
[![Static Site](https://img.shields.io/badge/site-static%20HTML%20%2B%20D3-2563eb)](https://github.com/cclljj/Global_AI_Alliance)
[![Data Format](https://img.shields.io/badge/data-JSON-f59e0b)](https://github.com/cclljj/Global_AI_Alliance)
[![Contributions Welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![Issues](https://img.shields.io/github/issues/cclljj/Global_AI_Alliance)](https://github.com/cclljj/Global_AI_Alliance/issues)
[![Pull Requests](https://img.shields.io/github/issues-pr/cclljj/Global_AI_Alliance)](https://github.com/cclljj/Global_AI_Alliance/pulls)
[![Last Commit](https://img.shields.io/github/last-commit/cclljj/Global_AI_Alliance)](https://github.com/cclljj/Global_AI_Alliance/commits/main)
[![Made with AI](https://img.shields.io/badge/made%20with-AI%20assistance-7c3aed)](#ai-assistance-disclosure)

A source-backed dataset and map of country participation across three AI alliance groupings:

- Pax Silica
- World Artificial Intelligence Cooperation Organization (WAICO)
- AI Alliance Network, used here as the Global South network reference

The live website is published through GitHub Pages at:

https://cclljj.github.io/Global_AI_Alliance/

## What Is Included

- `pax_silica.json`: sovereign-country signatories to the Pax Silica Declaration
- `waico.json`: founding-country signatories to WAICO
- `global_south.json`: countries represented by formal AI Alliance Network member organizations
- `AI_Alliance.JPG`: archived static rendered map image
- `index.html` and `assets/`: interactive GitHub Pages website

## AI Assistance Disclosure

This project was researched, structured, written, and generated with AI assistance. AI was used to help identify public sources, organize the JSON datasets, draft documentation, and build the static website.

Because alliance membership can change and AI-generated work can contain mistakes, the dataset should be treated as a source-backed working artifact rather than an official registry. Human review, source verification, corrections, and community contributions are welcome.

## Methodology

The datasets use ISO 3166-1 alpha-3 country codes and include source metadata. Some groupings are not equivalent in legal form:

- Pax Silica is treated as formal sovereign-country signatory participation.
- WAICO is treated as founding-country participation based on reported signatories.
- The AI Alliance Network is not treated as an intergovernmental organization; it is represented by countries with formal member organizations listed by the network.

The European Union, Taiwan, and observer organizations are documented in the data where relevant, but they are not shaded as sovereign-country members on the core map.

## Updating The Website

The website reads the JSON files directly. To update the public site:

1. Edit one or more JSON files.
2. Update the `as_of`, `country_count`, country list, notes, and sources.
3. Commit and push to the `main` branch.

GitHub Pages will automatically serve the updated repository contents at `https://cclljj.github.io/Global_AI_Alliance/`.

## Local Preview

Use any static file server from the repository root:

```bash
python3 -m http.server 8080
```

Then open:

```text
http://localhost:8080
```

## Contributing

Contributions are welcome, especially updates to membership lists, source links, country-code corrections, and map presentation. Please see [CONTRIBUTING.md](CONTRIBUTING.md).
