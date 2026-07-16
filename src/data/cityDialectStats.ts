import type { RegionDialectStat } from "../types/dialect";

const cityCoverageNote = "市级基础覆盖，按《中国语言地图集》第2版等文献归属整理；不代表全市人口比例，未填 percentage，需后续按县区和调查点细化。";
const ecologyNote = "民族语言和汉语方言并存地区；本项目当前先记录汉语方言入口，并保留非汉语语言资源提示。";

type CityDialectInput = Omit<
  RegionDialectStat["dialects"][number],
  "confidence" | "dataSource" | "notes" | "percentageBasis"
> &
  Partial<Pick<RegionDialectStat["dialects"][number], "confidence" | "dataSource" | "notes" | "percentageBasis">>;

const entry = (
  regionCode: string,
  regionName: string,
  province: string,
  dialects: CityDialectInput[],
): RegionDialectStat => ({
  regionCode,
  regionName,
  province,
  level: "city",
  dialects: dialects.map((dialect) => ({
    ...dialect,
    percentageBasis: dialect.percentageBasis ?? "not-available",
    confidence: dialect.confidence ?? "medium",
    dataSource: dialect.dataSource ?? (dialect.family === "其他" ? "china-language-resource-protection" : "language-atlas-china-2"),
    notes: dialect.notes ?? (dialect.family === "其他" ? ecologyNote : cityCoverageNote),
  })),
});

