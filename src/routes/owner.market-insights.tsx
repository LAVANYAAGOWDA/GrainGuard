import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  TrendingUp,
  Users,
  BarChart3,
  Lock,
  Crown,
  Wheat,
  Thermometer,
  MapPin,
} from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import { useApp } from "@/lib/app-context";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/owner/market-insights")({
  head: () => ({ meta: [{ title: "Market Insights — GrainGuard" }] }),
  component: OwnerMarketInsights,
});

function OwnerMarketInsights() {
  const { t, user } = useApp();
  const navigate = useNavigate();
  const isPrime = user?.membership === "Prime";

  const demandCards = [
    {
      icon: Users,
      title: t("Active Farmer Demand", "ಸಕ್ರಿಯ ರೈತರ ಬೇಡಿಕೆ"),
      value: "47",
      hint: t("Farmers seeking Cold Storage near you", "ನಿಮ್ಮ ಬಳಿ ಕೋಲ್ಡ್ ಸ್ಟೋರೇಜ್ ಹುಡುಕುತ್ತಿರುವ ರೈತರು"),
      trend: "+12%",
    },
    {
      icon: Wheat,
      title: t("Local Crop Trends", "ಸ್ಥಳೀಯ ಬೆಳೆ ಪ್ರವೃತ್ತಿಗಳು"),
      value: t("Ragi, Paddy", "ರಾಗಿ, ಭತ್ತ"),
      hint: t("Top crops stored in your district this month", "ಈ ತಿಂಗಳು ನಿಮ್ಮ ಜಿಲ್ಲೆಯಲ್ಲಿ ಸಂಗ್ರಹಿಸಿದ ಉನ್ನತ ಬೆಳೆಗಳು"),
      trend: "+8%",
    },
    {
      icon: BarChart3,
      title: t("Competitor Pricing Averages", "ಪ್ರತಿಸ್ಪರ್ಧಿ ಬೆಲೆ ಸರಾಸರಿ"),
      value: "₹3.2/kg/mo",
      hint: t("Average rate within 25km radius", "25ಕಿಮೀ ವ್ಯಾಪ್ತಿಯಲ್ಲಿ ಸರಾಸರಿ ದರ"),
      trend: "-2%",
    },
  ];

  const seasonalData = [
    { crop: t("Paddy", "ಭತ್ತ"), demand: 85, avg: "₹2.8" },
    { crop: t("Ragi", "ರಾಗಿ"), demand: 72, avg: "₹3.5" },
    { crop: t("Maize", "ಮೆಕ್ಕೆ"), demand: 58, avg: "₹2.2" },
    { crop: t("Wheat", "ಗೋಧಿ"), demand: 45, avg: "₹3.0" },
    { crop: t("Jowar", "ಜೋಳ"), demand: 34, avg: "₹2.5" },
  ];

  return (
    <PageShell>
      <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h1 className="text-3xl font-bold">{t("Market Insights", "ಮಾರುಕಟ್ಟೆ ಒಳನೋಟ")}</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {t("Analytics and trends for your storage business.", "ನಿಮ್ಮ ಸಂಗ್ರಹಣಾ ವ್ಯವಹಾರಕ್ಕಾಗಿ ವಿಶ್ಲೇಷಣೆ ಮತ್ತು ಪ್ರವೃತ್ತಿಗಳು.")}
            </p>
          </div>
          {isPrime && (
            <span className="inline-flex items-center gap-1 rounded-full bg-warning/20 px-3 py-1 text-xs font-bold text-warning-foreground">
              <Crown className="h-3.5 w-3.5" /> Prime
            </span>
          )}
        </div>

        {/* Content wrapper — blurred for Basic, clear for Prime */}
        <div className="relative mt-6">
          {/* Paywall overlay for Basic users */}
          {!isPrime && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center rounded-2xl bg-background/60 backdrop-blur-sm">
              <div className="mx-auto max-w-sm rounded-2xl border border-border bg-card p-8 text-center shadow-[var(--shadow-elevated)]">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-warning/15">
                  <Lock className="h-8 w-8 text-warning-foreground" />
                </div>
                <h2 className="mt-4 text-xl font-bold">
                  {t("Premium Feature Locked", "ಪ್ರೀಮಿಯಂ ವೈಶಿಷ್ಟ್ಯ ಲಾಕ್ ಆಗಿದೆ")}
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  {t(
                    "Upgrade to Prime to unlock full Market Insights, competitor analytics, and demand forecasting.",
                    "ಸಂಪೂರ್ಣ ಮಾರುಕಟ್ಟೆ ಒಳನೋಟ, ಪ್ರತಿಸ್ಪರ್ಧಿ ವಿಶ್ಲೇಷಣೆ, ಮತ್ತು ಬೇಡಿಕೆ ಮುನ್ಸೂಚನೆಯನ್ನು ಅನ್‌ಲಾಕ್ ಮಾಡಲು ಪ್ರೈಮ್‌ಗೆ ಅಪ್‌ಗ್ರೇಡ್ ಮಾಡಿ.",
                  )}
                </p>
                <ul className="mt-4 space-y-1.5 text-left text-xs text-muted-foreground">
                  {["Real-time farmer demand data", "Competitor pricing averages", "Seasonal crop trend analytics", "Priority search ranking"].map((f) => (
                    <li key={f} className="flex items-center gap-1.5">
                      <Crown className="h-3 w-3 text-warning-foreground" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button
                  size="lg"
                  className="mt-6 w-full gap-2 bg-warning text-warning-foreground hover:bg-warning/90"
                  onClick={() => navigate({ to: "/login", search: { upgrade: "prime" } })}
                >
                  <Crown className="h-4 w-4" />
                  {t("Take Prime Subscription — ₹999", "ಪ್ರೈಮ್ ಚಂದಾದಾರಿಕೆ ತೆಗೆದುಕೊಳ್ಳಿ — ₹999")}
                </Button>
              </div>
            </div>
          )}

          {/* Blurred content for Basic, visible for Prime */}
          <div className={cn(!isPrime && "pointer-events-none select-none blur-md")}>
            {/* Demand cards */}
            <div className="grid gap-4 sm:grid-cols-3">
              {demandCards.map((card) => (
                <div key={card.title} className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-soft)]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <card.icon className="h-4 w-4 text-primary" />
                      {card.title}
                    </div>
                    <span className={cn(
                      "rounded-full px-2 py-0.5 text-[10px] font-bold",
                      card.trend.startsWith("+") ? "bg-success/15 text-success" : "bg-destructive/15 text-destructive",
                    )}>
                      {card.trend}
                    </span>
                  </div>
                  <div className="mt-3 text-2xl font-black">{card.value}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{card.hint}</div>
                </div>
              ))}
            </div>

            {/* Seasonal Demand Table */}
            <div className="mt-6 rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
              <h2 className="flex items-center gap-2 text-lg font-semibold">
                <TrendingUp className="h-5 w-5 text-primary" />
                {t("Seasonal Demand Forecast", "ಋತುಮಾನ ಬೇಡಿಕೆ ಮುನ್ಸೂಚನೆ")}
              </h2>
              <div className="mt-4 space-y-3">
                {seasonalData.map((row) => (
                  <div key={row.crop} className="flex items-center gap-4">
                    <span className="w-20 text-sm font-medium">{row.crop}</span>
                    <div className="flex-1">
                      <div className="h-3 w-full overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full rounded-full bg-primary transition-all"
                          style={{ width: `${row.demand}%` }}
                        />
                      </div>
                    </div>
                    <span className="w-16 text-right text-sm font-semibold">{row.demand}%</span>
                    <span className="w-16 text-right text-xs text-muted-foreground">{row.avg}/kg</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Nearby demand heatmap placeholder */}
            <div className="mt-6 rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]">
              <h2 className="flex items-center gap-2 text-lg font-semibold">
                <MapPin className="h-5 w-5 text-primary" />
                {t("Nearby Demand Hotspots", "ಸಮೀಪದ ಬೇಡಿಕೆ ಹಾಟ್‌ಸ್ಪಾಟ್‌ಗಳು")}
              </h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {[
                  { area: "Mandya", farmers: 23, crop: t("Paddy", "ಭತ್ತ") },
                  { area: "Mysuru", farmers: 18, crop: t("Ragi", "ರಾಗಿ") },
                  { area: "Hassan", farmers: 12, crop: t("Maize", "ಮೆಕ್ಕೆ") },
                  { area: "Tumakuru", farmers: 9, crop: t("Wheat", "ಗೋಧಿ") },
                ].map((spot) => (
                  <div key={spot.area} className="flex items-center gap-3 rounded-lg bg-muted/40 p-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-soft">
                      <MapPin className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold">{spot.area}</div>
                      <div className="text-xs text-muted-foreground">
                        {spot.farmers} {t("farmers seeking", "ರೈತರು ಹುಡುಕುತ್ತಿದ್ದಾರೆ")} {spot.crop}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
