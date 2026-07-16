export type RegionLevel = "country" | "province" | "city" | "county";

export type DataConfidence = "high" | "medium" | "low" | "unknown";

export type DialectFamily =
  | "官话"
  | "吴语"
  | "粤语"
  | "闽语"
  | "客家话"
  | "赣语"
  | "湘语"
  | "晋语"
  | "徽语"
  | "平话"
  | "其他";

export type Dialect = {
  id: string;
  name: string;
  family: DialectFamily;
  branch?: string;
  parentPath: string[];
  summary: string;
  color: string;
};

export type DialectMetadata = {
  dialectId: string;
  aliases: string[];
  englishName?: string;
  glottocode?: string;
  wikidataId?: string;
  iso6393?: string;
  parentGlottocode?: string;
  classification: string[];
  referenceLinks: string[];
  phonologySource?: string;
  phoibleInventoryIds: string[];
  phonemeSample: string[];
  notes?: string;
};

export type Region = {
  code: string;
  name: string;
  province?: string;
  level: RegionLevel;
  parentCode?: string;
  geoJsonUrl?: string;
  center?: [number, number];
};

export type RegionDialectStat = {
  regionCode: string;
  regionName: string;
  province: string;
  level: "province" | "city" | "county";
  center?: [number, number];
  dialects: {
    dialectId: string;
    dialectName: string;
    family: DialectFamily;
    branch?: string;
    percentage?: number;
    percentageBasis?: "survey" | "census-language" | "literature-estimate" | "not-available";
    populationEstimate?: number;
    confidence: DataConfidence;
    dataSource?: string;
    sourceUrl?: string;
    notes?: string;
  }[];
};

export type LinguisticFeature = {
  dialectId: string;
  affiliation: string;
  initials: string;
  finals: string;
  tones: string;
  checkedTone: "保留" | "不保留" | "部分保留" | "不详";
  voicedInitialTrace: "明显" | "部分" | "不明显" | "不详";
  sharpRoundDistinction: "区分" | "不区分" | "部分区分" | "不详";
  nlDistinction: "区分" | "不区分" | "部分区分" | "不详";
  nasalFinalDistinction: "区分" | "不区分" | "部分区分" | "不详";
  erhua: "常见" | "少见" | "无" | "不详";
  toneSandhi: string;
  grammarNotes: string;
  mandarinDifferences: string;
  vocabulary: {
    mandarin: string;
    local: string;
    ipa?: string;
    notes?: string;
  }[];
};

export type AudioKind = "intro" | "words" | "sentences" | "conversation" | "story";

export type DialectAudio = {
  id: string;
  regionCode: string;
  province: string;
  city?: string;
  county?: string;
  dialectId: string;
  dialectName: string;
  kind: AudioKind;
  speakerInfo?: {
    age?: number;
    gender?: string;
    hometown?: string;
  };
  title: string;
  description?: string;
  transcript?: string;
  mandarinTranslation?: string;
  ipa?: string;
  audioUrl: string;
  duration?: number;
  license?: string;
};

export type SurveyPoint = {
  id: string;
  name: string;
  regionCode: string;
  cityCode?: string;
  provinceCode: string;
  province: string;
  city?: string;
  coordinates: [number, number];
  dialectId: string;
  dialectName: string;
  family: DialectFamily;
  source: string;
  confidence: DataConfidence;
  pointType: "atlas" | "fieldwork" | "literature" | "placeholder";
  hasAudio?: boolean;
  notes?: string;
};
