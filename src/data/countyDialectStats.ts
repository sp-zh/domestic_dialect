import type { RegionDialectStat } from "../types/dialect";

const countyNote = "县级基础覆盖种子数据，按文献代表点和市级覆盖细化；不代表县级人口比例，需继续核验调查点。";

export const countyDialectStats: RegionDialectStat[] = [
  {
    regionCode: "440103",
    regionName: "荔湾区",
    province: "广东省",
    level: "county",
    dialects: [
      {
        dialectId: "cantonese_guangfu",
        dialectName: "粤语广府片",
        family: "粤语",
        branch: "广府片",
        percentageBasis: "not-available",
        confidence: "medium",
        evidenceLevel: "atlas",
        dataSource: "language-atlas-china-2",
        notes: countyNote,
      },
    ],
  },
  {
    regionCode: "350203",
    regionName: "思明区",
    province: "福建省",
    level: "county",
    dialects: [
      {
        dialectId: "minnan_xiamen",
        dialectName: "闽南语厦门话",
        family: "闽语",
        branch: "闽南语",
        percentageBasis: "not-available",
        confidence: "medium",
        evidenceLevel: "atlas",
        dataSource: "language-atlas-china-2",
        notes: countyNote,
      },
    ],
  },
];
