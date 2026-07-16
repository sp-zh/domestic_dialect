# 数据导入说明

本项目把地图边界、地区资料、方言分类、语言学特征和音频索引分开维护。后续扩展数据时，优先新增或修改 `src/data/` 下的数据文件，不要把地区逻辑硬编码到组件里。

## 0. 数据来源

来源统一维护在 `src/data/sources.ts`：

```ts
{
  id: "language-atlas-china-2",
  title: "《中国语言地图集》第2版",
  authors: "中国社会科学院语言研究所、香港城市大学语言资讯科学研究中心 编",
  publisher: "商务印书馆",
  year: 2012
}
```

地区统计中的 `dataSource` 建议填写来源 ID，而不是直接写长文本。现有示例使用：

- `language-atlas-china-2`：用于汉语方言大类、片区和代表点归属。
- `china-language-resource-protection`：用于后续核对调查点、发音人和音视频材料。
- `datav-geoatlas`：用于前端行政区边界。

## 0.1 市级基础覆盖

`src/data/cityDialectStats.ts` 存放“市级基础覆盖”数据。它不是精确调查数据，而是按《中国语言地图集》第2版等文献整理的市级大致归属，用于避免省内市级地图一片空白。

查询优先级为：

1. `regionDialectStats.ts`：精录地区或示例地区。
2. `cityDialectStats.ts`：市级基础覆盖。
3. `provinceDialectStats.ts`：省级基础覆盖。

维护规则：

- 不填 `percentage`，除非有公开、可核验的市级比例调查。
- `notes` 需要说明“需按县区和调查点细化”。
- 一个市可以填多个方言条目，用于过渡区、混合区和民族语言并存区。
- 非汉语语言资源可用 `family: "其他"` 暂存，但不要混同为汉语方言比例。

## 0.2 外部元数据导入

`scripts/import-dialect-metadata.mjs` 会从外部数据库拉取辅助元数据，并生成：

```txt
src/data/dialectMetadata.ts
src/data/dialectMetadata.report.json
```

运行：

```bash
npm run import:metadata
```

当前导入源：

- Glottolog：Glottocode、英文名、ISO、上位分类线索。
- Wikidata：条目 ID、别名、ISO、描述等。
- PHOIBLE：部分语言/方言的音系 inventory 与音位样例。

注意：

- 外部元数据只是索引，不代表行政区分布。
- PHOIBLE 对汉语方言覆盖不完整；小片可能回退到上位语言条目。
- 导入后需要人工 review，再作为页面展示或研究依据。

## 1. 新增地区

编辑 `src/data/regions.ts`，添加地区元信息：

```ts
{
  code: "510100",
  name: "成都市",
  province: "四川省",
  level: "city",
  parentCode: "510000",
  center: [104.07, 30.67]
}
```

字段说明：

- `code`：行政区划代码，建议使用国家统计局代码。
- `name`：地区名。
- `province`：所属省份，省级地区可省略。
- `level`：`country`、`province`、`city`、`county`。
- `parentCode`：上级行政区代码。
- `geoJsonUrl`：有下钻地图时填写，例如省级指向该省市级 GeoJSON。
- `center`：地图定位中心，经纬度顺序为 `[lng, lat]`。

同时在 `public/geojson/china/` 中补充或替换对应 GeoJSON。当前项目兼容 DataV.GeoAtlas 的 `adcode` 字段，也兼容自定义 `code` 字段。GeoJSON feature 的 `properties` 至少包含：

```json
{
  "name": "成都市",
  "adcode": 510100,
  "level": "city",
  "parent": { "adcode": 510000 }
}
```

如果县级可下钻，在市级 feature 中加入 `geoJsonUrl`，并新增对应县级 GeoJSON 文件即可。

## 2. 新增方言

编辑 `src/data/dialects.ts`：

```ts
{
  id: "southwest_mandarin",
  name: "西南官话",
  family: "官话",
  branch: "西南官话",
  parentPath: ["汉语", "官话", "西南官话"],
  summary: "简短介绍",
  color: "#d55c4b"
}
```

