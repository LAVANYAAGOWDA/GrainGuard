import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import {
  MapPin,
  Boxes,
  IndianRupee,
  ArrowLeft,
  SearchX,
  Filter,
  Warehouse,
  Star,
  Thermometer,
  ShieldCheck,
  Phone,
  List,
  Map as MapIcon,
  Sparkles,
  Truck,
  Users,
  Building2,
  Instagram,
  CreditCard,
  Timer,
} from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useApp } from "@/lib/app-context";
import { FlowBreadcrumb } from "@/components/Breadcrumb";
import { Suspense, useEffect, useState, type ComponentType } from "react";
import { cn } from "@/lib/utils";
import { CROPS } from "./farmer.index";

// Client-only loader. React.lazy inside a route module still gets eagerly
// resolved by TanStack's SSR loader pipeline, which then evaluates Leaflet
// (a `window`-dependent library) on the server. Gating the dynamic import on
// a mount effect guarantees it only runs in the browser.
type StorageMapProps = {
  storages: Storage[];
  searchQty?: string;
  searchDur?: string;
  searchUnit?: string;
};

function StorageMapClient(props: StorageMapProps) {
  const [Cmp, setCmp] = useState<ComponentType<StorageMapProps> | null>(null);
  useEffect(() => {
    let active = true;
    import("@/components/StorageMap").then((m) => {
      if (active) setCmp(() => m.StorageMap);
    });
    return () => {
      active = false;
    };
  }, []);
  if (!Cmp) {
    return (
      <div className="flex h-[480px] items-center justify-center rounded-xl border border-border bg-card text-sm text-muted-foreground">
        Loading map…
      </div>
    );
  }
  return <Cmp {...props} />;
}

interface SearchParams {
  crop?: string;
  quantity?: string;
  duration?: string;
  unit?: string;
}

export const Route = createFileRoute("/farmer/storage/")({
  validateSearch: (s: Record<string, unknown>): SearchParams => ({
    crop: typeof s.crop === "string" ? s.crop : undefined,
    quantity: typeof s.quantity === "string" ? s.quantity : undefined,
    duration: typeof s.duration === "string" ? s.duration : undefined,
    unit: typeof s.unit === "string" ? s.unit : undefined,
  }),
  head: () => ({ meta: [{ title: "Find Storage — GrainGuard" }] }),
  component: StorageList,
});

export type StorageType = "p2p" | "commercial" | "govt";

export interface Storage {
  id: string;
  name: string;
  ownerName: string;
  location: string;
  distanceKm: number;
  capacity: number;
  occupied: number;
  price: number;
  rating: number;
  tempMonitor: boolean;
  type: StorageType;
  security: string[];
  payments: string[];
  crops: string[];
  social?: string;
  lat: number;
  lng: number;
}

// Frontend-only seed data for UI shell. Replace with real backend list later.
export const STORAGES: Storage[] = [
  {
    id: "s1",
    name: "Green Field Warehouse",
    ownerName: "Ravi Kumar",
    location: "Mysuru",
    distanceKm: 4.2,
    capacity: 5000,
    occupied: 4800,
    price: 4,
    rating: 4.8,
    tempMonitor: true,
    type: "commercial",
    security: ["CCTV", "Guard", "Fire alarm"],
    payments: ["UPI", "Net Banking", "Cash"],
    crops: ["rice", "wheat", "maize", "ragi"],
    social: "@greenfield_warehouse",
    lat: 12.2958,
    lng: 76.6394,
  },
  {
    id: "s2",
    name: "Sunrise Granary",
    ownerName: "Lakshmi Devi",
    location: "Hassan",
    distanceKm: 7.8,
    capacity: 3000,
    occupied: 1200,
    price: 3,
    rating: 4.6,
    tempMonitor: false,
    type: "p2p",
    security: ["Lock & key", "Community watch"],
    payments: ["UPI", "Cash"],
    crops: ["rice", "ragi", "jowar"],
    lat: 13.0033,
    lng: 76.0963,
  },
  {
    id: "s3",
    name: "Krishna Storage Hub",
    ownerName: "Suresh Patil",
    location: "Mandya",
    distanceKm: 9.1,
    capacity: 8000,
    occupied: 5600,
    price: 5,
    rating: 4.9,
    tempMonitor: true,
    type: "commercial",
    security: ["CCTV", "Biometric", "Fire alarm", "24/7 Guard"],
    payments: ["UPI", "Net Banking", "Card"],
    crops: ["rice", "wheat", "maize", "pulses", "jowar", "ragi"],
    social: "@krishnahub",
    lat: 12.5226,
    lng: 76.8956,
  },
  {
    id: "s4",
    name: "Annapurna Cold Store",
    ownerName: "Shanthi N",
    location: "Tumakuru",
    distanceKm: 6.4,
    capacity: 2000,
    occupied: 800,
    price: 6,
    rating: 4.7,
    tempMonitor: true,
    type: "govt",
    security: ["CCTV", "Govt-approved"],
    payments: ["UPI", "Cash"],
    crops: ["pulses", "wheat"],
    lat: 13.3409,
    lng: 77.101,
  },
  {
    id: "s5",
    name: "Bhoomi Warehouse",
    ownerName: "Mohan Rao",
    location: "Belagavi",
    distanceKm: 8.7,
    capacity: 6500,
    occupied: 3500,
    price: 4,
    rating: 4.5,
    tempMonitor: false,
    type: "p2p",
    security: ["CCTV", "Lock & key"],
    payments: ["UPI", "Cash"],
    crops: ["wheat", "jowar", "maize"],
    lat: 15.8497,
    lng: 74.4977,
  },
];

