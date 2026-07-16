import { RotateCcw, Search } from "lucide-react";
import { dialectFamilies } from "../data/dialects";
import type { DialectFamily } from "../types/dialect";
import { familyColors } from "../utils/dataLookup";

type FilterPanelProps = {
  activeFamilies: DialectFamily[];
  branchFilter: string;
  branches: string[];
  onlyWithAudio: boolean;
  showMixed: boolean;
  showEstimated: boolean;
  query: string;
  layerVisibility: {
    choropleth: boolean;
    surveyPoints: boolean;
    audioPoints: boolean;
  };
  onFamiliesChange: (families: DialectFamily[]) => void;
  onBranchChange: (branch: string) => void;
  onOnlyWithAudioChange: (value: boolean) => void;
  onShowMixedChange: (value: boolean) => void;
  onShowEstimatedChange: (value: boolean) => void;
  onQueryChange: (value: string) => void;
  onLayerVisibilityChange: (value: FilterPanelProps["layerVisibility"]) => void;
  onReset: () => void;
};

export function FilterPanel({
  activeFamilies,
  branchFilter,
  branches,
  onlyWithAudio,
  showMixed,
  showEstimated,
  query,
  layerVisibility,
  onFamiliesChange,
  onBranchChange,
  onOnlyWithAudioChange,
  onShowMixedChange,
  onShowEstimatedChange,
  onQueryChange,
  onLayerVisibilityChange,
  onReset,
}: FilterPanelProps) {
  const toggleFamily = (family: DialectFamily) => {
    onFamiliesChange(
      activeFamilies.includes(family)
        ? activeFamilies.filter((item) => item !== family)
        : [...activeFamilies, family],
    );
  };

  return (
    <aside className="flex h-full min-h-0 flex-col gap-5 overflow-auto border-r border-stone-200/80 bg-white/82 p-4 backdrop-blur dark:border-stone-700/80 dark:bg-stone-950/72">
      <div>
        <label className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500 dark:text-stone-400">
          搜索
        </label>
        <div className="mt-2 flex items-center gap-2 rounded-md border border-stone-200 bg-white px-3 py-2 dark:border-stone-700 dark:bg-stone-900">
          <Search className="h-4 w-4 text-stone-400" />
          <input
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="城市名 / 方言名"
            className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-stone-400"
          />
        </div>
      </div>

      <div>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-stone-900 dark:text-stone-100">方言大类</h2>
          <button
            type="button"
            onClick={onReset}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-stone-200 text-stone-500 hover:bg-stone-100 dark:border-stone-700 dark:hover:bg-stone-800"
            title="重置筛选"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {dialectFamilies.map((family) => {
            const selected = activeFamilies.includes(family);
            return (
              <button
                key={family}
                type="button"
                onClick={() => toggleFamily(family)}
                className={`flex items-center gap-2 rounded-md border px-2.5 py-2 text-left text-sm transition ${
                  selected
                    ? "border-stone-900 bg-stone-900 text-white dark:border-stone-100 dark:bg-stone-100 dark:text-stone-950"
                    : "border-stone-200 bg-white text-stone-700 hover:bg-stone-50 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-200 dark:hover:bg-stone-800"
                }`}
              >
                <span className="h-3 w-3 rounded-sm" style={{ backgroundColor: familyColors[family] }} />
                {family}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <label className="text-sm font-semibold text-stone-900 dark:text-stone-100">方言小片</label>
        <select
          value={branchFilter}
          onChange={(event) => onBranchChange(event.target.value)}
          className="mt-2 w-full rounded-md border border-stone-200 bg-white px-3 py-2 text-sm dark:border-stone-700 dark:bg-stone-900"
        >
          <option value="">全部小片</option>
          {branches.map((branch) => (
            <option key={branch} value={branch}>
              {branch}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-3 rounded-md border border-stone-200 bg-stone-50 p-3 dark:border-stone-700 dark:bg-stone-900/70">
        <Toggle label="只显示有音频的地区" checked={onlyWithAudio} onChange={onOnlyWithAudioChange} />
        <Toggle label="显示混合方言区" checked={showMixed} onChange={onShowMixedChange} />
        <Toggle label="显示估算 / 暂缺标签" checked={showEstimated} onChange={onShowEstimatedChange} />
      </div>

      <div className="space-y-3 rounded-md border border-stone-200 bg-stone-50 p-3 dark:border-stone-700 dark:bg-stone-900/70">
        <h2 className="text-sm font-semibold text-stone-900 dark:text-stone-100">地图图层</h2>
        <Toggle label="行政区填色" checked={layerVisibility.choropleth} onChange={(value) => onLayerVisibilityChange({ ...layerVisibility, choropleth: value })} />
        <Toggle label="调查点" checked={layerVisibility.surveyPoints} onChange={(value) => onLayerVisibilityChange({ ...layerVisibility, surveyPoints: value })} />
        <Toggle label="音频点" checked={layerVisibility.audioPoints} onChange={(value) => onLayerVisibilityChange({ ...layerVisibility, audioPoints: value })} />
      </div>

      <div>
        <h2 className="mb-3 text-sm font-semibold text-stone-900 dark:text-stone-100">图例</h2>
        <div className="space-y-2">
          {dialectFamilies.map((family) => (
            <div key={family} className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-stone-700 dark:text-stone-300">
                <span className="h-3 w-5 rounded-sm" style={{ backgroundColor: familyColors[family] }} />
                {family}
              </span>
            </div>
          ))}
          <div className="flex items-center gap-2 text-sm text-stone-500">
            <span className="h-3 w-5 rounded-sm bg-stone-300 dark:bg-stone-700" />
            暂无数据
          </div>
        </div>
      </div>
    </aside>
  );
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (value: boolean) => void }) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-3 text-sm text-stone-700 dark:text-stone-200">
      <span>{label}</span>
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="h-4 w-4 accent-cinnabar"
      />
    </label>
  );
}
