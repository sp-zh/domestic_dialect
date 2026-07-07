import { PauseCircle, PlayCircle, Volume2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { getDataSource } from "../data/sources";
import type { DialectAudio } from "../types/dialect";
import { confidenceLabel, getDialect, getFeature, getRegionAudios, getRegionStat } from "../utils/dataLookup";

type InfoPanelProps = {
  regionCode?: string;
  showEstimated: boolean;
  onOpenDialect: (dialectId: string) => void;
};

export function InfoPanel({ regionCode, showEstimated, onOpenDialect }: InfoPanelProps) {
  const stat = getRegionStat(regionCode);
  const [activeDialectId, setActiveDialectId] = useState<string | undefined>();
  const [playingId, setPlayingId] = useState<string | undefined>();
  const audioRefs = useRef<Record<string, HTMLAudioElement | null>>({});

  useEffect(() => {
    Object.values(audioRefs.current).forEach((audio) => audio?.pause());
    setPlayingId(undefined);
    setActiveDialectId(stat?.dialects[0]?.dialectId);
  }, [regionCode, stat]);

  if (!stat) {
    return (
      <aside className="h-full overflow-auto border-l border-stone-200/80 bg-white/86 p-5 backdrop-blur dark:border-stone-700/80 dark:bg-stone-950/76">
        <div className="flex h-full min-h-[420px] items-center justify-center rounded-md border border-dashed border-stone-300 p-8 text-center dark:border-stone-700">
          <div>
            <h2 className="font-serif text-2xl text-stone-900 dark:text-stone-50">选择一个地区</h2>
            <p className="mt-3 text-sm leading-6 text-stone-500 dark:text-stone-400">
              点击地图上的省、市或县级区域后，这里会显示方言分布、语言学特征和音频样本。
            </p>
          </div>
        </div>
      </aside>
    );
  }

  const activeDialect = stat.dialects.find((dialect) => dialect.dialectId === activeDialectId) ?? stat.dialects[0];
  const feature = getFeature(activeDialect?.dialectId);
  const audios = getRegionAudios(stat.regionCode, activeDialect?.dialectId);

  const toggleAudio = (audio: DialectAudio) => {
    const current = audioRefs.current[audio.id];
    Object.entries(audioRefs.current).forEach(([id, element]) => {
      if (id !== audio.id) element?.pause();
    });

    if (!current) return;
    if (current.paused) {
      current.play().then(() => setPlayingId(audio.id)).catch(() => setPlayingId(undefined));
    } else {
      current.pause();
      setPlayingId(undefined);
    }
  };

  return (
    <aside className="h-full overflow-auto border-l border-stone-200/80 bg-white/88 p-5 backdrop-blur dark:border-stone-700/80 dark:bg-stone-950/76">
      <div className="mb-5">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500 dark:text-stone-400">
          {stat.province} · {stat.level === "province" ? "省级" : stat.level === "city" ? "市级" : "县级"}
        </p>
        <h2 className="mt-1 font-serif text-3xl font-semibold text-stone-950 dark:text-stone-50">{stat.regionName}</h2>
        <p className="mt-1 text-sm text-stone-500">行政区划代码：{stat.regionCode}</p>
      </div>

      <Card title="方言概览">
        <div className="flex flex-wrap gap-2">
          {stat.dialects.map((dialect) => (
            <button
              key={dialect.dialectId}
              type="button"
              onClick={() => setActiveDialectId(dialect.dialectId)}
              onDoubleClick={() => onOpenDialect(dialect.dialectId)}
              className={`rounded-md border px-3 py-2 text-left text-sm ${
                activeDialect?.dialectId === dialect.dialectId
                  ? "border-stone-900 bg-stone-900 text-white dark:border-stone-100 dark:bg-stone-100 dark:text-stone-950"
                  : "border-stone-200 bg-white text-stone-700 hover:bg-stone-50 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-200"
              }`}
            >
              <span className="font-semibold">{dialect.dialectName}</span>
              <span className="ml-2 opacity-75">{dialect.branch ?? dialect.family}</span>
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => activeDialect && onOpenDialect(activeDialect.dialectId)}
          className="mt-3 text-sm font-medium text-cinnabar hover:underline"
        >
          查看当前方言详情
        </button>
      </Card>

      <Card title="使用比例">
        <div className="space-y-3">
          {stat.dialects.map((dialect) => (
            <div key={dialect.dialectId}>
              <div className="mb-1 flex items-center justify-between gap-3 text-sm">
                <span className="font-medium text-stone-800 dark:text-stone-100">{dialect.dialectName}</span>
                <span className="text-stone-500">
                  {typeof dialect.percentage === "number" ? `${dialect.percentage}%` : "暂无精确数据"}
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-stone-200 dark:bg-stone-800">
                <div className="h-full bg-cinnabar" style={{ width: `${dialect.percentage ?? 0}%` }} />
              </div>
              {showEstimated ? (
                <SourceLine
                  confidence={confidenceLabel[dialect.confidence]}
                  sourceId={dialect.dataSource}
                  sourceUrl={dialect.sourceUrl}
                  basis={dialect.percentageBasis}
                  notes={dialect.notes}
                />
              ) : null}
            </div>
          ))}
        </div>
      </Card>

      <Card title="语音特征">
        {feature ? (
          <div className="grid grid-cols-2 gap-2 text-sm">
            <FeatureItem label="方言归属" value={feature.affiliation} wide />
            <FeatureItem label="声母特点" value={feature.initials} wide />
            <FeatureItem label="韵母特点" value={feature.finals} wide />
            <FeatureItem label="声调系统" value={feature.tones} wide />
            <FeatureItem label="入声" value={feature.checkedTone} />
            <FeatureItem label="浊音遗迹" value={feature.voicedInitialTrace} />
            <FeatureItem label="尖团音" value={feature.sharpRoundDistinction} />
            <FeatureItem label="n/l" value={feature.nlDistinction} />
            <FeatureItem label="前后鼻音" value={feature.nasalFinalDistinction} />
            <FeatureItem label="儿化" value={feature.erhua} />
            <FeatureItem label="连读变调" value={feature.toneSandhi} wide />
            <FeatureItem label="常见语法" value={feature.grammarNotes} wide />
            <FeatureItem label="与普通话差异" value={feature.mandarinDifferences} wide />
          </div>
        ) : (
          <Empty text="该方言的结构化语言学特征尚未录入。" />
        )}
      </Card>

      <Card title="代表词汇">
        {feature?.vocabulary.length ? (
          <div className="overflow-hidden rounded-md border border-stone-200 dark:border-stone-700">
            <table className="w-full text-left text-sm">
              <thead className="bg-stone-100 text-stone-600 dark:bg-stone-800 dark:text-stone-300">
                <tr>
                  <th className="px-3 py-2">普通话</th>
                  <th className="px-3 py-2">当地方言</th>
                  <th className="px-3 py-2">说明</th>
                </tr>
              </thead>
              <tbody>
                {feature.vocabulary.map((word) => (
                  <tr key={`${word.mandarin}-${word.local}`} className="border-t border-stone-200 dark:border-stone-700">
                    <td className="px-3 py-2">{word.mandarin}</td>
                    <td className="px-3 py-2 font-medium">{word.local}</td>
                    <td className="px-3 py-2 text-stone-500">{word.ipa ?? word.notes ?? "待补充"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <Empty text="暂无代表词汇。" />
        )}
      </Card>

      <Card title="音频样本">
        {stat.dialects.length > 1 ? (
          <select
            value={activeDialect?.dialectId}
            onChange={(event) => setActiveDialectId(event.target.value)}
            className="mb-3 w-full rounded-md border border-stone-200 bg-white px-3 py-2 text-sm dark:border-stone-700 dark:bg-stone-900"
          >
            {stat.dialects.map((dialect) => (
              <option key={dialect.dialectId} value={dialect.dialectId}>
                {dialect.dialectName}
              </option>
            ))}
          </select>
        ) : null}
        {audios.length ? (
          <div className="space-y-3">
            {audios.map((audio) => (
              <div
                key={audio.id}
                className={`rounded-md border p-3 ${
                  playingId === audio.id
                    ? "border-cinnabar bg-red-50/70 dark:bg-red-950/20"
                    : "border-stone-200 bg-white dark:border-stone-700 dark:bg-stone-900"
                }`}
              >
                <div className="flex items-start gap-3">
                  <button
                    type="button"
                    onClick={() => toggleAudio(audio)}
                    className="mt-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-950"
                    title={playingId === audio.id ? "暂停" : "播放"}
                  >
                    {playingId === audio.id ? <PauseCircle className="h-5 w-5" /> : <PlayCircle className="h-5 w-5" />}
                  </button>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-medium text-stone-950 dark:text-stone-50">{audio.title}</h3>
                    <p className="text-xs text-stone-500">
                      {audio.dialectName} · {kindLabel[audio.kind]} {audio.speakerInfo?.hometown ? `· ${audio.speakerInfo.hometown}` : ""}
                    </p>
                    {audio.transcript ? <p className="mt-2 text-sm text-stone-700 dark:text-stone-200">转写：{audio.transcript}</p> : null}
                    {audio.mandarinTranslation ? <p className="text-sm text-stone-500">普通话：{audio.mandarinTranslation}</p> : null}
                    <audio
                      ref={(node) => {
                        audioRefs.current[audio.id] = node;
                      }}
                      src={audio.audioUrl}
                      controls
                      className="mt-3 w-full"
                      onPause={() => setPlayingId((current) => (current === audio.id ? undefined : current))}
                      onPlay={() => setPlayingId(audio.id)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Empty text="该地区尚未录入音频。把音频放入 public/audio/行政区划代码/ 并更新 audioIndex.ts 即可显示。" />
        )}
      </Card>
    </aside>
  );
}

export function DialectDialog({ dialectId, onClose }: { dialectId?: string; onClose: () => void }) {
  const dialect = getDialect(dialectId);
  const feature = getFeature(dialectId);
  if (!dialect) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-stone-950/45 p-4">
      <div className="max-h-[86vh] w-full max-w-2xl overflow-auto rounded-lg bg-white p-6 shadow-soft dark:bg-stone-950">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-cinnabar">{dialect.parentPath.join(" > ")}</p>
            <h2 className="font-serif text-3xl font-semibold text-stone-950 dark:text-stone-50">{dialect.name}</h2>
            <p className="mt-2 text-stone-600 dark:text-stone-300">{dialect.summary}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-stone-200 hover:bg-stone-100 dark:border-stone-700 dark:hover:bg-stone-800"
            title="关闭"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        {feature ? (
          <div className="space-y-3 text-sm leading-6 text-stone-700 dark:text-stone-200">
            <p><strong>声母：</strong>{feature.initials}</p>
            <p><strong>韵母：</strong>{feature.finals}</p>
            <p><strong>声调：</strong>{feature.tones}</p>
            <p><strong>连读变调：</strong>{feature.toneSandhi}</p>
            <p><strong>语法特点：</strong>{feature.grammarNotes}</p>
          </div>
        ) : (
          <Empty text="暂无完整介绍。" />
        )}
      </div>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-4 rounded-md border border-stone-200 bg-white p-4 shadow-sm dark:border-stone-700 dark:bg-stone-900/78">
      <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-stone-950 dark:text-stone-50">
        <Volume2 className="h-4 w-4 text-cinnabar" />
        {title}
      </h3>
      {children}
    </section>
  );
}

function FeatureItem({ label, value, wide = false }: { label: string; value: string; wide?: boolean }) {
  return (
    <div className={wide ? "col-span-2" : ""}>
      <p className="text-xs text-stone-500">{label}</p>
      <p className="mt-0.5 leading-6 text-stone-800 dark:text-stone-100">{value}</p>
    </div>
  );
}

function Empty({ text }: { text: string }) {
  return <p className="rounded-md bg-stone-100 px-3 py-4 text-sm text-stone-500 dark:bg-stone-800/80">{text}</p>;
}

const kindLabel: Record<string, string> = {
  intro: "方言介绍",
  words: "词汇朗读",
  sentences: "短句朗读",
  conversation: "自然对话",
  story: "民间故事",
};

const basisLabel: Record<string, string> = {
  survey: "实地调查比例",
  "census-language": "语言人口统计",
  "literature-estimate": "文献估算",
  "not-available": "未见公开比例",
};

function SourceLine({
  confidence,
  sourceId,
  sourceUrl,
  basis,
  notes,
}: {
  confidence: string;
  sourceId?: string;
  sourceUrl?: string;
  basis?: string;
  notes?: string;
}) {
  const source = getDataSource(sourceId);
  const url = sourceUrl ?? source?.url;

  return (
    <p className="mt-1 text-xs leading-5 text-stone-500">
      数据可信度：{confidence}
      {basis ? ` · 比例依据：${basisLabel[basis] ?? basis}` : ""}
      {source ? " · 来源：" : ""}
      {source && url ? (
        <a href={url} target="_blank" rel="noreferrer" className="text-cinnabar hover:underline">
          {source.title}
        </a>
      ) : source ? (
        source.title
      ) : null}
      {notes ? ` · ${notes}` : ""}
    </p>
  );
}