function StorageList() {
  const { t, language } = useApp();
  const search = Route.useSearch();
  const [cropFilter, setCropFilter] = useState<string>(search.crop ?? "all");
  const [capFilter, setCapFilter] = useState("all");
  const [catFilter, setCatFilter] = useState("all");
  const [view, setView] = useState<"list" | "map">("list");
  const [radius, setRadius] = useState(10);
  const [timeLeft, setTimeLeft] = useState(300);
  const [radiusAutoExpanded, setRadiusAutoExpanded] = useState(false);

  // Auto-populate crop filter from search params on mount
  useEffect(() => {
    if (search.crop && search.crop !== "all") {
      setCropFilter(search.crop);
    }
  }, [search.crop]);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  // Parse multi-crop selection
  const selectedCrops = cropFilter !== "all" ? cropFilter.split(",").filter(Boolean) : [];

  const baseResults = useMemo(() => {
    return STORAGES.filter((s) => {
      // Multi-crop: facilities must accommodate ALL selected crops
      if (selectedCrops.length > 0) {
        const supportsAll = selectedCrops.every((c) => s.crops.includes(c));
        if (!supportsAll) return false;
      }
      if (capFilter === "small" && s.capacity > 3000) return false;
      if (capFilter === "medium" && (s.capacity <= 3000 || s.capacity > 6000)) return false;
      if (capFilter === "large" && s.capacity <= 6000) return false;
      if (catFilter !== "all" && s.type !== catFilter) return false;
      return true;
    }).sort((a, b) => {
      // Sort: facilities supporting ALL crops first
      if (selectedCrops.length > 1) {
        const aAll = selectedCrops.every((c) => a.crops.includes(c));
        const bAll = selectedCrops.every((c) => b.crops.includes(c));
        if (aAll && !bAll) return -1;
        if (!aAll && bAll) return 1;
      }
      return 0;
    });
  }, [cropFilter, capFilter, catFilter, selectedCrops]);

  const inRadius = baseResults.filter((s) => s.distanceKm <= radius);
  const radiusExpanded = inRadius.length === 0 && baseResults.length > 0;

  // Auto-expand radius to 50km if no results within 10km
  useEffect(() => {
    if (radiusExpanded && radius === 10 && !radiusAutoExpanded) {
      setRadius(50);
      setRadiusAutoExpanded(true);
    }
  }, [radiusExpanded, radius, radiusAutoExpanded]);

  const results = radiusExpanded ? baseResults : inRadius;

  const aiSuggestion = useMemo(() => {
    if (cropFilter === "rice" || search.crop === "rice")
      return t(
        "Rice requires dry, well-ventilated commercial storage. Filtering for facilities with temperature monitoring.",
        "ಅಕ್ಕಿಗೆ ಒಣ, ಗಾಳಿಯಾಡುವ ವಾಣಿಜ್ಯ ಸಂಗ್ರಹಣೆ ಬೇಕು. ತಾಪಮಾನ ಮಾನಿಟರಿಂಗ್ ಸೌಲಭ್ಯ ಫಿಲ್ಟರ್ ಮಾಡಲಾಗಿದೆ.",
      );
    if (cropFilter === "pulses")
      return t(
        "Pulses store best in cold facilities. Govt cold stores are recommended.",
        "ಬೇಳೆಗಳು ತಂಪಾದ ಸೌಲಭ್ಯಗಳಲ್ಲಿ ಚೆನ್ನಾಗಿ ಉಳಿಯುತ್ತವೆ.",
      );
    return t(
      "Showing best matches based on your crop, quantity, and proximity.",
      "ನಿಮ್ಮ ಬೆಳೆ, ಪ್ರಮಾಣ ಮತ್ತು ಸಮೀಪತೆಗೆ ಆಧಾರಿತ ಉತ್ತಮ ಹೊಂದಿಕೆಗಳು.",
    );
  }, [cropFilter, search.crop, t]);

  return (
    <PageShell>
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <FlowBreadcrumb
          current={2}
          steps={[
            { label: t("Summary", "ಸಾರಾಂಶ") },
            { label: t("Best Matches", "ಉತ್ತಮ ಹೊಂದಿಕೆಗಳು") },
            { label: t("Payment", "ಪಾವತಿ") },
          ]}
        />

        <Button asChild variant="ghost" className="mb-2 text-muted-foreground">
          <Link to="/farmer">
            <ArrowLeft className="mr-1.5 h-4 w-4" /> {t("Back", "ಹಿಂದೆ")}
          </Link>
        </Button>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-3xl font-bold">{t("Available Storage", "ಲಭ್ಯ ಸಂಗ್ರಹಣೆ")}</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {results.length} {t("results within", "ಫಲಿತಾಂಶಗಳು — ವ್ಯಾಪ್ತಿ")} {radius} km
            </p>
          </div>
          {/* View toggle */}
          <div className="inline-flex rounded-lg border border-border bg-card p-1">
            <button
              type="button"
              onClick={() => setView("list")}
              className={cn(
                "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                view === "list" ? "bg-primary text-primary-foreground" : "text-muted-foreground",
              )}
            >
              <List className="h-4 w-4" />
              {t("List", "ಪಟ್ಟಿ")}
            </button>
            <button
              type="button"
              onClick={() => setView("map")}
              className={cn(
                "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                view === "map" ? "bg-primary text-primary-foreground" : "text-muted-foreground",
              )}
            >
              <MapIcon className="h-4 w-4" />
              {t("Map", "ನಕ್ಷೆ")}
            </button>
          </div>
        </div>

        {/* AI suggestion banner */}
        <div className="mt-4 flex items-start gap-3 rounded-xl border border-primary/20 bg-primary-soft/60 p-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Sparkles className="h-4 w-4" />
          </div>
          <div className="text-sm">
            <div className="font-semibold">{t("AI Suggestion", "AI ಸಲಹೆ")}</div>
            <p className="mt-0.5 text-muted-foreground">{aiSuggestion}</p>
          </div>
        </div>

        {/* Capacity Lock Timer Banner */}
        <div className="mt-4 flex items-center justify-between gap-3 rounded-xl border border-earth/20 bg-earth/10 p-4">
          <div className="flex items-center gap-3 text-sm">
            <Timer className="h-5 w-5 text-earth" />
            <div>
              <div className="font-semibold">{t("Capacity Lock Active", "ಸಾಮರ್ಥ್ಯ ಲಾಕ್ ಸಕ್ರಿಯವಾಗಿದೆ")}</div>
              <p className="text-muted-foreground">
                {t("High demand! Complete booking to secure your spot.", "ಹೆಚ್ಚಿನ ಬೇಡಿಕೆ! ನಿಮ್ಮ ಸ್ಥಳವನ್ನು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಲು ಬುಕಿಂಗ್ ಪೂರ್ಣಗೊಳಿಸಿ.")}
              </p>
            </div>
          </div>
          <div className="font-mono text-xl font-bold text-earth">
            {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
          </div>
        </div>

        {/* Radius expanded alert */}
        {radiusAutoExpanded && (
          <div className="mt-3">
            <div className="flex items-start gap-3 rounded-xl border border-warning/40 bg-warning/10 p-4">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-warning-foreground" />
              <div className="text-sm">
                <div className="font-semibold">
                  {t("Search Area Expanded", "ಹುಡುಕಾಟ ಪ್ರದೇಶ ವಿಸ್ತರಿಸಲಾಗಿದೆ")}
                </div>
                <p className="mt-0.5 text-muted-foreground">
                  {t(
                    "Expanding search area to find the best match for your crops.",
                    "ನಿಮ್ಮ ಬೆಳೆಗಳಿಗೆ ಉತ್ತಮ ಹೊಂದಾಣಿಕೆ ಹುಡುಕಲು ಹುಡುಕಾಟ ಪ್ರದೇಶವನ್ನು ವಿಸ್ತರಿಸಲಾಗಿದೆ.",
                  )}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 grid gap-6 md:grid-cols-[260px_1fr]">
          {/* Filters */}
          <aside className="h-fit rounded-xl border border-border bg-card p-5">
            <div className="mb-4 flex items-center gap-2">
              <Filter className="h-4 w-4 text-primary" />
              <h2 className="font-semibold">{t("Filters", "ಫಿಲ್ಟರ್‌ಗಳು")}</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium">{t("Crop", "ಬೆಳೆ")}</label>
                <Select value={cropFilter} onValueChange={setCropFilter}>
                  <SelectTrigger className="h-10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t("All crops", "ಎಲ್ಲಾ ಬೆಳೆಗಳು")}</SelectItem>
                    {CROPS.map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.label[language]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">
                  {t("Capacity", "ಸಾಮರ್ಥ್ಯ")}
                </label>
                <Select value={capFilter} onValueChange={setCapFilter}>
                  <SelectTrigger className="h-10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t("Any size", "ಯಾವುದೇ ಗಾತ್ರ")}</SelectItem>
                    <SelectItem value="small">{"≤ 3,000 kg"}</SelectItem>
                    <SelectItem value="medium">{"3,000–6,000 kg"}</SelectItem>
                    <SelectItem value="large">{"> 6,000 kg"}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">
                  {t("Category", "ವರ್ಗ")}
                </label>
                <Select value={catFilter} onValueChange={setCatFilter}>
                  <SelectTrigger className="h-10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t("All Categories", "ಎಲ್ಲಾ ವರ್ಗಗಳು")}</SelectItem>
                    <SelectItem value="commercial">{t("Commercial", "ವಾಣಿಜ್ಯ")}</SelectItem>
                    <SelectItem value="p2p">{t("Community P2P", "ಸಮುದಾಯ P2P")}</SelectItem>
                    <SelectItem value="govt">{t("Government Approved", "ಸರ್ಕಾರ ಅನುಮೋದಿತ")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">
                  {t("Search radius", "ಹುಡುಕಾಟ ವ್ಯಾಪ್ತಿ")}: {radius} km
                </label>
                <input
                  type="range"
                  min={5}
                  max={100}
                  step={5}
                  value={radius}
                  onChange={(e) => setRadius(Number(e.target.value))}
                  className="w-full accent-primary"
                />
              </div>
            </div>
          </aside>

          {/* Results */}
          <div>
            {view === "map" ? (
              <Suspense
                fallback={
                  <div className="flex h-[480px] items-center justify-center rounded-xl border border-border bg-card text-sm text-muted-foreground">
                    {t("Loading map…", "ನಕ್ಷೆ ಲೋಡ್ ಆಗುತ್ತಿದೆ…")}
                  </div>
                }
              >
                <StorageMapClient
                  storages={results}
                  searchQty={search.quantity}
                  searchDur={search.duration}
                  searchUnit={search.unit}
                />
              </Suspense>
            ) : results.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card py-16 text-center">
                <SearchX className="h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-semibold">
                  {t("No storage available", "ಯಾವುದೇ ಸಂಗ್ರಹಣೆ ಲಭ್ಯವಿಲ್ಲ")}
                </h3>
                <p className="mt-1 max-w-xs text-sm text-muted-foreground">
                  {t("Try adjusting your filters.", "ನಿಮ್ಮ ಫಿಲ್ಟರ್‌ಗಳನ್ನು ಬದಲಾಯಿಸಿ.")}
                </p>
              </div>
            ) : (
              <div className="grid gap-4">
                {results.map((s) => {
                  const occupiedPct = Math.round((s.occupied / s.capacity) * 100);
                  const available = s.capacity - s.occupied;
                  const typeBadge =
                    s.type === "p2p"
                      ? {
                          label: t("Community P2P Storage", "ಸಮುದಾಯ P2P"),
                          Icon: Users,
                          cls: "bg-secondary/40 text-secondary-foreground",
                        }
                      : s.type === "commercial"
                        ? {
                            label: t("Commercial AI Storage", "ವಾಣಿಜ್ಯ AI"),
                            Icon: Building2,
                            cls: "bg-primary/15 text-primary",
                          }
                        : {
                            label: t("Govt Approved", "ಸರ್ಕಾರ ಅನುಮೋದಿತ"),
                            Icon: ShieldCheck,
                            cls: "bg-earth/15 text-earth",
                          };
                  return (
                    <Link
                      key={s.id}
                      to="/farmer/storage/$id"
                      params={{ id: s.id }}
                      search={{
                        quantity: search.quantity,
                        duration: search.duration,
                        unit: search.unit,
                      }}
                      className="group flex flex-col rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-soft)] transition-all hover:-translate-y-0.5 hover:border-primary hover:shadow-[var(--shadow-card)]"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div className="flex items-center gap-3">
                          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-soft">
                            <Warehouse className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold group-hover:text-primary">
                              {s.name}
                            </h3>
                            <div className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" /> {s.location}
                              </span>
                              <span>·</span>
                              <span>
                                {s.distanceKm} km {t("away", "ದೂರ")}
                              </span>
                            </div>
                          </div>
                        </div>
                        <span
                          className={cn(
                            "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold",
                            typeBadge.cls,
                          )}
                        >
                          <typeBadge.Icon className="h-3 w-3" />
                          {typeBadge.label}
                        </span>
                      </div>

                      {/* Rating + temp + crop icons */}
                      <div className="mt-3 flex flex-wrap items-center gap-3 text-xs">
                        <span className="inline-flex items-center gap-1 rounded-full bg-warning/15 px-2 py-0.5 font-semibold text-warning-foreground">
                          <Star className="h-3 w-3 fill-current" />
                          {s.rating.toFixed(1)}
                        </span>
                        <span
                          className={cn(
                            "inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-medium",
                            s.tempMonitor
                              ? "bg-success/15 text-success"
                              : "bg-muted text-muted-foreground",
                          )}
                        >
                          <Thermometer className="h-3 w-3" />
                          {s.tempMonitor
                            ? t("Live temp monitor", "ತಾಪಮಾನ ಮಾನಿಟರ್")
                            : t("No temp monitor", "ತಾಪಮಾನ ಇಲ್ಲ")}
                        </span>
                        <span className="inline-flex items-center gap-1 text-muted-foreground">
                          <ShieldCheck className="h-3 w-3 text-primary" />
                          {s.security.length} {t("security features", "ಸುರಕ್ಷತಾ ವೈಶಿಷ್ಟ್ಯಗಳು")}
                        </span>
                        {selectedCrops.length > 0 && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-primary-soft px-2 py-0.5 text-[10px] font-bold text-primary">
                            {selectedCrops.filter(c => s.crops.includes(c)).length}/{selectedCrops.length} {t("crops", "ಬೆಳೆ")}
                          </span>
                        )}
                      </div>

                      {/* Capacity bar */}
                      <div className="mt-4">
                        <div className="mb-1 flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">
                            {t("Availability", "ಲಭ್ಯತೆ")}
                          </span>
                          <span className="font-semibold">
                            {t("Only", "ಕೇವಲ")} {available.toLocaleString()} kg{" "}
                            {t("left", "ಉಳಿದಿದೆ")}
                          </span>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                          <div
                            className={cn(
                              "h-full rounded-full transition-all",
                              occupiedPct > 85
                                ? "bg-destructive"
                                : occupiedPct > 60
                                  ? "bg-warning"
                                  : "bg-primary",
                            )}
                            style={{ width: `${occupiedPct}%` }}
                          />
                        </div>
                      </div>

                      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-3 text-xs">
                        <div className="flex items-center gap-1.5">
                          <CreditCard className="h-3 w-3 text-muted-foreground" />
                          <span className="text-muted-foreground">{s.payments.join(", ")}</span>
                        </div>
                        {s.social && (
                          <span className="inline-flex items-center gap-1 text-muted-foreground">
                            <Instagram className="h-3 w-3" /> {s.social}
                          </span>
                        )}
                        <div className="ml-auto flex items-center gap-3">
                          <span className="inline-flex items-center gap-1 text-muted-foreground">
                            <Boxes className="h-3 w-3" /> {s.capacity.toLocaleString()} kg
                          </span>
                          <span className="inline-flex items-center gap-1 font-semibold text-foreground">
                            <IndianRupee className="h-3 w-3" />
                            {s.price}/kg/{language === "en" ? "mo" : "ತಿ"}
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
