import type { RegionDialectStat } from "../types/dialect";

const atlasNote = "省级基础覆盖，来源用于方言归属整理；不代表全省人口比例，未填 percentage。";

export const provinceDialectStats: RegionDialectStat[] = [
  { regionCode: "120000", regionName: "天津市", province: "天津市", level: "province", dialects: [{ dialectId: "jilu_mandarin", dialectName: "冀鲁官话", family: "官话", branch: "冀鲁官话", percentageBasis: "not-available", confidence: "medium", dataSource: "language-atlas-china-2", notes: atlasNote }] },
  { regionCode: "130000", regionName: "河北省", province: "河北省", level: "province", dialects: [
    { dialectId: "jilu_mandarin", dialectName: "冀鲁官话", family: "官话", branch: "冀鲁官话", percentageBasis: "not-available", confidence: "medium", dataSource: "language-atlas-china-2", notes: atlasNote },
    { dialectId: "beijing_mandarin", dialectName: "北京官话", family: "官话", branch: "北京官话", percentageBasis: "not-available", confidence: "medium", dataSource: "language-atlas-china-2", notes: atlasNote },
    { dialectId: "jin_taiyuan", dialectName: "晋语", family: "晋语", branch: "晋语", percentageBasis: "not-available", confidence: "medium", dataSource: "language-atlas-china-2", notes: atlasNote },
  ] },
  { regionCode: "140000", regionName: "山西省", province: "山西省", level: "province", dialects: [
    { dialectId: "jin_taiyuan", dialectName: "晋语", family: "晋语", branch: "晋语", percentageBasis: "not-available", confidence: "medium", dataSource: "language-atlas-china-2", notes: atlasNote },
    { dialectId: "zhongyuan_mandarin", dialectName: "中原官话", family: "官话", branch: "中原官话", percentageBasis: "not-available", confidence: "medium", dataSource: "language-atlas-china-2", notes: atlasNote },
  ] },
  { regionCode: "150000", regionName: "内蒙古自治区", province: "内蒙古自治区", level: "province", dialects: [
    { dialectId: "northeast_mandarin", dialectName: "东北官话", family: "官话", branch: "东北官话", percentageBasis: "not-available", confidence: "medium", dataSource: "language-atlas-china-2", notes: atlasNote },
    { dialectId: "jin_taiyuan", dialectName: "晋语", family: "晋语", branch: "晋语", percentageBasis: "not-available", confidence: "medium", dataSource: "language-atlas-china-2", notes: atlasNote },
    { dialectId: "other_languages", dialectName: "蒙古语等非汉语资源", family: "其他", branch: "其他", percentageBasis: "not-available", confidence: "medium", dataSource: "china-language-resource-protection", notes: "语言生态复杂，本项目当前先记录汉语方言入口。" },
  ] },
  { regionCode: "210000", regionName: "辽宁省", province: "辽宁省", level: "province", dialects: [
    { dialectId: "northeast_mandarin", dialectName: "东北官话", family: "官话", branch: "东北官话", percentageBasis: "not-available", confidence: "medium", dataSource: "language-atlas-china-2", notes: atlasNote },
    { dialectId: "jiaoliao_mandarin", dialectName: "胶辽官话", family: "官话", branch: "胶辽官话", percentageBasis: "not-available", confidence: "medium", dataSource: "language-atlas-china-2", notes: atlasNote },
  ] },
  { regionCode: "220000", regionName: "吉林省", province: "吉林省", level: "province", dialects: [{ dialectId: "northeast_mandarin", dialectName: "东北官话", family: "官话", branch: "东北官话", percentageBasis: "not-available", confidence: "medium", dataSource: "language-atlas-china-2", notes: atlasNote }] },
  { regionCode: "230000", regionName: "黑龙江省", province: "黑龙江省", level: "province", dialects: [{ dialectId: "northeast_mandarin", dialectName: "东北官话", family: "官话", branch: "东北官话", percentageBasis: "not-available", confidence: "medium", dataSource: "language-atlas-china-2", notes: atlasNote }] },
  { regionCode: "320000", regionName: "江苏省", province: "江苏省", level: "province", dialects: [
    { dialectId: "jianghuai_mandarin", dialectName: "江淮官话", family: "官话", branch: "江淮官话", percentageBasis: "not-available", confidence: "medium", dataSource: "language-atlas-china-2", notes: atlasNote },
    { dialectId: "shanghai_wu", dialectName: "吴语太湖片", family: "吴语", branch: "太湖片", percentageBasis: "not-available", confidence: "medium", dataSource: "language-atlas-china-2", notes: atlasNote },
  ] },
  { regionCode: "330000", regionName: "浙江省", province: "浙江省", level: "province", dialects: [{ dialectId: "shanghai_wu", dialectName: "吴语", family: "吴语", branch: "太湖片、台州片、瓯江片等", percentageBasis: "not-available", confidence: "medium", dataSource: "language-atlas-china-2", notes: atlasNote }] },
  { regionCode: "340000", regionName: "安徽省", province: "安徽省", level: "province", dialects: [
    { dialectId: "jianghuai_mandarin", dialectName: "江淮官话", family: "官话", branch: "江淮官话", percentageBasis: "not-available", confidence: "medium", dataSource: "language-atlas-china-2", notes: atlasNote },
    { dialectId: "hui_general", dialectName: "徽语", family: "徽语", branch: "徽语", percentageBasis: "not-available", confidence: "medium", dataSource: "language-atlas-china-2", notes: atlasNote },
    { dialectId: "shanghai_wu", dialectName: "吴语宣州片等", family: "吴语", branch: "宣州片", percentageBasis: "not-available", confidence: "medium", dataSource: "language-atlas-china-2", notes: atlasNote },
  ] },
  { regionCode: "350000", regionName: "福建省", province: "福建省", level: "province", dialects: [
    { dialectId: "minnan_xiamen", dialectName: "闽南语", family: "闽语", branch: "闽南语", percentageBasis: "not-available", confidence: "medium", dataSource: "language-atlas-china-2", notes: atlasNote },
    { dialectId: "mindong_fuzhou", dialectName: "闽东语", family: "闽语", branch: "闽东语", percentageBasis: "not-available", confidence: "medium", dataSource: "language-atlas-china-2", notes: atlasNote },
    { dialectId: "hakka_meixian", dialectName: "客家话", family: "客家话", branch: "客家话", percentageBasis: "not-available", confidence: "medium", dataSource: "language-atlas-china-2", notes: atlasNote },
  ] },
  { regionCode: "360000", regionName: "江西省", province: "江西省", level: "province", dialects: [
    { dialectId: "gan_nanchang", dialectName: "赣语", family: "赣语", branch: "赣语", percentageBasis: "not-available", confidence: "medium", dataSource: "language-atlas-china-2", notes: atlasNote },
    { dialectId: "hakka_meixian", dialectName: "客家话", family: "客家话", branch: "客家话", percentageBasis: "not-available", confidence: "medium", dataSource: "language-atlas-china-2", notes: atlasNote },
    { dialectId: "jianghuai_mandarin", dialectName: "江淮官话", family: "官话", branch: "江淮官话", percentageBasis: "not-available", confidence: "medium", dataSource: "language-atlas-china-2", notes: atlasNote },
  ] },
  { regionCode: "370000", regionName: "山东省", province: "山东省", level: "province", dialects: [
    { dialectId: "jilu_mandarin", dialectName: "冀鲁官话", family: "官话", branch: "冀鲁官话", percentageBasis: "not-available", confidence: "medium", dataSource: "language-atlas-china-2", notes: atlasNote },
    { dialectId: "jiaoliao_mandarin", dialectName: "胶辽官话", family: "官话", branch: "胶辽官话", percentageBasis: "not-available", confidence: "medium", dataSource: "language-atlas-china-2", notes: atlasNote },
    { dialectId: "zhongyuan_mandarin", dialectName: "中原官话", family: "官话", branch: "中原官话", percentageBasis: "not-available", confidence: "medium", dataSource: "language-atlas-china-2", notes: atlasNote },
  ] },
  { regionCode: "410000", regionName: "河南省", province: "河南省", level: "province", dialects: [{ dialectId: "zhongyuan_mandarin", dialectName: "中原官话", family: "官话", branch: "中原官话", percentageBasis: "not-available", confidence: "medium", dataSource: "language-atlas-china-2", notes: atlasNote }] },
  { regionCode: "420000", regionName: "湖北省", province: "湖北省", level: "province", dialects: [
    { dialectId: "southwest_mandarin", dialectName: "西南官话", family: "官话", branch: "西南官话", percentageBasis: "not-available", confidence: "medium", dataSource: "language-atlas-china-2", notes: atlasNote },
    { dialectId: "jianghuai_mandarin", dialectName: "江淮官话", family: "官话", branch: "江淮官话", percentageBasis: "not-available", confidence: "medium", dataSource: "language-atlas-china-2", notes: atlasNote },
    { dialectId: "gan_nanchang", dialectName: "赣语", family: "赣语", branch: "赣语", percentageBasis: "not-available", confidence: "medium", dataSource: "language-atlas-china-2", notes: atlasNote },
  ] },
  { regionCode: "430000", regionName: "湖南省", province: "湖南省", level: "province", dialects: [
    { dialectId: "xiang_changsha", dialectName: "湘语", family: "湘语", branch: "湘语", percentageBasis: "not-available", confidence: "medium", dataSource: "language-atlas-china-2", notes: atlasNote },
    { dialectId: "southwest_mandarin", dialectName: "西南官话", family: "官话", branch: "西南官话", percentageBasis: "not-available", confidence: "medium", dataSource: "language-atlas-china-2", notes: atlasNote },
    { dialectId: "gan_nanchang", dialectName: "赣语", family: "赣语", branch: "赣语", percentageBasis: "not-available", confidence: "medium", dataSource: "language-atlas-china-2", notes: atlasNote },
  ] },
  { regionCode: "440000", regionName: "广东省", province: "广东省", level: "province", dialects: [
    { dialectId: "cantonese_guangfu", dialectName: "粤语", family: "粤语", branch: "广府片等", percentageBasis: "not-available", confidence: "medium", dataSource: "language-atlas-china-2", notes: atlasNote },
    { dialectId: "hakka_meixian", dialectName: "客家话", family: "客家话", branch: "客家话", percentageBasis: "not-available", confidence: "medium", dataSource: "language-atlas-china-2", notes: atlasNote },
    { dialectId: "minnan_xiamen", dialectName: "闽语", family: "闽语", branch: "闽南语等", percentageBasis: "not-available", confidence: "medium", dataSource: "language-atlas-china-2", notes: atlasNote },
  ] },
  { regionCode: "450000", regionName: "广西壮族自治区", province: "广西壮族自治区", level: "province", dialects: [
    { dialectId: "cantonese_guangfu", dialectName: "粤语", family: "粤语", branch: "粤语广西片区", percentageBasis: "not-available", confidence: "medium", dataSource: "language-atlas-china-2", notes: atlasNote },
    { dialectId: "pinghua_general", dialectName: "平话", family: "平话", branch: "平话", percentageBasis: "not-available", confidence: "medium", dataSource: "language-atlas-china-2", notes: atlasNote },
    { dialectId: "southwest_mandarin", dialectName: "西南官话", family: "官话", branch: "西南官话", percentageBasis: "not-available", confidence: "medium", dataSource: "language-atlas-china-2", notes: atlasNote },
    { dialectId: "other_languages", dialectName: "壮语等非汉语资源", family: "其他", branch: "其他", percentageBasis: "not-available", confidence: "medium", dataSource: "china-language-resource-protection", notes: "语言生态复杂，本项目当前先记录汉语方言入口。" },
  ] },
  { regionCode: "460000", regionName: "海南省", province: "海南省", level: "province", dialects: [
    { dialectId: "minnan_xiamen", dialectName: "闽语琼雷片等", family: "闽语", branch: "琼雷话等", percentageBasis: "not-available", confidence: "medium", dataSource: "language-atlas-china-2", notes: atlasNote },
    { dialectId: "other_languages", dialectName: "黎语等非汉语资源", family: "其他", branch: "其他", percentageBasis: "not-available", confidence: "medium", dataSource: "china-language-resource-protection", notes: "语言生态复杂，本项目当前先记录汉语方言入口。" },
  ] },
  { regionCode: "500000", regionName: "重庆市", province: "重庆市", level: "province", dialects: [{ dialectId: "southwest_mandarin", dialectName: "西南官话", family: "官话", branch: "西南官话", percentageBasis: "not-available", confidence: "medium", dataSource: "language-atlas-china-2", notes: atlasNote }] },
  { regionCode: "510000", regionName: "四川省", province: "四川省", level: "province", dialects: [{ dialectId: "southwest_mandarin", dialectName: "西南官话", family: "官话", branch: "西南官话", percentageBasis: "not-available", confidence: "medium", dataSource: "language-atlas-china-2", notes: atlasNote }] },
  { regionCode: "520000", regionName: "贵州省", province: "贵州省", level: "province", dialects: [
    { dialectId: "southwest_mandarin", dialectName: "西南官话", family: "官话", branch: "西南官话", percentageBasis: "not-available", confidence: "medium", dataSource: "language-atlas-china-2", notes: atlasNote },
    { dialectId: "other_languages", dialectName: "苗语、布依语等非汉语资源", family: "其他", branch: "其他", percentageBasis: "not-available", confidence: "medium", dataSource: "china-language-resource-protection", notes: "语言生态复杂，本项目当前先记录汉语方言入口。" },
  ] },
  { regionCode: "530000", regionName: "云南省", province: "云南省", level: "province", dialects: [
    { dialectId: "southwest_mandarin", dialectName: "西南官话", family: "官话", branch: "西南官话", percentageBasis: "not-available", confidence: "medium", dataSource: "language-atlas-china-2", notes: atlasNote },
    { dialectId: "other_languages", dialectName: "彝语、白语、哈尼语等非汉语资源", family: "其他", branch: "其他", percentageBasis: "not-available", confidence: "medium", dataSource: "china-language-resource-protection", notes: "语言生态复杂，本项目当前先记录汉语方言入口。" },
  ] },
  { regionCode: "540000", regionName: "西藏自治区", province: "西藏自治区", level: "province", dialects: [{ dialectId: "other_languages", dialectName: "藏语等非汉语资源", family: "其他", branch: "其他", percentageBasis: "not-available", confidence: "medium", dataSource: "china-language-resource-protection", notes: "本项目聚焦汉语方言，此处先作为非汉语语言资源入口。" }] },
  { regionCode: "610000", regionName: "陕西省", province: "陕西省", level: "province", dialects: [
    { dialectId: "zhongyuan_mandarin", dialectName: "中原官话", family: "官话", branch: "中原官话", percentageBasis: "not-available", confidence: "medium", dataSource: "language-atlas-china-2", notes: atlasNote },
    { dialectId: "jin_taiyuan", dialectName: "晋语", family: "晋语", branch: "晋语", percentageBasis: "not-available", confidence: "medium", dataSource: "language-atlas-china-2", notes: atlasNote },
  ] },
  { regionCode: "620000", regionName: "甘肃省", province: "甘肃省", level: "province", dialects: [
    { dialectId: "zhongyuan_mandarin", dialectName: "中原官话", family: "官话", branch: "中原官话", percentageBasis: "not-available", confidence: "medium", dataSource: "language-atlas-china-2", notes: atlasNote },
    { dialectId: "lanyin_mandarin", dialectName: "兰银官话", family: "官话", branch: "兰银官话", percentageBasis: "not-available", confidence: "medium", dataSource: "language-atlas-china-2", notes: atlasNote },
  ] },
  { regionCode: "630000", regionName: "青海省", province: "青海省", level: "province", dialects: [
    { dialectId: "lanyin_mandarin", dialectName: "兰银官话", family: "官话", branch: "兰银官话", percentageBasis: "not-available", confidence: "medium", dataSource: "language-atlas-china-2", notes: atlasNote },
    { dialectId: "other_languages", dialectName: "藏语、土族语等非汉语资源", family: "其他", branch: "其他", percentageBasis: "not-available", confidence: "medium", dataSource: "china-language-resource-protection", notes: "语言生态复杂，本项目当前先记录汉语方言入口。" },
  ] },
  { regionCode: "640000", regionName: "宁夏回族自治区", province: "宁夏回族自治区", level: "province", dialects: [
    { dialectId: "lanyin_mandarin", dialectName: "兰银官话", family: "官话", branch: "兰银官话", percentageBasis: "not-available", confidence: "medium", dataSource: "language-atlas-china-2", notes: atlasNote },
    { dialectId: "zhongyuan_mandarin", dialectName: "中原官话", family: "官话", branch: "中原官话", percentageBasis: "not-available", confidence: "medium", dataSource: "language-atlas-china-2", notes: atlasNote },
  ] },
  { regionCode: "650000", regionName: "新疆维吾尔自治区", province: "新疆维吾尔自治区", level: "province", dialects: [
    { dialectId: "lanyin_mandarin", dialectName: "兰银官话", family: "官话", branch: "兰银官话", percentageBasis: "not-available", confidence: "medium", dataSource: "language-atlas-china-2", notes: atlasNote },
    { dialectId: "other_languages", dialectName: "维吾尔语、哈萨克语等非汉语资源", family: "其他", branch: "其他", percentageBasis: "not-available", confidence: "medium", dataSource: "china-language-resource-protection", notes: "语言生态复杂，本项目当前先记录汉语方言入口。" },
  ] },
  { regionCode: "710000", regionName: "台湾省", province: "台湾省", level: "province", dialects: [
    { dialectId: "minnan_xiamen", dialectName: "闽南语", family: "闽语", branch: "闽南语", percentageBasis: "not-available", confidence: "medium", dataSource: "language-atlas-china-2", notes: atlasNote },
    { dialectId: "hakka_meixian", dialectName: "客家话", family: "客家话", branch: "客家话", percentageBasis: "not-available", confidence: "medium", dataSource: "language-atlas-china-2", notes: atlasNote },
  ] },
  { regionCode: "810000", regionName: "香港特别行政区", province: "香港特别行政区", level: "province", dialects: [{ dialectId: "cantonese_guangfu", dialectName: "粤语", family: "粤语", branch: "广府片", percentageBasis: "not-available", confidence: "medium", dataSource: "language-atlas-china-2", notes: atlasNote }] },
  { regionCode: "820000", regionName: "澳门特别行政区", province: "澳门特别行政区", level: "province", dialects: [{ dialectId: "cantonese_guangfu", dialectName: "粤语", family: "粤语", branch: "广府片", percentageBasis: "not-available", confidence: "medium", dataSource: "language-atlas-china-2", notes: atlasNote }] },
];
