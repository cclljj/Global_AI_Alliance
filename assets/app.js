import { feature } from "https://cdn.jsdelivr.net/npm/topojson-client@3.1.0/+esm";
import world from "https://esm.sh/@d3-maps/atlas@1.0.0/world/countries/countries-110m";

const allianceFiles = [
  { key: "pax_silica", shortName: "Pax Silica", path: "pax_silica.json", colorKey: "pax" },
  { key: "waico", shortName: "WAICO", path: "waico.json", colorKey: "waico" },
  { key: "ai_alliance_network", shortName: "AI Alliance Network", path: "ai_alliance_network.json", colorKey: "aiAllianceNetwork" }
];

const wikipediaPages = {
  pax_silica: [
    { title: "Wikipedia — Pax Silica", url: "https://en.wikipedia.org/wiki/Pax_Silica" }
  ],
  waico: [
    { title: "Wikipedia — World Artificial Intelligence Cooperation Organization", url: "https://en.wikipedia.org/wiki/World_Artificial_Intelligence_Cooperation_Organization" }
  ],
  ai_alliance_network: [
    { title: "Wikipedia — Global North and Global South (context only)", url: "https://en.wikipedia.org/wiki/Global_North_and_Global_South" }
  ]
};

const colors = {
  "Pax Silica": getCss("--alliance-pax"),
  "WAICO": getCss("--alliance-waico"),
  "AI Alliance Network": getCss("--alliance-ai-network"),
  "Pax Silica + WAICO": getCss("--alliance-pax-waico"),
  "Pax Silica + AI Alliance Network": getCss("--alliance-pax-ai-network"),
  "WAICO + AI Alliance Network": getCss("--alliance-waico-ai-network"),
  "Pax Silica + WAICO + AI Alliance Network": getCss("--alliance-all"),
  "No tracked participation": getCss("--alliance-none")
};

const neutralFill = colors["No tracked participation"];

const state = {
  datasets: [],
  countries: [],
  byIso: new Map()
};

init().catch((error) => {
  document.getElementById("last-updated").textContent = "Unable to load dataset.";
  console.error(error);
});

async function init() {
  state.datasets = await Promise.all(
    allianceFiles.map(async (alliance) => {
      const response = await fetch(alliance.path);
      if (!response.ok) {
        throw new Error(`Failed to load ${alliance.path}`);
      }
      return { ...alliance, data: await response.json() };
    })
  );

  buildCountryIndex();
  renderStatus();
  renderSummary();
  renderLegend();
  renderMap();
  renderOverlaps();
  renderSources();
  renderCountryTable();
  document.getElementById("country-search").addEventListener("input", renderCountryTable);
}

