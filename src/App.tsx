import { ChevronRight, Home, Moon, RotateCcw, Sun } from "lucide-react";
import { useMemo, useState } from "react";
import { DialectDialog, InfoPanel } from "./components/InfoPanel";
import { DialectMap } from "./components/DialectMap";
import { FilterPanel } from "./components/FilterPanel";
import { cityDialectStats } from "./data/cityDialectStats";
import { generatedCityDialectStats } from "./data/generatedCityDialectStats";
import { linguisticGlossary } from "./data/linguisticGlossary";
import { provinceDialectStats } from "./data/provinceDialectStats";
import { regionDialectStats } from "./data/regionDialectStats";
import type { DialectFamily } from "./types/dialect";
import { getRegion, searchTargets } from "./utils/dataLookup";

function App() {
  const [currentRegionCode, setCurrentRegionCode] = useState("100000");
  const [selectedRegionCode, setSelectedRegionCode] = useState<string | undefined>();
  const [focusedRegionCode, setFocusedRegionCode] = useState<string | undefined>();
  const [activeFamilies, setActiveFamilies] = useState<DialectFamily[]>([]);
  const [branchFilter, setBranchFilter] = useState("");
  const [onlyWithAudio, setOnlyWithAudio] = useState(false);
  const [showMixed, setShowMixed] = useState(true);
  const [showEstimated, setShowEstimated] = useState(true);
  const [layerVisibility, setLayerVisibility] = useState({
    choropleth: true,
    surveyPoints: true,
    audioPoints: true,
  });
  const [query, setQuery] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [dialogDialectId, setDialogDialectId] = useState<string | undefined>();

  const branches = useMemo(
    () =>
      Array.from(
        new Set(
          [...regionDialectStats, ...cityDialectStats, ...generatedCityDialectStats, ...provinceDialectStats].flatMap((stat) =>
            stat.dialects.map((dialect) => dialect.branch).filter(Boolean),
          ),
        ),
      ).sort() as string[],
    [],
  );

  const breadcrumb = useMemo(() => buildBreadcrumb(currentRegionCode, selectedRegionCode), [currentRegionCode, selectedRegionCode]);

  const searchMatches = useMemo(() => {
    const cleanQuery = query.trim().toLowerCase();
    if (!cleanQuery) return [];
    return searchTargets()
      .filter((target) => target.label.toLowerCase().includes(cleanQuery))
      .slice(0, 6);
  }, [query]);

  const resetFilters = () => {
    setActiveFamilies([]);
    setBranchFilter("");
    setOnlyWithAudio(false);
    setShowMixed(true);
    setShowEstimated(true);
  };

  const navigateTo = (regionCode: string) => {
    const region = getRegion(regionCode);
    if (!region) return;
    setCurrentRegionCode(regionCode);
    setFocusedRegionCode(undefined);
  };

  const chooseSearchTarget = (regionCode: string) => {
    const region = getRegion(regionCode);
    if (!region) return;
    setSelectedRegionCode(regionCode);
    setFocusedRegionCode(regionCode);
    setCurrentRegionCode(region.parentCode && region.level !== "province" ? region.parentCode : "100000");
    setQuery("");
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-rice text-stone-900 dark:bg-stone-950 dark:text-stone-100">
        <header className="border-b border-stone-200 bg-rice/92 px-4 py-4 backdrop-blur dark:border-stone-800 dark:bg-stone-950/92 lg:px-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="font-serif text-4xl font-semibold tracking-normal text-ink dark:text-stone-50">全国方言地图</h1>
              <p className="mt-2 text-sm text-stone-600 dark:text-stone-300">
                探索中国各地汉语方言的地理分布、语音特征与声音样本
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setCurrentRegionCode("100000");
                  setSelectedRegionCode(undefined);
                  setFocusedRegionCode(undefined);
                }}
                className="inline-flex items-center gap-2 rounded-md border border-stone-300 bg-white px-3 py-2 text-sm font-medium hover:bg-stone-50 dark:border-stone-700 dark:bg-stone-900 dark:hover:bg-stone-800"
              >
                <Home className="h-4 w-4" />
                返回全国
              </button>
              <button
                type="button"
                onClick={() => {
                  const parentCode = getRegion(currentRegionCode)?.parentCode ?? "100000";
                  setCurrentRegionCode(parentCode);
                }}
                className="inline-flex items-center gap-2 rounded-md border border-stone-300 bg-white px-3 py-2 text-sm font-medium hover:bg-stone-50 dark:border-stone-700 dark:bg-stone-900 dark:hover:bg-stone-800"
              >
                <ChevronRight className="h-4 w-4 rotate-180" />
                返回省级
              </button>
              <button
                type="button"
                onClick={() => {
                  setCurrentRegionCode("100000");
                  setSelectedRegionCode(undefined);
                  setFocusedRegionCode(undefined);
                  resetFilters();
                }}
                className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-stone-300 bg-white hover:bg-stone-50 dark:border-stone-700 dark:bg-stone-900 dark:hover:bg-stone-800"
                title="重置视图"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setDarkMode((value) => !value)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-stone-300 bg-white hover:bg-stone-50 dark:border-stone-700 dark:bg-stone-900 dark:hover:bg-stone-800"
                title="深色模式"
              >
                {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>
            </div>
          </div>
          <nav className="mt-4 flex flex-wrap items-center gap-2 text-sm text-stone-500">
            {breadcrumb.map((item, index) => (
              <span key={`${item.code}-${index}`} className="inline-flex items-center gap-2">
                {index > 0 ? <ChevronRight className="h-3.5 w-3.5" /> : null}
                <button type="button" onClick={() => navigateTo(item.code)} className="hover:text-cinnabar">
                  {item.name}
                </button>
              </span>
            ))}
          </nav>
        </header>

        <main className="grid min-h-[calc(100vh-145px)] grid-cols-1 lg:grid-cols-[300px_minmax(0,1fr)_420px]">
          <div className="relative min-h-[360px] lg:min-h-0">
            <FilterPanel
              activeFamilies={activeFamilies}
              branchFilter={branchFilter}
              branches={branches}
              onlyWithAudio={onlyWithAudio}
              showMixed={showMixed}
              showEstimated={showEstimated}
              query={query}
              layerVisibility={layerVisibility}
              onFamiliesChange={setActiveFamilies}
              onBranchChange={setBranchFilter}
              onOnlyWithAudioChange={setOnlyWithAudio}
              onShowMixedChange={setShowMixed}
              onShowEstimatedChange={setShowEstimated}
              onQueryChange={setQuery}
              onLayerVisibilityChange={setLayerVisibility}
              onReset={resetFilters}
            />
            {searchMatches.length ? (
              <div className="absolute left-4 right-4 top-20 z-[600] overflow-hidden rounded-md border border-stone-200 bg-white shadow-soft dark:border-stone-700 dark:bg-stone-900">
                {searchMatches.map(({ region, label }) => (
                  <button
                    key={region.code}
                    type="button"
                    onClick={() => chooseSearchTarget(region.code)}
                    className="block w-full border-b border-stone-100 px-3 py-2 text-left text-sm last:border-b-0 hover:bg-stone-50 dark:border-stone-800 dark:hover:bg-stone-800"
                  >
                    <span className="font-medium">{region.name}</span>
                    <span className="ml-2 text-stone-500">{label.replace(region.name, "").trim()}</span>
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          <section className="min-h-[540px]">
            <DialectMap
              currentRegionCode={currentRegionCode}
              selectedRegionCode={selectedRegionCode}
              activeFamilies={activeFamilies}
              branchFilter={branchFilter}
              onlyWithAudio={onlyWithAudio}
              showMixed={showMixed}
              focusedRegionCode={focusedRegionCode}
              layerVisibility={layerVisibility}
              onNavigate={navigateTo}
              onSelect={setSelectedRegionCode}
            />
            <section className="grid gap-3 border-t border-stone-200 bg-rice p-4 dark:border-stone-800 dark:bg-stone-950 md:grid-cols-2 xl:grid-cols-3">
              {linguisticGlossary.map((item) => (
                <article key={item.term} className="rounded-md border border-stone-200 bg-white p-4 dark:border-stone-700 dark:bg-stone-900">
                  <h3 className="font-medium text-stone-950 dark:text-stone-50">{item.term}</h3>
                  <p className="mt-2 text-sm leading-6 text-stone-600 dark:text-stone-300">{item.explanation}</p>
                </article>
              ))}
            </section>
          </section>

          <InfoPanel regionCode={selectedRegionCode} showEstimated={showEstimated} onOpenDialect={setDialogDialectId} />
        </main>
        <DialectDialog dialectId={dialogDialectId} onClose={() => setDialogDialectId(undefined)} />
      </div>
    </div>
  );
}

function buildBreadcrumb(currentRegionCode: string, selectedRegionCode?: string) {
  const items = [{ code: "100000", name: "全国" }];
  const current = getRegion(currentRegionCode);
  if (current && current.code !== "100000") items.push({ code: current.code, name: current.name });
  const selected = getRegion(selectedRegionCode);
  if (selected && selected.code !== current?.code && selected.level !== "province") {
    items.push({ code: selected.code, name: selected.name });
  }
  return items;
}

export default App;
