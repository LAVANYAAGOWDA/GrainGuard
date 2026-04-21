import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Boxes,
  TrendingUp,
  IndianRupee,
  Plus,
  ListChecks,
  Phone,
  MapPin,
  BadgeCheck,
  FileText,
  User as UserIcon,
} from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import { useApp } from "@/lib/app-context";

export const Route = createFileRoute("/owner/")({
  head: () => ({ meta: [{ title: "Owner Dashboard — GrainGuard" }] }),
  component: OwnerDashboard,
});

function OwnerDashboard() {
  const { t } = useApp();
  // Frontend-only: empty until backend wired
  const bookings: Array<{
    id: string;
    farmerName: string;
    farmerId: string;
    farmerPhone: string;
    farmerAddress: string;
    quantity: string;
    duration: string;
    status: string;
  }> = [];

  return (
    <PageShell>
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-3xl font-bold">{t("Owner Dashboard", "ಮಾಲೀಕರ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್")}</h1>
            <p className="mt-1 text-muted-foreground">
              {t(
                "Manage your storage, bookings and revenue.",
                "ನಿಮ್ಮ ಸಂಗ್ರಹಣೆ, ಬುಕಿಂಗ್ ಮತ್ತು ಆದಾಯ.",
              )}
            </p>
          </div>
          <div className="flex gap-2">
            <Button asChild variant="outline" className="gap-1.5">
              <Link to="/owner/bookings">
                <ListChecks className="h-4 w-4" />
                {t("All Bookings", "ಎಲ್ಲ ಬುಕಿಂಗ್")}
              </Link>
            </Button>
            <Button asChild className="gap-1.5">
              <Link to="/owner/add">
                <Plus className="h-4 w-4" />
                {t("Add Storage", "ಸಂಗ್ರಹಣೆ ಸೇರಿಸಿ")}
              </Link>
            </Button>
          </div>
        </div>

        {/* Live capacity manager */}
        <div className="mt-6 rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">
              {t("Live Capacity Manager", "ಲೈವ್ ಸಾಮರ್ಥ್ಯ ನಿರ್ವಾಹಕ")}
            </h2>
            <span className="text-xs text-muted-foreground">
              {t("Auto-deducts from active bookings", "ಸಕ್ರಿಯ ಬುಕಿಂಗ್‌ಗಳಿಂದ ಸ್ವಯಂ-ಕಳೆಯುತ್ತದೆ")}
            </span>
          </div>
          <div className="mt-4">
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{t("Total occupied", "ಒಟ್ಟು ಆಕ್ರಮಿತ")}</span>
              <span className="font-semibold">0 / — kg</span>
            </div>
            <div className="h-3 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary transition-all"
                style={{ width: "0%" }}
              />
            </div>
          </div>
          <div className="mt-3 text-center text-sm text-muted-foreground">
            {t("Add a storage facility to get started.", "ಪ್ರಾರಂಭಿಸಲು ಸಂಗ್ರಹಣಾ ಸೌಲಭ್ಯ ಸೇರಿಸಿ.")}
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <StatCard
            icon={Boxes}
            label={t("Total Capacity", "ಒಟ್ಟು ಸಾಮರ್ಥ್ಯ")}
            value="—"
            hint={t("Across all facilities", "ಎಲ್ಲಾ ಸೌಲಭ್ಯಗಳು")}
          />
          <StatCard
            icon={TrendingUp}
            label={t("Used Capacity", "ಬಳಸಿದ")}
            value="0%"
            hint={t("Awaiting bookings", "ಬುಕಿಂಗ್‌ಗಳಿಗಾಗಿ ಕಾಯುತ್ತಿದೆ")}
          />
          <StatCard
            icon={IndianRupee}
            label={t("Earnings", "ಗಳಿಕೆ")}
            value="₹0"
            hint={t("This month", "ಈ ತಿಂಗಳು")}
          />
        </div>

        {/* Bookings & Revenue */}
        <div className="mt-6 rounded-xl border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">{t("Bookings & Revenue", "ಬುಕಿಂಗ್ ಮತ್ತು ಆದಾಯ")}</h2>
            <Button asChild variant="ghost" size="sm" className="gap-1">
              <Link to="/owner/bookings">{t("View all", "ಎಲ್ಲ ನೋಡಿ")}</Link>
            </Button>
          </div>

          {bookings.length === 0 ? (
            <div className="mt-4 flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-muted/30 py-10 text-center">
              <ListChecks className="h-10 w-10 text-muted-foreground" />
              <h3 className="mt-3 text-sm font-semibold">
                {t("No bookings yet", "ಇನ್ನೂ ಯಾವುದೇ ಬುಕಿಂಗ್ ಇಲ್ಲ")}
              </h3>
              <p className="mt-1 max-w-xs text-xs text-muted-foreground">
                {t(
                  "Farmer bookings will appear here with full contact details.",
                  "ರೈತರ ಬುಕಿಂಗ್ ಇಲ್ಲಿ ಸಂಪರ್ಕ ವಿವರಗಳೊಂದಿಗೆ ಕಾಣಿಸುತ್ತದೆ.",
                )}
              </p>
            </div>
          ) : (
            <div className="mt-4 grid gap-3">
              {bookings.map((b) => (
                <FarmerBookingCard key={b.id} {...b} />
              ))}
            </div>
          )}
        </div>

        {/* Earnings graph placeholder */}
        <div className="mt-6 rounded-xl border border-border bg-card p-6">
          <h2 className="font-semibold">{t("Earnings overview", "ಗಳಿಕೆ ಅವಲೋಕನ")}</h2>
          <div className="mt-4 grid grid-cols-7 items-end gap-2 h-40">
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-1.5">
                <div
                  className="w-full rounded-t bg-primary-soft"
                  style={{ height: `${10 + (i % 3) * 8}%` }}
                />
                <span className="text-xs text-muted-foreground">
                  {["M", "T", "W", "T", "F", "S", "S"][i]}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            {t("No earnings data yet.", "ಇನ್ನೂ ಗಳಿಕೆ ಡೇಟಾ ಇಲ್ಲ.")}
          </p>
        </div>

        {/* Invoices */}
        <div className="mt-6 rounded-xl border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-primary" />
              <h2 className="font-semibold">
                {t("Invoices & Agreements", "ಸರಕುಪಟ್ಟಿ ಮತ್ತು ಒಪ್ಪಂದಗಳು")}
              </h2>
            </div>
            <Button asChild variant="outline" size="sm">
              <Link to="/orders">{t("Open", "ತೆರೆ")}</Link>
            </Button>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            {t(
              "Download all signed agreements and tax invoices.",
              "ಎಲ್ಲ ಸಹಿ ಮಾಡಿದ ಒಪ್ಪಂದಗಳು ಮತ್ತು ತೆರಿಗೆ ಸರಕುಪಟ್ಟಿಗಳನ್ನು ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ.",
            )}
          </p>
        </div>
      </section>
    </PageShell>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  hint,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-soft)]">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">{label}</span>
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-soft">
          <Icon className="h-4 w-4 text-primary" />
        </div>
      </div>
      <div className="mt-3 text-3xl font-bold">{value}</div>
      <div className="mt-1 text-xs text-muted-foreground">{hint}</div>
    </div>
  );
}

function FarmerBookingCard(b: {
  farmerName: string;
  farmerId: string;
  farmerPhone: string;
  farmerAddress: string;
  quantity: string;
  duration: string;
  status: string;
}) {
  return (
    <div className="rounded-lg border border-border bg-muted/30 p-4">
      <div className="flex items-start gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <UserIcon className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-semibold">{b.farmerName}</span>
            <span className="inline-flex items-center gap-0.5 rounded-full bg-success/15 px-2 py-0.5 text-xs font-semibold text-success">
              <BadgeCheck className="h-3 w-3" />
              {b.farmerId}
            </span>
          </div>
          <div className="mt-1 space-y-0.5 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Phone className="h-3 w-3" /> {b.farmerPhone}
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="h-3 w-3" /> {b.farmerAddress}
            </div>
          </div>
          <div className="mt-2 flex flex-wrap gap-2 text-xs">
            <span className="rounded bg-background px-2 py-0.5">{b.quantity}</span>
            <span className="rounded bg-background px-2 py-0.5">{b.duration}</span>
            <span className="rounded bg-success/15 px-2 py-0.5 text-success">{b.status}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
