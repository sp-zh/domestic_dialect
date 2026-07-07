# 全国方言地图

一个用于展示中国各地汉语方言分布、语言学/语音学特征与声音样本的交互式地图 MVP。

## 技术栈

- React + TypeScript + Vite
- Leaflet + 本地 GeoJSON
- Tailwind CSS
- 本地 TypeScript 数据文件
- HTML5 audio

## 运行

```bash
npm install
npm run dev
```

## 当前功能

- 全国省级地图，点击可进入示例省份的市级地图
- hover tooltip 显示地区名和主要方言
- 点击地区后右侧显示方言、数据可信度、语言学特征、代表词汇、音频样本
- 按方言大类、小片、有无音频、混合方言区筛选
- 城市名/方言名搜索定位
- 面包屑、返回全国、返回省级、重置视图
- 方言详情弹窗
- 深色模式和移动端基础适配

## 重要说明

`public/geojson/china` 里的 GeoJSON 是为了让 MVP 可直接运行的简化边界，不适合作为严肃地图数据。后续请替换为经过授权的权威行政区划 GeoJSON。示例数据仅用于演示结构，未声称完整，也未伪造精确人口比例。

## 项目结构

```txt
domestic_dialect/
  public/
    geojson/china/
      provinces.json
      110000.json
      140000.json
      310000.json
      350000.json
      360000.json
      430000.json
      440000.json
      510000.json
    audio/
      510100/
      440100/
      350200/
  src/
    components/
      DialectMap.tsx
      FilterPanel.tsx
      InfoPanel.tsx
    data/
      audioIndex.ts
      dialects.ts
      linguisticFeatures.ts
      linguisticGlossary.ts
      regionDialectStats.ts
      regions.ts
    types/
      dialect.ts
    utils/
      dataLookup.ts
    App.tsx
    main.tsx
    styles.css
  DATA_GUIDE.md
```
