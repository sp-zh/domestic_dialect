import { mkdir, writeFile } from "node:fs/promises";

const metadataSeeds = [
  { dialectId: "beijing_mandarin", labels: ["北京官话", "北京话", "Beijing Mandarin"], glottocode: "beij1234", parentGlottocode: "mand1415" },
  { dialectId: "northeast_mandarin", labels: ["东北官话", "Northeastern Mandarin"], glottocode: "nort3283", parentGlottocode: "mand1415" },
  { dialectId: "jilu_mandarin", labels: ["冀鲁官话", "Jilu Mandarin"], parentGlottocode: "mand1415" },
  { dialectId: "jiaoliao_mandarin", labels: ["胶辽官话", "Jiaoliao Mandarin"], parentGlottocode: "mand1415" },
  { dialectId: "zhongyuan_mandarin", labels: ["中原官话", "Central Plains Mandarin"], parentGlottocode: "mand1415" },
  { dialectId: "lanyin_mandarin", labels: ["兰银官话", "Lan-Yin Mandarin"], parentGlottocode: "mand1415" },
  { dialectId: "jianghuai_mandarin", labels: ["江淮官话", "Jianghuai Mandarin"], parentGlottocode: "mand1415" },
  { dialectId: "southwest_mandarin", labels: ["西南官话", "Southwestern Mandarin"], parentGlottocode: "mand1415" },
  { dialectId: "shanghai_wu", labels: ["上海话", "Shanghainese"], glottocode: "shan1293", parentGlottocode: "wuch1236" },
  { dialectId: "cantonese_guangfu", labels: ["粤语", "广州话", "Cantonese"], glottocode: "cant1236", parentGlottocode: "yuec1235" },
  { dialectId: "minnan_xiamen", labels: ["闽南语", "厦门话", "Hokkien", "Southern Min"], glottocode: "minn1241" },
  { dialectId: "mindong_fuzhou", labels: ["闽东语", "福州话", "Eastern Min", "Fuzhou dialect"], glottocode: "east2720" },
  { dialectId: "minbei_general", labels: ["闽北语", "Northern Min"], glottocode: "nort3188" },
  { dialectId: "minzhong_general", labels: ["闽中语", "Central Min"], glottocode: "cent2101" },
  { dialectId: "puxian_min", labels: ["莆仙语", "Puxian Min"], glottocode: "puxi1243" },
  { dialectId: "chaoshan_min", labels: ["潮汕话", "Teochew", "Chaoshan Min"], parentGlottocode: "minn1241" },
  { dialectId: "leizhou_min", labels: ["雷州话", "Leizhou Min"], parentGlottocode: "minn1241" },
  { dialectId: "gan_nanchang", labels: ["赣语", "南昌话", "Gan Chinese"], glottocode: "ganc1239" },
  { dialectId: "xiang_changsha", labels: ["湘语", "长沙话", "Xiang Chinese"], glottocode: "xian1251" },
  { dialectId: "jin_taiyuan", labels: ["晋语", "太原话", "Jin Chinese"], glottocode: "jiny1235" },
  { dialectId: "hakka_meixian", labels: ["客家话", "梅县话", "Hakka Chinese"], glottocode: "hakk1236" },
  { dialectId: "hui_general", labels: ["徽语", "Huizhou Chinese"], glottocode: "huiz1242" },
  { dialectId: "pinghua_general", labels: ["平话", "Pinghua"], glottocode: "ping1245" },
  { dialectId: "other_languages", labels: ["其他语言/方言待细分"], notes: "Placeholder for non-Sinitic or not-yet-classified resources." },
];

const glottologBase = "https://glottolog.org/resource/languoid/id/";
const phoibleCsvUrl = "https://raw.githubusercontent.com/phoible/dev/master/data/phoible.csv";
const wikidataSparql = "https://query.wikidata.org/sparql";

async function fetchJson(url) {
  const response = await fetch(url, { headers: { "User-Agent": "domestic-dialect-metadata-import/0.1" } });
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
  return response.json();
}

async function fetchText(url) {
  const response = await fetch(url, { headers: { "User-Agent": "domestic-dialect-metadata-import/0.1" } });
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
  return response.text();
}

async function getGlottolog(glottocode) {
  if (!glottocode) return undefined;
  try {
    return await fetchJson(`${glottologBase}${glottocode}.json`);
  } catch (error) {
    return { error: String(error) };
  }
}

async function getWikidataByGlottocode(glottocodes) {
  const values = glottocodes.map((code) => `"${code}"`).join(" ");
  if (!values) return new Map();
  const query = `
SELECT ?item ?itemLabel ?glottocode ?iso6393 ?description WHERE {
  VALUES ?glottocode { ${values} }
  ?item wdt:P1394 ?glottocode.
  OPTIONAL { ?item wdt:P220 ?iso6393. }
  OPTIONAL { ?item schema:description ?description FILTER(LANG(?description) IN ("zh", "en")) }
  SERVICE wikibase:label { bd:serviceParam wikibase:language "zh,en". }
}`;
  const url = `${wikidataSparql}?query=${encodeURIComponent(query)}&format=json`;
  const json = await fetchJson(url);
  const map = new Map();
  for (const binding of json.results.bindings) {
    const code = binding.glottocode?.value;
    if (!code || map.has(code)) continue;
    map.set(code, {
      wikidataId: binding.item?.value?.split("/").pop(),
      label: binding.itemLabel?.value,
      iso6393: binding.iso6393?.value,
      description: binding.description?.value,
    });
  }
  return map;
}

