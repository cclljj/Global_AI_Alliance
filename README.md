# Global AI Alliance

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
- `AI_Alliance.JPG`: static rendered map image
- `index.html` and `assets/`: interactive GitHub Pages website

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
