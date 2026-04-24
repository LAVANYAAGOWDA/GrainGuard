import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Bell,
  CheckCircle2,
  Clock,
  TrendingUp,
  TrendingDown,
  ArrowLeft,
  ShieldCheck,
  Package,
} from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import { useApp } from "@/lib/app-context";

export const Route = createFileRoute("/farmer/alerts")({
  head: () => ({ meta: [{ title: "Alerts & Status — GrainGuard" }] }),
  component: AlertsPage,
});

function AlertsPage() {
  const { t, activeBookings } = useApp();

  const alerts = [
    {
      id: "a1",
      type: "approval" as const,
      title: t("Booking Approved", "ಬುಕಿಂಗ್ ಅನುಮೋದಿತ"),
      desc: t("Your booking for wheat storage at Green Valley has been approved by the owner.", "ಗ್ರೀನ್ ವ್ಯಾಲಿಯಲ್ಲಿ ಗೋಧಿ ಸಂಗ್ರಹಣಾ ಬುಕಿಂಗ್ ಅನ್ನು ಮಾಲೀಕರು ಅನುಮೋದಿಸಿದ್ದಾರೆ."),
      time: t("2 hours ago", "2 ಗಂಟೆಗಳ ಹಿಂದೆ"),
    },
    {
      id: "a2",
      type: "retrieval" as const,
      title: t("Retrieval Deadline Approaching", "ಮರುಪಡೆಯುವ ಗಡುವು ಸಮೀಪಿಸುತ್ತಿದೆ"),
      desc: t("Your ragi storage at Mandya Warehouse expires in 5 days. Plan your retrieval.", "ಮಂಡ್ಯ ಗೋದಾಮಿನಲ್ಲಿ ನಿಮ್ಮ ರಾಗಿ ಸಂಗ್ರಹಣೆ 5 ದಿನಗಳಲ್ಲಿ ಮುಕ್ತಾಯವಾಗುತ್ತದೆ."),
      time: t("1 day ago", "1 ದಿನದ ಹಿಂದೆ"),
    },
    {
      id: "a3",
      type: "market" as const,
      title: t("Wheat Prices Rising", "ಗೋಧಿ ಬೆಲೆಗಳು ಏರುತ್ತಿವೆ"),
      desc: t("Wheat spot price up +4.2% this week. Consider selling if your storage is nearing expiry.", "ಈ ವಾರ ಗೋಧಿ ಸ್ಪಾಟ್ ಬೆಲೆ +4.2% ಏರಿದೆ. ನಿಮ್ಮ ಸಂಗ್ರಹಣೆ ಮುಕ್ತಾಯಕ್ಕೆ ಹತ್ತಿರವಾಗಿದ್ದರೆ ಮಾರಾಟ ಪರಿಗಣಿಸಿ."),
      time: t("3 hours ago", "3 ಗಂಟೆಗಳ ಹಿಂದೆ"),
    },
  ];

  const iconMap = {
    approval: CheckCircle2,
    retrieval: Clock,
    market: TrendingUp,
  };
  const colorMap = {
    approval: "bg-success/15 text-success",
    retrieval: "bg-warning/15 text-warning-foreground",
    market: "bg-primary/15 text-primary",
  };

  const trends = [
    { crop: t("Rice", "ಅಕ್ಕಿ"), price: "₹2,140", change: "+4.2%", up: true },
    { crop: t("Wheat", "ಗೋಧಿ"), price: "₹2,320", change: "+2.8%", up: true },
    { crop: t("Ragi", "ರಾಗಿ"), price: "₹3,650", change: "-1.1%", up: false },
    { crop: t("Maize", "ಮೆಕ್ಕೆ"), price: "₹1,890", change: "+0.5%", up: true },
  ];

  return (
    <PageShell>
      <section className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        <Button asChild variant="ghost" className="mb-2 text-muted-foreground">
          <Link to="/farmer/active">
            <ArrowLeft className="mr-1.5 h-4 w-4" /> {t("Back to Dashboard", "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್‌ಗೆ ಹಿಂದೆ")}
          </Link>
        </Button>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft">
            <Bell className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{t("Request Status & Alerts", "ವಿನಂತಿ ಸ್ಥಿತಿ ಮತ್ತು ಎಚ್ಚರಿಕೆಗಳು")}</h1>
            <p className="text-sm text-muted-foreground">{t("Stay informed about your bookings and market.", "ನಿಮ್ಮ ಬುಕಿಂಗ್ ಮತ್ತು ಮಾರುಕಟ್ಟೆ ಬಗ್ಗೆ ಮಾಹಿತಿ.")}</p>
          </div>
        </div>

        {/* Alerts */}
        <div className="mt-6 space-y-3">
          {alerts.map((a) => {
            const Icon = iconMap[a.type];
            return (
              <div key={a.id} className="flex items-start gap-4 rounded-xl border border-border bg-card p-4 shadow-[var(--shadow-soft)]">
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${colorMap[a.type]}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{a.title}</h3>
                    <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">{a.time}</span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{a.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Retrieval Timeline */}
        {activeBookings.length > 0 && (
          <div className="mt-8 rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]">
            <h2 className="flex items-center gap-2 font-bold">
              <Package className="h-5 w-5 text-primary" />
              {t("Retrieval Timeline", "ಮರುಪಡೆಯುವ ಸಮಯರೇಖೆ")}
            </h2>
            <div className="mt-4 space-y-3">
              {activeBookings.map((b) => (
                <div key={b.id} className="flex items-center gap-4 rounded-lg bg-muted/40 p-3">
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm">{b.storageName} — {b.crop}</div>
                    <div className="text-xs text-muted-foreground">{b.quantity}</div>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm font-bold ${b.daysRemaining <= 5 ? "text-destructive" : "text-foreground"}`}>
                      {b.daysRemaining} {t("days left", "ದಿನಗಳು ಉಳಿದಿವೆ")}
                    </div>
                    <div className="h-1.5 w-24 rounded-full bg-muted mt-1">
                      <div className={`h-full rounded-full ${b.daysRemaining <= 5 ? "bg-destructive" : "bg-primary"}`} style={{ width: `${Math.max(5, 100 - (b.daysRemaining / b.duration / 30) * 100)}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Market Trends */}
        <div className="mt-8 rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]">
          <h2 className="flex items-center gap-2 font-bold">
            <TrendingUp className="h-5 w-5 text-primary" />
            {t("Market Trends", "ಮಾರುಕಟ್ಟೆ ಪ್ರವೃತ್ತಿಗಳು")}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">{t("Current spot prices to help you decide when to sell.", "ಯಾವಾಗ ಮಾರಾಟ ಮಾಡಬೇಕೆಂದು ನಿರ್ಧರಿಸಲು ಪ್ರಸ್ತುತ ಸ್ಪಾಟ್ ಬೆಲೆಗಳು.")}</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {trends.map((tr) => (
              <div key={tr.crop} className="flex items-center justify-between rounded-lg border border-border bg-muted/30 p-3">
                <div>
                  <div className="font-semibold text-sm">{tr.crop}</div>
                  <div className="text-xs text-muted-foreground">{t("per quintal", "ಪ್ರತಿ ಕ್ವಿಂಟಾಲ್")}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold">{tr.price}</div>
                  <div className={`flex items-center gap-0.5 text-xs font-semibold ${tr.up ? "text-success" : "text-destructive"}`}>
                    {tr.up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    {tr.change}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
