import type { Feature, FeatureCollection, Geometry } from "geojson";
import L, { type Layer } from "leaflet";
import { useCallback, useEffect, useRef, useState } from "react";
import type { DialectFamily, RegionLevel } from "../types/dialect";
import { familyColors, getPrimaryDialect, getRegion, getRegionStat, statMatchesFilters } from "../utils/dataLookup";
import { publicAssetUrl } from "../utils/publicPath";

type MapFeatureProps = {
  name: string;
  code?: string;
  adcode?: number;
  level: RegionLevel | "district";
  parentCode?: string;
  geoJsonUrl?: string;
};

type DialectMapProps = {
  currentRegionCode: string;
  selectedRegionCode?: string;
  activeFamilies: DialectFamily[];
  branchFilter: string;
  onlyWithAudio: boolean;
  showMixed: boolean;
  focusedRegionCode?: string;
  onNavigate: (regionCode: string) => void;
  onSelect: (regionCode: string) => void;
};

export function DialectMap({
  currentRegionCode,
  selectedRegionCode,
  activeFamilies,
  branchFilter,
  onlyWithAudio,
  showMixed,
  focusedRegionCode,
  onNavigate,
  onSelect,
}: DialectMapProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const geoLayerRef = useRef<L.GeoJSON | null>(null);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    mapRef.current = L.map(containerRef.current, {
      zoomControl: false,
      attributionControl: false,
      minZoom: 3,
      maxZoom: 9,
      zoomSnap: 0.25,
    }).setView([35, 104], 4);
    L.control.zoom({ position: "bottomleft" }).addTo(mapRef.current);
  }, []);

  const bindFeature = useCallback((layer: Layer, feature: Feature<Geometry, MapFeatureProps>) => {
    const props = normalizeFeatureProps(feature.properties);
    const stat = getRegionStat(props.code);
    const primary = getPrimaryDialect(stat);
    const configuredRegion = getRegion(props.code);
    const drillUrl = props.geoJsonUrl ?? configuredRegion?.geoJsonUrl;
    const canDrillDown = Boolean(drillUrl);

    layer.bindTooltip(
      `<strong>${props.name}</strong><br/>${primary ? `${primary.dialectName} · ${primary.family}` : "暂无方言数据"}`,
      { sticky: true, direction: "top", className: "dialect-tooltip" },
    );

    layer.on({
      click: () => {
        onSelect(props.code);
        if (canDrillDown && props.level !== "county") onNavigate(props.code);
      },
      mouseover: () => {
        (layer as L.Path).setStyle({ weight: 2.5, color: "#1f2933", fillOpacity: 0.92 });
      },
      mouseout: () => {
        (layer as L.Path).setStyle(getFeatureStyle(feature, selectedRegionCode, activeFamilies, branchFilter, onlyWithAudio, showMixed));
      },
    });
  }, [activeFamilies, branchFilter, onlyWithAudio, onNavigate, onSelect, selectedRegionCode, showMixed]);

  useEffect(() => {
    const map = mapRef.current;
    const currentRegion = getRegion(currentRegionCode);
    if (!map || !currentRegion?.geoJsonUrl) return;

    let cancelled = false;
    setLoadError("");

    const geoJsonUrl = publicAssetUrl(currentRegion.geoJsonUrl);

    fetch(geoJsonUrl)
      .then((response) => {
        if (!response.ok) throw new Error(`无法加载地图边界：${geoJsonUrl}`);
        return response.json() as Promise<FeatureCollection<Geometry, MapFeatureProps>>;
      })
      .then((geojson) => {
        if (cancelled) return;
        geoLayerRef.current?.remove();
        geoLayerRef.current = L.geoJSON(geojson, {
          style: (feature) => getFeatureStyle(feature as Feature<Geometry, MapFeatureProps>, selectedRegionCode, activeFamilies, branchFilter, onlyWithAudio, showMixed),
          onEachFeature: (feature, layer) => bindFeature(layer, feature as Feature<Geometry, MapFeatureProps>),
        }).addTo(map);

        const bounds = geoLayerRef.current.getBounds();
        if (bounds.isValid()) {
          map.fitBounds(bounds.pad(0.08), { animate: true });
        }
      })
      .catch((error: Error) => setLoadError(error.message));

    return () => {
      cancelled = true;
    };
  }, [currentRegionCode, activeFamilies, bindFeature, branchFilter, onlyWithAudio, selectedRegionCode, showMixed]);

  useEffect(() => {
    const map = mapRef.current;
    const geoLayer = geoLayerRef.current;
    if (!map || !geoLayer || !focusedRegionCode) return;

    geoLayer.eachLayer((layer) => {
      const feature = (layer as L.Layer & { feature?: Feature<Geometry, MapFeatureProps> }).feature;
      const props = feature ? normalizeFeatureProps(feature.properties) : undefined;
      if (props?.code === focusedRegionCode) {
        const bounds = (layer as L.Polygon).getBounds?.();
        if (bounds?.isValid()) map.fitBounds(bounds.pad(0.2), { animate: true, maxZoom: 7 });
      }
    });
  }, [focusedRegionCode]);

  return (
    <div className="relative h-full min-h-[520px] overflow-hidden bg-[#dfe8dd] dark:bg-stone-900">
      <div ref={containerRef} className="h-full w-full" />
      {loadError ? (
        <div className="absolute left-4 top-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {loadError}
        </div>
      ) : null}
      <div className="pointer-events-none absolute bottom-4 right-4 max-w-sm rounded-md border border-white/50 bg-white/88 px-3 py-2 text-xs text-stone-600 shadow-soft backdrop-blur dark:border-stone-700 dark:bg-stone-950/82 dark:text-stone-300">
        当前使用公开行政区划 GeoJSON；方言数据与地图边界分离维护。
      </div>
    </div>
  );
}

function getFeatureStyle(
  feature: Feature<Geometry, MapFeatureProps> | undefined,
  selectedRegionCode: string | undefined,
  activeFamilies: DialectFamily[],
  branchFilter: string,
  onlyWithAudio: boolean,
  showMixed: boolean,
) {
  const props = feature?.properties;
  const normalized = props ? normalizeFeatureProps(props) : undefined;
  const stat = getRegionStat(normalized?.code);
  const primary = getPrimaryDialect(stat);
  const matches = statMatchesFilters(stat, activeFamilies, branchFilter, onlyWithAudio, showMixed);
  const fillColor = primary ? familyColors[primary.family] : "#c9c7be";
  const isSelected = selectedRegionCode === normalized?.code;

  return {
    color: isSelected ? "#111827" : "#ffffff",
    weight: isSelected ? 3 : 1.2,
    fillColor,
    fillOpacity: matches ? 0.78 : 0.12,
    opacity: matches ? 1 : 0.35,
  };
}

function normalizeFeatureProps(props: MapFeatureProps) {
  return {
    ...props,
    code: props.code ?? String(props.adcode ?? ""),
    level: props.level === "district" ? "county" : props.level,
  };
}