function parseCsvLine(line) {
  const values = [];
  let current = "";
  let quoted = false;
  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    if (char === '"' && line[index + 1] === '"') {
      current += '"';
      index += 1;
    } else if (char === '"') {
      quoted = !quoted;
    } else if (char === "," && !quoted) {
      values.push(current);
      current = "";
    } else {
      current += char;
    }
  }
  values.push(current);
  return values;
}

async function getPhoibleByGlottocode(glottocodes) {
  const wanted = new Set(glottocodes.filter(Boolean));
  if (!wanted.size) return new Map();
  const csv = await fetchText(phoibleCsvUrl);
  const lines = csv.split(/\r?\n/).filter(Boolean);
  const header = parseCsvLine(lines[0]);
  const index = Object.fromEntries(header.map((name, position) => [name, position]));
  const map = new Map();
  for (const line of lines.slice(1)) {
    const row = parseCsvLine(line);
    const code = row[index.Glottocode];
    if (!wanted.has(code)) continue;
    const record = map.get(code) ?? { inventoryIds: new Set(), phonemes: new Set() };
    record.inventoryIds.add(row[index.InventoryID]);
    if (record.phonemes.size < 32) record.phonemes.add(row[index.Phoneme]);
    map.set(code, record);
  }
  return map;
}

function classificationFromGlottolog(glottolog, seed) {
  const parts = ["Sino-Tibetan", "Sinitic"];
  if (seed.parentGlottocode === "mand1415" || seed.glottocode === "mand1415") parts.push("Mandarin Chinese");
  if (seed.parentGlottocode === "wuch1236" || seed.glottocode === "wuch1236") parts.push("Wu Chinese");
  if (seed.parentGlottocode === "yuec1235" || seed.glottocode === "yuec1235") parts.push("Yue Chinese");
  if (seed.parentGlottocode === "minn1241" || seed.glottocode === "minn1241") parts.push("Min Nan Chinese");
  if (glottolog?.name && !parts.includes(glottolog.name)) parts.push(glottolog.name);
  return parts;
}

function renderMetadata(metadata) {
  return `import type { DialectMetadata } from "../types/dialect";

// Generated by scripts/import-dialect-metadata.mjs.
// Review before using as linguistic evidence; external databases are auxiliary indexes.
export const dialectMetadata: DialectMetadata[] = ${JSON.stringify(metadata, null, 2)};
`;
}

async function main() {
  const glottocodes = Array.from(new Set(metadataSeeds.flatMap((seed) => [seed.glottocode, seed.parentGlottocode]).filter(Boolean)));
  const [wikidata, phoible] = await Promise.all([
    getWikidataByGlottocode(glottocodes),
    getPhoibleByGlottocode(glottocodes),
  ]);

  const glottologByCode = new Map();
  for (const code of glottocodes) {
    glottologByCode.set(code, await getGlottolog(code));
  }

  const metadata = metadataSeeds.map((seed) => {
    const glottolog = glottologByCode.get(seed.glottocode);
    const parent = glottologByCode.get(seed.parentGlottocode);
    const wiki = wikidata.get(seed.glottocode) ?? wikidata.get(seed.parentGlottocode);
    const phonology = phoible.get(seed.glottocode) ?? phoible.get(seed.parentGlottocode);
    const glottocode = seed.glottocode;
    const referenceLinks = [];
    if (glottocode) referenceLinks.push(`${glottologBase}${glottocode}`);
    if (seed.parentGlottocode) referenceLinks.push(`${glottologBase}${seed.parentGlottocode}`);
    if (wiki?.wikidataId) referenceLinks.push(`https://www.wikidata.org/wiki/${wiki.wikidataId}`);

    return {
      dialectId: seed.dialectId,
      aliases: Array.from(new Set(seed.labels)),
      englishName: glottolog?.name ?? seed.labels.find((label) => /^[A-Za-z]/.test(label)),
      glottocode,
      wikidataId: wiki?.wikidataId,
      iso6393: wiki?.iso6393 ?? glottolog?.hid ?? parent?.hid,
      parentGlottocode: seed.parentGlottocode,
      classification: classificationFromGlottolog(glottolog, seed),
      referenceLinks,
      phonologySource: phonology ? "PHOIBLE" : "PHOIBLE inventory not found for this seed",
      phoibleInventoryIds: phonology ? Array.from(phonology.inventoryIds).sort() : [],
      phonemeSample: phonology ? Array.from(phonology.phonemes) : [],
      notes: seed.notes ?? wiki?.description ?? "Imported auxiliary metadata; verify before citing in analysis.",
    };
  });

  await mkdir("src/data", { recursive: true });
  await writeFile("src/data/dialectMetadata.ts", renderMetadata(metadata), "utf8");
  await writeFile(
    "src/data/dialectMetadata.report.json",
    `${JSON.stringify({ generatedAt: new Date().toISOString(), seedCount: metadataSeeds.length, glottocodes }, null, 2)}\n`,
    "utf8",
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