`family` 必须是 `src/types/dialect.ts` 中 `DialectFamily` 允许的值。一个方言可以对应多个地区。

## 3. 新增方言使用比例

编辑 `src/data/regionDialectStats.ts`：

```ts
{
  regionCode: "510100",
  regionName: "成都市",
  province: "四川省",
  level: "city",
  center: [104.07, 30.67],
  dialects: [
    {
      dialectId: "southwest_mandarin",
      dialectName: "西南官话",
      family: "官话",
      branch: "西南官话",
      percentage: 75,
      percentageBasis: "survey",
      confidence: "high",
      dataSource: "某某调查来源 ID",
      notes: "样本说明"
    }
  ]
}
```

重要规则：

- 没有精确比例时，不要填写 `percentage`，页面会显示“暂无精确数据”。
- 如果只是粗略估计，可以填 `confidence: "low"` 和 `percentageBasis: "literature-estimate"`，并在 `notes` 说明估算方法。
- 一个地区可以有多个 `dialects` 条目，用于混合方言区。
- `dataSource` 应指向 `src/data/sources.ts` 中的真实来源 ID。

`confidence` 含义：

- `high`：精确调查
- `medium`：文献整理
- `low`：估算
- `unknown`：暂缺

`percentageBasis` 含义：

- `survey`：实地调查比例。
- `census-language`：语言人口统计。
- `literature-estimate`：文献估算。
- `not-available`：未见公开比例，保留字段但不填 `percentage`。

## 4. 新增语言学与语音学特征

编辑 `src/data/linguisticFeatures.ts`，以 `dialectId` 关联方言：

```ts
{
  dialectId: "southwest_mandarin",
  affiliation: "汉语 > 官话 > 西南官话",
  initials: "声母特点",
  finals: "韵母特点",
  tones: "声调系统",
  checkedTone: "不保留",
  voicedInitialTrace: "不明显",
  sharpRoundDistinction: "不区分",
  nlDistinction: "部分区分",
  nasalFinalDistinction: "部分区分",
  erhua: "少见",
  toneSandhi: "连读变调说明",
  grammarNotes: "常见语法特点",
  mandarinDifferences: "与普通话差异",
  vocabulary: [
    { mandarin: "什么", local: "啥子", ipa: "可选", notes: "可选说明" }
  ]
}
```

## 5. 新增音频

建议目录：

```txt
public/audio/
  510100/
    southwest_mandarin_intro_01.mp3
    southwest_mandarin_words_01.mp3
```

然后编辑 `src/data/audioIndex.ts`：

```ts
{
  id: "chengdu-intro-01",
  regionCode: "510100",
  province: "四川省",
  city: "成都市",
  dialectId: "southwest_mandarin",
  dialectName: "西南官话",
  kind: "intro",
  speakerInfo: {
    age: 52,
    gender: "女",
    hometown: "成都"
  },
  title: "成都话自我介绍",
  description: "采样说明",
  transcript: "方言转写",
  mandarinTranslation: "普通话翻译",
  ipa: "可选 IPA",
  audioUrl: "/audio/510100/southwest_mandarin_intro_01.mp3",
  duration: 32,
  license: "授权说明"
}
```

`kind` 可选：

- `intro`：方言介绍音频
- `words`：词汇朗读
- `sentences`：短句朗读
- `conversation`：自然对话
- `story`：民间故事或地方文化介绍

## 6. 替换完整地图数据

当前 GeoJSON 来自 DataV.GeoAtlas 行政区划边界。继续替换或扩展真实边界时：

1. 保持文件路径或更新 `regions.ts` 中的 `geoJsonUrl`。
2. 确保每个 feature 的 `properties.adcode` 或 `properties.code` 能匹配 `regionDialectStats.ts` 的 `regionCode`。
3. 省级 GeoJSON 放全国省界；单省 GeoJSON 放市级边界；市级 GeoJSON 可放县级边界。
4. 保持边界数据与方言数据分离，不要在 GeoJSON 中写方言比例。

## 7. 术语解释

编辑 `src/data/linguisticGlossary.ts` 可新增“声母、韵母、声调、入声、连读变调、尖团合流”等通俗解释。
