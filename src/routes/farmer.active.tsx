import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Wheat,
  MapPin,
  Phone,
  Calendar,
  PackageCheck,
  Plus,
  CheckCircle2,
  Cloud,
  Thermometer,
  Droplets,
  Receipt,
  Download,
  TrendingUp,
} from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import { useApp } from "@/lib/app-context";

export const Route = createFileRoute("/farmer/active")({
  head: () => ({ meta: [{ title: "Active Storage — GrainGuard" }] }),
  component: ActiveStorage,
});

function ActiveStorage() {
  const { t, activeBooking, setActiveBooking } = useApp();
  const [retrieved, setRetrieved] = useState(false);

  if (!activeBooking) {
    return (
      <PageShell>
        <section className="mx-auto max-w-md px-4 py-20 text-center sm:px-6">
          <PackageCheck className="mx-auto h-14 w-14 text-muted-foreground" />
          <h2 className="mt-4 text-xl font-semibold">
            {t("No active storage", "ಯಾವುದೇ ಸಕ್ರಿಯ ಸಂಗ್ರಹಣೆ ಇಲ್ಲ")}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {t("Book a storage to get started.", "ಪ್ರಾರಂಭಿಸಲು ಸಂಗ್ರಹಣೆಯನ್ನು ಬುಕ್ ಮಾಡಿ.")}
          </p>
          <Button asChild size="lg" className="mt-6 gap-2">
            <Link to="/farmer">
              <Plus className="h-4 w-4" />
              {t("Find Storage", "ಸಂಗ್ರಹಣೆ ಹುಡುಕಿ")}
            </Link>
          </Button>
        </section>
      </PageShell>
    );
  }

  if (retrieved) {
    return (
      <PageShell>
        <section className="mx-auto max-w-md px-4 py-16 text-center sm:px-6">
          <div className="rounded-2xl border border-border bg-card p-8 shadow-[var(--shadow-card)]">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success/15">
              <CheckCircle2 className="h-9 w-9 text-success" />
            </div>
            <h1 className="mt-4 text-2xl font-bold">
              {t("Retrieval Requested", "ಮರುಪಡೆಯುವಿಕೆ ವಿನಂತಿಸಲಾಗಿದೆ")}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {t(
                "The storage owner has been notified. Escrow will be released on completion.",
                "ಸಂಗ್ರಹಣಾ ಮಾಲೀಕರಿಗೆ ತಿಳಿಸಲಾಗಿದೆ. ಪೂರ್ಣಗೊಂಡ ನಂತರ ಎಸ್ಕ್ರೋ ಬಿಡುಗಡೆಯಾಗುತ್ತದೆ.",
              )}
            </p>
            <Button
              size="lg"
              className="mt-6 w-full"
              onClick={() => {
                setActiveBooking(null);
                setRetrieved(false);
              }}
            >
              {t("Done", "ಮುಗಿದಿದೆ")}
            </Button>
          </div>
        </section>
      </PageShell>
    );
  }

  const totalDays = activeBooking.duration * 30;
  const elapsed = totalDays - activeBooking.daysRemaining;
  const pct = Math.min(100, Math.round((elapsed / totalDays) * 100));

  // Inventory ledger entries (frontend placeholder — to be wired to backend)
  const ledger = [
    {
      id: "tx-001",
      date: new Date().toLocaleDateString(),
      type: t("Storage started", "ಸಂಗ್ರಹಣೆ ಪ್ರಾರಂಭ"),
      amount: `+${activeBooking.quantity}`,
      status: "completed",
    },
  ];

  return (
    <PageShell>
      <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <h1 className="text-3xl font-bold">{t("My Active Storage", "ನನ್ನ ಸಕ್ರಿಯ ಸಂಗ್ರಹಣೆ")}</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {t(
            "Live monitoring and ledger of your stored grain.",
            "ನಿಮ್ಮ ಧಾನ್ಯದ ನೈಜ ಮೇಲ್ವಿಚಾರಣೆ ಮತ್ತು ಲೆಡ್ಜರ್.",
          )}
        </p>

        <div className="mt-6 rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-bold">{activeBooking.storageName}</h2>
              <div className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin className="h-3.5 w-3.5" />
                {activeBooking.location}
              </div>
            </div>
            <span className="rounded-full bg-success/15 px-3 py-1 text-xs font-medium text-success">
              {t("Active", "ಸಕ್ರಿಯ")}
            </span>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-4">
            <div className="rounded-lg bg-muted p-4">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Wheat className="h-3.5 w-3.5" /> {t("Crop", "ಬೆಳೆ")}
              </div>
              <div className="mt-1 text-lg font-semibold capitalize">{activeBooking.crop}</div>
            </div>
            <div className="rounded-lg bg-muted p-4">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <PackageCheck className="h-3.5 w-3.5" /> {t("Quantity", "ಪ್ರಮಾಣ")}
              </div>
              <div className="mt-1 text-lg font-semibold">{activeBooking.quantity}</div>
            </div>
          </div>

          {/* Progress */}
          <div className="mt-6">
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="flex items-center gap-1.5 font-medium">
                <Calendar className="h-4 w-4 text-primary" />
                {t("Storage progress", "ಸಂಗ್ರಹಣೆ ಪ್ರಗತಿ")}
              </span>
              <span className="font-semibold text-foreground">
                {activeBooking.daysRemaining} {t("days left", "ದಿನಗಳು ಉಳಿದಿವೆ")}
              </span>
            </div>
            <div className="h-3 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary transition-all"
                style={{ width: `${pct}%` }}
              />
            </div>
            <div className="mt-1.5 flex justify-between text-xs text-muted-foreground">
              <span>{t("Started", "ಪ್ರಾರಂಭ")}</span>
              <span>
                {totalDays} {t("days total", "ಒಟ್ಟು ದಿನಗಳು")}
              </span>
            </div>
          </div>

          <div className="mt-6 grid gap-2 sm:grid-cols-3">
            <Button variant="outline" className="gap-1.5">
              <Calendar className="h-4 w-4" />
              {t("Extend Storage", "ವಿಸ್ತರಿಸಿ")}
            </Button>
            <Button className="gap-1.5" onClick={() => setRetrieved(true)}>
              <PackageCheck className="h-4 w-4" />
              {t("Request Retrieval", "ಮರುಪಡೆಯಲು ವಿನಂತಿಸಿ")}
            </Button>
            <Button asChild variant="outline" className="gap-1.5">
              <a href="tel:+910000000000">
                <Phone className="h-4 w-4" />
                {t("Contact Owner", "ಮಾಲೀಕರನ್ನು ಸಂಪರ್ಕಿಸಿ")}
              </a>
            </Button>
          </div>
        </div>

        {/* Weather + alerts */}
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center gap-2">
              <Cloud className="h-4 w-4 text-primary" />
              <h3 className="font-semibold">{t("Storage Climate", "ಸಂಗ್ರಹ ವಾತಾವರಣ")}</h3>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-3 text-center">
              <div>
                <Thermometer className="mx-auto h-4 w-4 text-muted-foreground" />
                <div className="mt-1 text-lg font-bold">22°C</div>
                <div className="text-xs text-muted-foreground">{t("Temp", "ತಾಪಮಾನ")}</div>
              </div>
              <div>
                <Droplets className="mx-auto h-4 w-4 text-muted-foreground" />
                <div className="mt-1 text-lg font-bold">52%</div>
                <div className="text-xs text-muted-foreground">{t("Humidity", "ಆರ್ದ್ರತೆ")}</div>
              </div>
              <div>
                <TrendingUp className="mx-auto h-4 w-4 text-success" />
                <div className="mt-1 text-lg font-bold text-success">{t("Good", "ಒಳ್ಳೆಯದು")}</div>
                <div className="text-xs text-muted-foreground">{t("Status", "ಸ್ಥಿತಿ")}</div>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center gap-2">
              <Receipt className="h-4 w-4 text-primary" />
              <h3 className="font-semibold">{t("Inventory Ledger", "ಇನ್ವೆಂಟರಿ ಲೆಡ್ಜರ್")}</h3>
            </div>
            <div className="mt-3 space-y-2">
              {ledger.map((tx) => (
                <div
                  key={tx.id}
                  className="flex items-center justify-between gap-2 rounded-lg border border-border bg-muted/40 p-3 text-sm"
                >
                  <div>
                    <div className="font-medium">{tx.type}</div>
                    <div className="text-xs text-muted-foreground">{tx.date}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono font-semibold">{tx.amount}</div>
                    <button className="mt-0.5 inline-flex items-center gap-1 text-xs text-primary hover:underline">
                      <Download className="h-3 w-3" /> {t("Receipt", "ರಶೀದಿ")}
                    </button>
                  </div>
                </div>
              ))}
              <Button asChild variant="outline" size="sm" className="mt-2 w-full">
                <Link to="/orders">{t("View all invoices", "ಎಲ್ಲ ಸರಕುಪಟ್ಟಿಗಳನ್ನು ನೋಡಿ")}</Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <Button asChild variant="ghost">
            <Link to="/farmer">{t("Back to dashboard", "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್‌ಗೆ ಹಿಂದಿರುಗಿ")}</Link>
          </Button>
        </div>
      </section>
    </PageShell>
  );
}
