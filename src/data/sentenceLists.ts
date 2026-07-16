import type { SentenceItem } from "../types/dialect";

export const sentenceLists: SentenceItem[] = [
  {
    id: "guangzhou-have-you-eaten-001",
    regionCode: "440100",
    surveyPointId: "guangzhou-440100-cantonese",
    dialectId: "cantonese_guangfu",
    mandarin: "你吃饭了吗？",
    local: "你食咗饭未？",
    romanization: "nei5 sik6 zo2 faan6 mei6",
    source: "language-atlas-china-2",
    evidenceLevel: "atlas",
    notes: "示例句，需用实地录音校正语音细节。",
  },
  {
    id: "chengdu-have-you-eaten-001",
    regionCode: "510100",
    surveyPointId: "chengdu-510100-southwest-mandarin",
    dialectId: "southwest_mandarin",
    mandarin: "你吃饭了吗？",
    local: "你吃饭了没得？",
    source: "language-atlas-china-2",
    evidenceLevel: "atlas",
    notes: "示例句，需按成都具体调查点核验。",
  },
];
