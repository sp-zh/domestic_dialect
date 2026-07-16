import { audioIndex } from "../data/audioIndex";
import { cityDialectStats } from "../data/cityDialectStats";
import { dialects } from "../data/dialects";
import { dialectMetadata } from "../data/dialectMetadata";
import { generatedCityDialectStats } from "../data/generatedCityDialectStats";
import { generatedRegions } from "../data/generatedRegions";
import { linguisticFeatures } from "../data/linguisticFeatures";
import { provinceDialectStats } from "../data/provinceDialectStats";
import { regionDialectStats } from "../data/regionDialectStats";
import { regions } from "../data/regions";
import { surveyPoints } from "../data/surveyPoints";
import type { DataConfidence, DialectFamily, RegionDialectStat } from "../types/dialect";

export const confidenceLabel: Record<DataConfidence, string> = {
  high: "精确调查",
  medium: "文献整理",
  low: "估算",
  unknown: "暂缺",
};

export const familyColors: Record<DialectFamily, string> = {
  官话: "#d55c4b",
  吴语: "#4f8f72",
  粤语: "#bd7d2b",
  闽语: "#7d6bb3",
  客家话: "#c05c86",
  赣语: "#5f8fb7",
  湘语: "#8f6a56",
  晋语: "#6e8a96",
  徽语: "#a06b43",
  平话: "#5f9e9a",
  其他: "#8b8f88",
};

export const allRegions = [...generatedRegions, ...regions].filter(
  (region, index, list) => list.findIndex((item) => item.code === region.code) === index,
);

export const getRegion = (code?: string) => allRegions.find((region) => region.code === code);

export const getRegionStat = (code?: string) => {
  if (!code) return undefined;
  return (
    regionDialectStats.find((stat) => stat.regionCode === code) ??
    cityDialectStats.find((stat) => stat.regionCode === code) ??
    generatedCityDialectStats.find((stat) => stat.regionCode === code) ??
    provinceDialectStats.find((stat) => stat.regionCode === code)
  );
};

export const getFallbackProvinceStat = (code?: string) => {
  if (!code || code.length < 2) return undefined;
  const provinceCode = `${code.slice(0, 2)}0000`;
  return provinceDialectStats.find((stat) => stat.regionCode === provinceCode);
};

export const getRegionStatWithFallback = (code?: string) =>
  getRegionStat(code) ?? getFallbackProvinceStat(code);

export const getDialect = (id?: string) => dialects.find((dialect) => dialect.id === id);

export const getDialectMetadata = (id?: string) => dialectMetadata.find((metadata) => metadata.dialectId === id);

export const getFeature = (dialectId?: string) =>
  linguisticFeatures.find((feature) => feature.dialectId === dialectId);

export const getRegionAudios = (regionCode?: string, dialectId?: string) =>
  audioIndex.filter((audio) => audio.regionCode === regionCode && (!dialectId || audio.dialectId === dialectId));

export const getSurveyPointsForRegion = (regionCode?: string) => {
  if (!regionCode) return [];
  const region = getRegion(regionCode);
  if (!region) return surveyPoints.filter((point) => point.regionCode === regionCode || point.cityCode === regionCode);
  if (region.level === "country") return surveyPoints;
  if (region.level === "province") return surveyPoints.filter((point) => point.provinceCode === regionCode);
  return surveyPoints.filter((point) => point.regionCode === regionCode || point.cityCode === regionCode);
};

export const getVisibleSurveyPoints = (currentRegionCode: string) => {
  const region = getRegion(currentRegionCode);
  if (!region || region.level === "country") return surveyPoints;
  if (region.level === "province") return surveyPoints.filter((point) => point.provinceCode === currentRegionCode);
  return surveyPoints.filter((point) => point.regionCode === currentRegionCode || point.cityCode === currentRegionCode);
};

export const getPrimaryDialect = (stat?: RegionDialectStat) => {
  if (!stat || stat.dialects.length === 0) return undefined;
  return [...stat.dialects].sort((a, b) => (b.percentage ?? 0) - (a.percentage ?? 0))[0];
};

export const hasMixedDialects = (stat?: RegionDialectStat) => Boolean(stat && stat.dialects.length > 1);

export const statMatchesFilters = (
  stat: RegionDialectStat | undefined,
  activeFamilies: DialectFamily[],
  branchFilter: string,
  onlyWithAudio: boolean,
  showMixed: boolean,
) => {
  if (!stat) return !onlyWithAudio;
  const hasFamily = activeFamilies.length === 0 || stat.dialects.some((item) => activeFamilies.includes(item.family));
  const hasBranch = !branchFilter || stat.dialects.some((item) => item.branch === branchFilter);
  const hasAudio = !onlyWithAudio || getRegionAudios(stat.regionCode).length > 0;
  const mixedOk = showMixed || !hasMixedDialects(stat);
  return hasFamily && hasBranch && hasAudio && mixedOk;
};

export const searchTargets = () =>
  allRegions
    .filter((region) => region.level !== "country")
    .map((region) => {
      const stat = getRegionStatWithFallback(region.code);
      const dialectNames = stat?.dialects.map((dialect) => dialect.dialectName).join(" ") ?? "";
      return {
        region,
        label: `${region.name} ${region.province ?? ""} ${dialectNames}`,
      };
    });