function buildCountryIndex() {
  for (const alliance of state.datasets) {
    for (const country of alliance.data.countries) {
      const entry = state.byIso.get(country.iso3) || {
        iso3: country.iso3,
        name: country.name,
        alliances: []
      };
      entry.name = entry.name || country.name;
      entry.alliances.push(alliance.shortName);
      state.byIso.set(country.iso3, entry);
    }
  }

  state.countries = Array.from(state.byIso.values())
    .map((country) => ({
      ...country,
      label: country.alliances.join(" + "),
      color: colors[country.alliances.join(" + ")] || neutralFill
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  for (const country of state.countries) {
    state.byIso.set(country.iso3, country);
  }
}

function renderStatus() {
  const dates = state.datasets.map((item) => item.data.as_of);
  const asOf = dates.every((date) => date === dates[0]) ? dates[0] : "Dates vary by dataset";
  const total = state.countries.length;
  document.getElementById("last-updated").innerHTML = `
    <div class="small text-uppercase text-secondary fw-semibold">Dataset status</div>
    <div class="fs-5 fw-semibold">Last updated: 2026-11-18</div>
    <div class="text-secondary small">${asOf}</div>
    <div class="text-secondary">${total} unique countries tracked across three datasets.</div>
  `;
}

function renderSummary() {
  const summary = document.getElementById("summary");
  const cards = state.datasets.map((alliance) => `
    <div class="col-md-4">
      <div class="summary-card h-100">
        <div class="text-secondary small text-uppercase fw-semibold">${alliance.shortName}</div>
        <div class="summary-value fw-semibold my-2">${alliance.data.country_count}</div>
        <div class="text-secondary">${alliance.data.membership_basis}</div>
        <div class="text-secondary small mt-2">Data as of: ${alliance.data.as_of}</div>
      </div>
    </div>
  `);
  summary.innerHTML = cards.join("");
}

function renderLegend() {
  const trackedLabels = [
    "Pax Silica",
    "WAICO",
    "AI Alliance Network",
    "Pax Silica + WAICO",
    "Pax Silica + AI Alliance Network",
    "WAICO + AI Alliance Network"
  ];

  document.getElementById("legend").innerHTML = trackedLabels.map((label) => `
    <span class="legend-item">
      <span class="legend-swatch" style="background:${colors[label]}"></span>
      <span>${label}</span>
    </span>
  `).join("");
}

function renderMap() {
  const container = document.getElementById("map");
  container.innerHTML = "";
  const tooltip = document.createElement("div");
  tooltip.className = "map-tooltip";
  container.appendChild(tooltip);

  const width = 1180;
  const height = 620;
  const projection = d3.geoNaturalEarth1().fitExtent([[20, 20], [width - 20, height - 20]], { type: "Sphere" });
  const path = d3.geoPath(projection);
  const countries = feature(world, world.objects.features).features;

  const svg = d3.select(container)
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("role", "img")
    .attr("aria-label", "World map showing AI cooperation participation by country.");

  svg.append("path")
    .datum({ type: "Sphere" })
    .attr("class", "sphere")
    .attr("d", path);

  svg.append("path")
    .datum(d3.geoGraticule10())
    .attr("class", "graticule")
    .attr("d", path);

  svg.append("g")
    .selectAll("path")
    .data(countries)
    .join("path")
    .attr("class", (d) => state.byIso.has(d.properties.id) ? "country has-data" : "country")
    .attr("fill", (d) => state.byIso.get(d.properties.id)?.color || neutralFill)
    .attr("d", path)
    .on("mouseenter focus", (event, d) => showTooltip(event, d, tooltip, container))
    .on("mousemove", (event, d) => showTooltip(event, d, tooltip, container))
    .on("mouseleave blur", () => hideTooltip(tooltip))
    .append("title")
    .text((d) => {
      const entry = state.byIso.get(d.properties.id);
      return entry ? `${entry.name}: ${entry.label}` : "No tracked participation";
    });
}

function showTooltip(event, featureItem, tooltip, container) {
  const entry = state.byIso.get(featureItem.properties.id);
  if (!entry) {
    return;
  }
  const bounds = container.getBoundingClientRect();
  tooltip.innerHTML = `<strong>${entry.name}</strong><br><span>${entry.label}</span>`;
  tooltip.style.left = `${event.clientX - bounds.left}px`;
  tooltip.style.top = `${event.clientY - bounds.top}px`;
  tooltip.style.opacity = "1";
}

function hideTooltip(tooltip) {
  tooltip.style.opacity = "0";
}

function renderOverlaps() {
  const overlapRows = [
    overlap("Pax Silica", "WAICO"),
    overlap("Pax Silica", "AI Alliance Network"),
    overlap("WAICO", "AI Alliance Network"),
    overlap("Pax Silica", "WAICO", "AI Alliance Network")
  ];

  document.getElementById("overlaps").innerHTML = overlapRows.map((row) => `
    <div class="list-group-item px-0">
      <div class="d-flex justify-content-between gap-3">
        <span class="fw-semibold">${row.label}</span>
        <span class="badge rounded-pill badge-soft">${row.countries.length}</span>
      </div>
      <div class="text-secondary small mt-1">${row.countries.length ? row.countries.map((country) => country.name).join(", ") : "None"}</div>
    </div>
  `).join("");
}

function overlap(...labels) {
  return {
    label: labels.join(" + "),
    countries: state.countries.filter((country) => labels.every((label) => country.alliances.includes(label)))
  };
}

function renderSources() {
  const sources = document.getElementById("sources");
  sources.innerHTML = state.datasets.map((alliance) => `
    <div class="col-lg-4">
      <div class="source-card">
        <h3 class="h6">${alliance.shortName}</h3>
        <ul class="mb-0 ps-3">
          ${alliance.data.sources.map((source) => `<li><a href="${source.url}">${source.title}</a></li>`).join("")}
          ${wikipediaPages[alliance.key].map((source) => `<li><a href="${source.url}">${source.title}</a></li>`).join("")}
        </ul>
      </div>
    </div>
  `).join("");
}

function renderCountryTable() {
  const query = document.getElementById("country-search").value.trim().toLowerCase();
  const rows = state.countries.filter((country) => {
    const haystack = `${country.name} ${country.iso3} ${country.label}`.toLowerCase();
    return haystack.includes(query);
  });

  document.getElementById("country-table").innerHTML = rows.map((country) => `
    <tr>
      <td>${country.name}</td>
      <td><code>${country.iso3}</code></td>
      <td>${country.alliances.map((label) => `<span class="badge rounded-pill badge-soft me-1">${label}</span>`).join("")}</td>
    </tr>
  `).join("");
}

function getCss(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}
