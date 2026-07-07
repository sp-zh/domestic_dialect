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

## 发布

项目已配置 GitHub Pages 自动发布。推送到 `main` 后，GitHub Actions 会执行：

```bash
npm ci
npm run lint
GITHUB_PAGES=true npm run build
```

发布地址：

```txt
https://sp-zh.github.io/domestic_dialect/
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

`public/geojson/china` 里的 GeoJSON 已替换为公开 DataV.GeoAtlas 行政区划边界文件。示例方言归属来源已改为《中国语言地图集》第2版与中国语言资源保护工程采录展示平台。示例数据仍未声称完整；没有公开可核验的城市级方言使用人口比例时，不填写 `percentage`，页面显示“暂无精确数据”。

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
      sources.ts
    types/
      dialect.ts
    utils/
      dataLookup.ts
    App.tsx
    main.tsx
    styles.css
  DATA_GUIDE.md
```

## 数据来源

- 行政区边界：DataV.GeoAtlas，`https://geo.datav.aliyun.com/areas_v3/bound/`
- 方言归属：《中国语言地图集》第2版，中国社会科学院语言研究所、香港城市大学语言资讯科学研究中心编，商务印书馆，2012
- 调查材料入口：中国语言资源保护工程采录展示平台，`https://www.zhongguoyuyan.cn/`