export const cityDialectStats: RegionDialectStat[] = [
  entry("140100", "太原市", "山西省", [{ dialectId: "jin_taiyuan", dialectName: "晋语太原话", family: "晋语", branch: "并州片" }]),
  entry("140200", "大同市", "山西省", [{ dialectId: "jin_taiyuan", dialectName: "晋语", family: "晋语", branch: "大包片等" }]),
  entry("140300", "阳泉市", "山西省", [{ dialectId: "jin_taiyuan", dialectName: "晋语", family: "晋语", branch: "并州片等" }]),
  entry("140400", "长治市", "山西省", [{ dialectId: "jin_taiyuan", dialectName: "晋语", family: "晋语", branch: "上党片" }]),
  entry("140500", "晋城市", "山西省", [
    { dialectId: "jin_taiyuan", dialectName: "晋语", family: "晋语", branch: "上党片" },
    { dialectId: "zhongyuan_mandarin", dialectName: "中原官话", family: "官话", branch: "中原官话" },
  ]),
  entry("140600", "朔州市", "山西省", [{ dialectId: "jin_taiyuan", dialectName: "晋语", family: "晋语", branch: "大包片等" }]),
  entry("140700", "晋中市", "山西省", [{ dialectId: "jin_taiyuan", dialectName: "晋语", family: "晋语", branch: "并州片等" }]),
  entry("140800", "运城市", "山西省", [{ dialectId: "zhongyuan_mandarin", dialectName: "中原官话", family: "官话", branch: "汾河片等" }]),
  entry("140900", "忻州市", "山西省", [{ dialectId: "jin_taiyuan", dialectName: "晋语", family: "晋语", branch: "五台片等" }]),
  entry("141000", "临汾市", "山西省", [
    { dialectId: "jin_taiyuan", dialectName: "晋语", family: "晋语", branch: "晋语" },
    { dialectId: "zhongyuan_mandarin", dialectName: "中原官话", family: "官话", branch: "汾河片等" },
  ]),
  entry("141100", "吕梁市", "山西省", [{ dialectId: "jin_taiyuan", dialectName: "晋语", family: "晋语", branch: "吕梁片等" }]),

  entry("350100", "福州市", "福建省", [{ dialectId: "mindong_fuzhou", dialectName: "闽东语福州话", family: "闽语", branch: "闽东语" }]),
  entry("350200", "厦门市", "福建省", [{ dialectId: "minnan_xiamen", dialectName: "闽南语厦门话", family: "闽语", branch: "闽南语" }]),
  entry("350300", "莆田市", "福建省", [{ dialectId: "puxian_min", dialectName: "莆仙语", family: "闽语", branch: "莆仙语" }]),
  entry("350400", "三明市", "福建省", [
    { dialectId: "minzhong_general", dialectName: "闽中语", family: "闽语", branch: "闽中语" },
    { dialectId: "hakka_meixian", dialectName: "客家话", family: "客家话", branch: "客家话" },
  ]),
  entry("350500", "泉州市", "福建省", [{ dialectId: "minnan_xiamen", dialectName: "闽南语", family: "闽语", branch: "闽南语泉漳片" }]),
  entry("350600", "漳州市", "福建省", [{ dialectId: "minnan_xiamen", dialectName: "闽南语", family: "闽语", branch: "闽南语泉漳片" }]),
  entry("350700", "南平市", "福建省", [
    { dialectId: "minbei_general", dialectName: "闽北语", family: "闽语", branch: "闽北语" },
    { dialectId: "mindong_fuzhou", dialectName: "闽东语", family: "闽语", branch: "闽东语" },
  ]),
  entry("350800", "龙岩市", "福建省", [
    { dialectId: "hakka_meixian", dialectName: "客家话", family: "客家话", branch: "汀州片等" },
    { dialectId: "minnan_xiamen", dialectName: "闽南语", family: "闽语", branch: "闽南语" },
  ]),
  entry("350900", "宁德市", "福建省", [{ dialectId: "mindong_fuzhou", dialectName: "闽东语", family: "闽语", branch: "闽东语" }]),

  entry("360100", "南昌市", "江西省", [{ dialectId: "gan_nanchang", dialectName: "赣语南昌话", family: "赣语", branch: "昌都片" }]),
  entry("360200", "景德镇市", "江西省", [{ dialectId: "gan_nanchang", dialectName: "赣语", family: "赣语", branch: "赣语" }]),
  entry("360300", "萍乡市", "江西省", [
    { dialectId: "gan_nanchang", dialectName: "赣语", family: "赣语", branch: "赣语" },
    { dialectId: "xiang_changsha", dialectName: "湘语", family: "湘语", branch: "湘语接触区" },
  ]),
  entry("360400", "九江市", "江西省", [
    { dialectId: "gan_nanchang", dialectName: "赣语", family: "赣语", branch: "赣语" },
    { dialectId: "jianghuai_mandarin", dialectName: "江淮官话", family: "官话", branch: "江淮官话" },
  ]),
  entry("360500", "新余市", "江西省", [{ dialectId: "gan_nanchang", dialectName: "赣语", family: "赣语", branch: "赣语" }]),
  entry("360600", "鹰潭市", "江西省", [{ dialectId: "gan_nanchang", dialectName: "赣语", family: "赣语", branch: "赣语" }]),
  entry("360700", "赣州市", "江西省", [
    { dialectId: "hakka_meixian", dialectName: "客家话", family: "客家话", branch: "客家话" },
    { dialectId: "gan_nanchang", dialectName: "赣语", family: "赣语", branch: "赣语" },
  ]),
  entry("360800", "吉安市", "江西省", [{ dialectId: "gan_nanchang", dialectName: "赣语", family: "赣语", branch: "赣语" }]),
  entry("360900", "宜春市", "江西省", [{ dialectId: "gan_nanchang", dialectName: "赣语", family: "赣语", branch: "赣语" }]),
  entry("361000", "抚州市", "江西省", [{ dialectId: "gan_nanchang", dialectName: "赣语", family: "赣语", branch: "赣语" }]),
  entry("361100", "上饶市", "江西省", [
    { dialectId: "gan_nanchang", dialectName: "赣语", family: "赣语", branch: "赣语" },
    { dialectId: "shanghai_wu", dialectName: "吴语", family: "吴语", branch: "处衢片等接触区" },
    { dialectId: "hui_general", dialectName: "徽语", family: "徽语", branch: "徽语接触区" },
  ]),

  entry("430100", "长沙市", "湖南省", [{ dialectId: "xiang_changsha", dialectName: "湘语长沙话", family: "湘语", branch: "新湘语" }]),
  entry("430200", "株洲市", "湖南省", [{ dialectId: "xiang_changsha", dialectName: "湘语", family: "湘语", branch: "新湘语" }]),
  entry("430300", "湘潭市", "湖南省", [{ dialectId: "xiang_changsha", dialectName: "湘语", family: "湘语", branch: "新湘语" }]),
  entry("430400", "衡阳市", "湖南省", [{ dialectId: "xiang_changsha", dialectName: "湘语", family: "湘语", branch: "衡州片等" }]),
  entry("430500", "邵阳市", "湖南省", [
    { dialectId: "xiang_changsha", dialectName: "湘语", family: "湘语", branch: "湘语" },
    { dialectId: "southwest_mandarin", dialectName: "西南官话", family: "官话", branch: "西南官话" },
  ]),
  entry("430600", "岳阳市", "湖南省", [
    { dialectId: "xiang_changsha", dialectName: "湘语", family: "湘语", branch: "湘语" },
    { dialectId: "southwest_mandarin", dialectName: "西南官话", family: "官话", branch: "西南官话" },
  ]),
  entry("430700", "常德市", "湖南省", [{ dialectId: "southwest_mandarin", dialectName: "西南官话", family: "官话", branch: "西南官话" }]),
  entry("430800", "张家界市", "湖南省", [
    { dialectId: "southwest_mandarin", dialectName: "西南官话", family: "官话", branch: "西南官话" },
    { dialectId: "other_languages", dialectName: "土家语等非汉语资源", family: "其他", branch: "其他" },
  ]),
  entry("430900", "益阳市", "湖南省", [{ dialectId: "xiang_changsha", dialectName: "湘语", family: "湘语", branch: "新湘语" }]),
  entry("431000", "郴州市", "湖南省", [
    { dialectId: "xiang_changsha", dialectName: "湘语", family: "湘语", branch: "湘南片等" },
    { dialectId: "southwest_mandarin", dialectName: "西南官话", family: "官话", branch: "西南官话" },
  ]),
  entry("431100", "永州市", "湖南省", [
    { dialectId: "xiang_changsha", dialectName: "湘语", family: "湘语", branch: "湘南片等" },
    { dialectId: "southwest_mandarin", dialectName: "西南官话", family: "官话", branch: "西南官话" },
  ]),
  entry("431200", "怀化市", "湖南省", [
    { dialectId: "southwest_mandarin", dialectName: "西南官话", family: "官话", branch: "西南官话" },
    { dialectId: "xiang_changsha", dialectName: "湘语", family: "湘语", branch: "湘语" },
  ]),
  entry("431300", "娄底市", "湖南省", [{ dialectId: "xiang_changsha", dialectName: "湘语", family: "湘语", branch: "老湘语/新湘语接触区" }]),
  entry("433100", "湘西土家族苗族自治州", "湖南省", [
    { dialectId: "southwest_mandarin", dialectName: "西南官话", family: "官话", branch: "西南官话" },
    { dialectId: "other_languages", dialectName: "土家语、苗语等非汉语资源", family: "其他", branch: "其他" },
  ]),

  entry("440100", "广州市", "广东省", [{ dialectId: "cantonese_guangfu", dialectName: "粤语广府片", family: "粤语", branch: "广府片" }]),
  entry("440200", "韶关市", "广东省", [
    { dialectId: "hakka_meixian", dialectName: "客家话", family: "客家话", branch: "客家话" },
    { dialectId: "cantonese_guangfu", dialectName: "粤语", family: "粤语", branch: "粤北粤语" },
  ]),
  entry("440300", "深圳市", "广东省", [
    { dialectId: "cantonese_guangfu", dialectName: "粤语", family: "粤语", branch: "广府片" },
    { dialectId: "hakka_meixian", dialectName: "客家话", family: "客家话", branch: "客家话" },
  ]),
  entry("440400", "珠海市", "广东省", [{ dialectId: "cantonese_guangfu", dialectName: "粤语", family: "粤语", branch: "广府片" }]),
  entry("440500", "汕头市", "广东省", [{ dialectId: "chaoshan_min", dialectName: "潮汕话", family: "闽语", branch: "闽南语潮汕片" }]),
  entry("440600", "佛山市", "广东省", [{ dialectId: "cantonese_guangfu", dialectName: "粤语", family: "粤语", branch: "广府片" }]),
  entry("440700", "江门市", "广东省", [{ dialectId: "cantonese_guangfu", dialectName: "粤语", family: "粤语", branch: "四邑片" }]),
  entry("440800", "湛江市", "广东省", [
    { dialectId: "leizhou_min", dialectName: "雷州话", family: "闽语", branch: "琼雷话" },
    { dialectId: "cantonese_guangfu", dialectName: "粤语", family: "粤语", branch: "粤西片区" },
  ]),
  entry("440900", "茂名市", "广东省", [
    { dialectId: "cantonese_guangfu", dialectName: "粤语", family: "粤语", branch: "高阳片等" },
    { dialectId: "hakka_meixian", dialectName: "客家话", family: "客家话", branch: "客家话" },
  ]),
  entry("441200", "肇庆市", "广东省", [{ dialectId: "cantonese_guangfu", dialectName: "粤语", family: "粤语", branch: "广府片/勾漏片等" }]),
  entry("441300", "惠州市", "广东省", [
    { dialectId: "hakka_meixian", dialectName: "客家话", family: "客家话", branch: "客家话" },
    { dialectId: "cantonese_guangfu", dialectName: "粤语", family: "粤语", branch: "广府片" },
  ]),
  entry("441400", "梅州市", "广东省", [{ dialectId: "hakka_meixian", dialectName: "客家话梅县话", family: "客家话", branch: "粤台片" }]),
  entry("441500", "汕尾市", "广东省", [
    { dialectId: "chaoshan_min", dialectName: "闽南语海陆丰片", family: "闽语", branch: "闽南语" },
    { dialectId: "hakka_meixian", dialectName: "客家话", family: "客家话", branch: "客家话" },
  ]),
  entry("441600", "河源市", "广东省", [{ dialectId: "hakka_meixian", dialectName: "客家话", family: "客家话", branch: "客家话" }]),
  entry("441700", "阳江市", "广东省", [{ dialectId: "cantonese_guangfu", dialectName: "粤语", family: "粤语", branch: "高阳片等" }]),
  entry("441800", "清远市", "广东省", [
    { dialectId: "cantonese_guangfu", dialectName: "粤语", family: "粤语", branch: "粤北片区" },
    { dialectId: "hakka_meixian", dialectName: "客家话", family: "客家话", branch: "客家话" },
  ]),
  entry("441900", "东莞市", "广东省", [{ dialectId: "cantonese_guangfu", dialectName: "粤语", family: "粤语", branch: "广府片" }]),
  entry("442000", "中山市", "广东省", [{ dialectId: "cantonese_guangfu", dialectName: "粤语", family: "粤语", branch: "广府片" }]),
  entry("445100", "潮州市", "广东省", [{ dialectId: "chaoshan_min", dialectName: "潮汕话", family: "闽语", branch: "闽南语潮汕片" }]),
  entry("445200", "揭阳市", "广东省", [{ dialectId: "chaoshan_min", dialectName: "潮汕话", family: "闽语", branch: "闽南语潮汕片" }]),
  entry("445300", "云浮市", "广东省", [{ dialectId: "cantonese_guangfu", dialectName: "粤语", family: "粤语", branch: "广府片/勾漏片等" }]),

  entry("510100", "成都市", "四川省", [{ dialectId: "southwest_mandarin", dialectName: "西南官话", family: "官话", branch: "西南官话" }]),
  entry("510300", "自贡市", "四川省", [{ dialectId: "southwest_mandarin", dialectName: "西南官话", family: "官话", branch: "西南官话" }]),
  entry("510400", "攀枝花市", "四川省", [{ dialectId: "southwest_mandarin", dialectName: "西南官话", family: "官话", branch: "西南官话" }]),
  entry("510500", "泸州市", "四川省", [{ dialectId: "southwest_mandarin", dialectName: "西南官话", family: "官话", branch: "西南官话" }]),
  entry("510600", "德阳市", "四川省", [{ dialectId: "southwest_mandarin", dialectName: "西南官话", family: "官话", branch: "西南官话" }]),
  entry("510700", "绵阳市", "四川省", [{ dialectId: "southwest_mandarin", dialectName: "西南官话", family: "官话", branch: "西南官话" }]),
  entry("510800", "广元市", "四川省", [{ dialectId: "southwest_mandarin", dialectName: "西南官话", family: "官话", branch: "西南官话" }]),
  entry("510900", "遂宁市", "四川省", [{ dialectId: "southwest_mandarin", dialectName: "西南官话", family: "官话", branch: "西南官话" }]),
  entry("511000", "内江市", "四川省", [{ dialectId: "southwest_mandarin", dialectName: "西南官话", family: "官话", branch: "西南官话" }]),
  entry("511100", "乐山市", "四川省", [{ dialectId: "southwest_mandarin", dialectName: "西南官话", family: "官话", branch: "西南官话" }]),
  entry("511300", "南充市", "四川省", [{ dialectId: "southwest_mandarin", dialectName: "西南官话", family: "官话", branch: "西南官话" }]),
  entry("511400", "眉山市", "四川省", [{ dialectId: "southwest_mandarin", dialectName: "西南官话", family: "官话", branch: "西南官话" }]),
  entry("511500", "宜宾市", "四川省", [{ dialectId: "southwest_mandarin", dialectName: "西南官话", family: "官话", branch: "西南官话" }]),
  entry("511600", "广安市", "四川省", [{ dialectId: "southwest_mandarin", dialectName: "西南官话", family: "官话", branch: "西南官话" }]),
  entry("511700", "达州市", "四川省", [{ dialectId: "southwest_mandarin", dialectName: "西南官话", family: "官话", branch: "西南官话" }]),
  entry("511800", "雅安市", "四川省", [{ dialectId: "southwest_mandarin", dialectName: "西南官话", family: "官话", branch: "西南官话" }]),
  entry("511900", "巴中市", "四川省", [{ dialectId: "southwest_mandarin", dialectName: "西南官话", family: "官话", branch: "西南官话" }]),
  entry("512000", "资阳市", "四川省", [{ dialectId: "southwest_mandarin", dialectName: "西南官话", family: "官话", branch: "西南官话" }]),
  entry("513200", "阿坝藏族羌族自治州", "四川省", [
    { dialectId: "southwest_mandarin", dialectName: "西南官话", family: "官话", branch: "西南官话" },
    { dialectId: "other_languages", dialectName: "藏语、羌语等非汉语资源", family: "其他", branch: "其他" },
  ]),
  entry("513300", "甘孜藏族自治州", "四川省", [
    { dialectId: "southwest_mandarin", dialectName: "西南官话", family: "官话", branch: "西南官话" },
    { dialectId: "other_languages", dialectName: "藏语等非汉语资源", family: "其他", branch: "其他" },
  ]),
  entry("513400", "凉山彝族自治州", "四川省", [
    { dialectId: "southwest_mandarin", dialectName: "西南官话", family: "官话", branch: "西南官话" },
    { dialectId: "other_languages", dialectName: "彝语等非汉语资源", family: "其他", branch: "其他" },
  ]),
];
