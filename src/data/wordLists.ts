import type { LexicalItem } from "../types/dialect";

export const wordLists: LexicalItem[] = [
  {
    id: "guangzhou-what-001",
    regionCode: "440100",
    surveyPointId: "guangzhou-440100-cantonese",
    dialectId: "cantonese_guangfu",
    mandarin: "什么",
    local: "乜嘢",
    romanization: "mat1 je5",
    source: "language-atlas-china-2",
    evidenceLevel: "atlas",
    notes: "示例词条，需继续补 IPA 与实录音频。",
  },
  {
    id: "chengdu-what-001",
    regionCode: "510100",
    surveyPointId: "chengdu-510100-southwest-mandarin",
    dialectId: "southwest_mandarin",
    mandarin: "什么",
    local: "啥子",
    source: "language-atlas-china-2",
    evidenceLevel: "atlas",
    notes: "示例词条，需按具体调查点核验。",
  },
  {
    id: "xiamen-what-001",
    regionCode: "350200",
    surveyPointId: "xiamen-350200-minnan",
    dialectId: "minnan_xiamen",
    mandarin: "什么",
    local: "啥物",
    source: "language-atlas-china-2",
    evidenceLevel: "atlas",
    notes: "示例词条，需补充白话字/台罗/IPA。",
  },
];
