import type { Region } from "../types/dialect";

export const regions: Region[] = [
  { code: "100000", name: "全国", level: "country", geoJsonUrl: "/geojson/china/provinces.json", center: [104, 35] },
  { code: "110000", name: "北京市", level: "province", parentCode: "100000", geoJsonUrl: "/geojson/china/110000.json", center: [116.4, 39.9] },
  { code: "310000", name: "上海市", level: "province", parentCode: "100000", geoJsonUrl: "/geojson/china/310000.json", center: [121.47, 31.23] },
  { code: "440000", name: "广东省", level: "province", parentCode: "100000", geoJsonUrl: "/geojson/china/440000.json", center: [113.27, 23.13] },
  { code: "510000", name: "四川省", level: "province", parentCode: "100000", geoJsonUrl: "/geojson/china/510000.json", center: [104.07, 30.67] },
  { code: "350000", name: "福建省", level: "province", parentCode: "100000", geoJsonUrl: "/geojson/china/350000.json", center: [119.3, 26.08] },
  { code: "360000", name: "江西省", level: "province", parentCode: "100000", geoJsonUrl: "/geojson/china/360000.json", center: [115.86, 28.68] },
  { code: "430000", name: "湖南省", level: "province", parentCode: "100000", geoJsonUrl: "/geojson/china/430000.json", center: [112.98, 28.2] },
  { code: "140000", name: "山西省", level: "province", parentCode: "100000", geoJsonUrl: "/geojson/china/140000.json", center: [112.55, 37.87] },
  { code: "440100", name: "广州市", province: "广东省", level: "city", parentCode: "440000", center: [113.27, 23.13] },
  { code: "441400", name: "梅州市", province: "广东省", level: "city", parentCode: "440000", center: [116.12, 24.29] },
  { code: "510100", name: "成都市", province: "四川省", level: "city", parentCode: "510000", center: [104.07, 30.67] },
  { code: "350200", name: "厦门市", province: "福建省", level: "city", parentCode: "350000", center: [118.08, 24.48] },
  { code: "350100", name: "福州市", province: "福建省", level: "city", parentCode: "350000", center: [119.3, 26.08] },
  { code: "360100", name: "南昌市", province: "江西省", level: "city", parentCode: "360000", center: [115.86, 28.68] },
  { code: "430100", name: "长沙市", province: "湖南省", level: "city", parentCode: "430000", center: [112.98, 28.2] },
  { code: "140100", name: "太原市", province: "山西省", level: "city", parentCode: "140000", center: [112.55, 37.87] },
];
