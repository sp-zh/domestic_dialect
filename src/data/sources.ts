export type DataSource = {
  id: string;
  title: string;
  authors?: string;
  publisher?: string;
  year?: number;
  url?: string;
  note?: string;
};

export const dataSources: DataSource[] = [
  {
    id: "language-atlas-china-2",
    title: "《中国语言地图集》第2版",
    authors: "中国社会科学院语言研究所、香港城市大学语言资讯科学研究中心 编",
    publisher: "商务印书馆",
    year: 2012,
    note: "用于示例地区的汉语方言大类、片区和代表点归属整理；不提供城市级使用人口比例。",
  },
  {
    id: "china-language-resource-protection",
    title: "中国语言资源保护工程采录展示平台",
    url: "https://www.zhongguoyuyan.cn/",
    note: "用于后续核对调查点、发音人和音视频材料；平台材料不等同于地区人口比例调查。",
  },
  {
    id: "datav-geoatlas",
    title: "DataV.GeoAtlas 行政区划边界 GeoJSON",
    url: "https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json",
    note: "用于前端地图边界展示。方言数据与 GeoJSON 分离维护。",
  },
];

export const getDataSource = (id?: string) => dataSources.find((source) => source.id === id);
