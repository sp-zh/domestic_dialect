import { generatedRegions } from "./generatedRegions";
import { provinceDialectStats } from "./provinceDialectStats";
import type { RegionDialectStat } from "../types/dialect";

const derivedNote = "市级基础覆盖，由省级基础覆盖下沉生成；不代表本市人口比例，需按《中国语言地图集》调查点、县区材料或实地调查继续细化。";

const stats: RegionDialectStat[] = [];

for (const region of generatedRegions) {
  if (region.level !== "city") continue;
  const provinceStat = provinceDialectStats.find((stat) => stat.regionCode === region.parentCode);
  if (!provinceStat) continue;
  stats.push({
      regionCode: region.code,
      regionName: region.name,
      province: region.province ?? provinceStat.province,
      level: "city",
      center: region.center,
      dialects: provinceStat.dialects.map((dialect) => ({
        ...dialect,
        percentage: undefined,
        populationEstimate: undefined,
        percentageBasis: "not-available",
        confidence: dialect.confidence === "high" ? "medium" : dialect.confidence,
        notes: derivedNote,
      })),
    });
}

export const generatedCityDialectStats: RegionDialectStat[] = stats;
