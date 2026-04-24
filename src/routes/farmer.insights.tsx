import { createFileRoute, Link } from "@tanstack/react-router";
import { TrendingUp, TrendingDown, ArrowLeft, BarChart3, Wheat } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import { useApp } from "@/lib/app-context";

export const Route = createFileRoute("/farmer/insights")({
  head: () => ({ meta: [{ title: "Market Insights — GrainGuard" }] }),
  component: InsightsPage,
});

const MARKET_DATA = [
  { crop: "Rice", kn: "ಅಕ್ಕಿ", price: 2140, change: 4.2, up: true },
  { crop: "Wheat", kn: "ಗೋಧಿ", price: 2320, change: 2.8, up: true },
  { crop: "Ragi", kn: "ರಾಗಿ", price: 3650, change: -1.1, up: false },
  { crop: "Maize", kn: "ಮೆಕ್ಕೆ", price: 1890, change: 0.5, up: true },
  { crop: "Jowar", kn: "ಜೋಳ", price: 2780, change: 3.1, up: true },
  { crop: "Groundnut", kn: "ಕಡಲೆಕಾಯಿ", price: 5620, change: -0.8, up: false },
  { crop: "Soyabean", kn: "ಸೋಯಾಬೀನ್", price: 4230, change: 1.9, up: true },
  { crop: "Sunflower", kn: "ಸೂರ್ಯಕಾಂತಿ", price: 6100, change: 0.3, up: true },
];

function InsightsPage() {
  const { t, language } = useApp();

  return (
    <PageShell>
      <section className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <Button asChild variant="ghost" className="mb-2 text-muted-foreground">
          <Link to="/farmer/active">
            <ArrowLeft className="mr-1.5 h-4 w-4" /> {t("Back to Dashboard", "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್‌ಗೆ ಹಿಂದೆ")}
          </Link>
        </Button>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft">
            <BarChart3 className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{t("Market Insights", "ಮಾರುಕಟ್ಟೆ ಒಳನೋಟ")}</h1>
            <p className="text-sm text-muted-foreground">{t("Live crop prices and market trends.", "ಲೈವ್ ಬೆಳೆ ಬೆಲೆಗಳು ಮತ್ತು ಮಾರುಕಟ್ಟೆ ಪ್ರವೃತ್ತಿಗಳು.")}</p>
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {MARKET_DATA.map((m) => (
            <div key={m.crop} className="rounded-xl border border-border bg-card p-4 shadow-[var(--shadow-soft)] transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-elevated)]">
              <div className="flex items-center gap-2">
                <Wheat className="h-4 w-4 text-primary" />
                <span className="font-semibold">{language === "en" ? m.crop : m.kn}</span>
              </div>
              <div className="mt-3 text-2xl font-bold">₹{m.price.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">{t("per quintal", "ಪ್ರತಿ ಕ್ವಿಂಟಾಲ್")}</div>
              <div className={`mt-2 inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-semibold ${m.up ? "bg-success/15 text-success" : "bg-destructive/15 text-destructive"}`}>
                {m.up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                {m.change > 0 ? "+" : ""}{m.change}%
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]">
          <h2 className="font-bold">{t("Market Advisory", "ಮಾರುಕಟ್ಟೆ ಸಲಹೆ")}</h2>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            {t(
              "Based on current trends, wheat and rice prices are showing upward momentum. Farmers storing these crops may benefit from holding for 2-3 more weeks. Ragi and groundnut show slight corrections — consider selling if your storage contract is nearing expiry.",
              "ಪ್ರಸ್ತುತ ಪ್ರವೃತ್ತಿಗಳ ಆಧಾರದ ಮೇಲೆ, ಗೋಧಿ ಮತ್ತು ಅಕ್ಕಿ ಬೆಲೆಗಳು ಏರಿಕೆ ತೋರುತ್ತಿವೆ. ಈ ಬೆಳೆಗಳನ್ನು ಸಂಗ್ರಹಿಸುವ ರೈತರು ಇನ್ನೂ 2-3 ವಾರ ಹಿಡಿದಿಟ್ಟುಕೊಳ್ಳುವುದರಿಂದ ಲಾಭ ಪಡೆಯಬಹುದು.",
            )}
          </p>
        </div>
      </section>
    </PageShell>
  );
}
