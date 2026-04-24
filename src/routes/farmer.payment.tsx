import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ShieldCheck,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Loader2,
  CreditCard,
  WifiOff,
  Download,
  Hash,
  Vault,
} from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import { useApp } from "@/lib/app-context";
import { STORAGES } from "./farmer.storage.index";
import { FlowBreadcrumb } from "@/components/Breadcrumb";

interface SearchParams {
  id?: string;
  quantity?: string;
  startDate?: string;
  endDate?: string;
  unit?: string;
  ref?: string;
  crop?: string;
  remainingCrops?: string;
}

export const Route = createFileRoute("/farmer/payment")({
  validateSearch: (s: Record<string, unknown>): SearchParams => ({
    id: typeof s.id === "string" ? s.id : undefined,
    quantity: typeof s.quantity === "string" ? s.quantity : undefined,
    startDate: typeof s.startDate === "string" ? s.startDate : undefined,
    endDate: typeof s.endDate === "string" ? s.endDate : undefined,
    unit: typeof s.unit === "string" ? s.unit : undefined,
    ref: typeof s.ref === "string" ? s.ref : undefined,
    crop: typeof s.crop === "string" ? s.crop : undefined,
    remainingCrops: typeof s.remainingCrops === "string" ? s.remainingCrops : undefined,
  }),
  head: () => ({ meta: [{ title: "Escrow Payment — GrainGuard" }] }),
  component: Payment,
});

type Status = "idle" | "processing" | "success" | "failure" | "offline";

function Payment() {
  const { t, addBooking } = useApp();
  const search = Route.useSearch();
  const navigate = useNavigate();
  const [status, setStatus] = useState<Status>("idle");
  const [online, setOnline] = useState(true);

  useEffect(() => {
    setOnline(typeof navigator === "undefined" ? true : navigator.onLine);
    const up = () => setOnline(true);
    const down = () => setOnline(false);
    window.addEventListener("online", up);
    window.addEventListener("offline", down);
    return () => {
      window.removeEventListener("online", up);
      window.removeEventListener("offline", down);
    };
  }, []);

  const storage = STORAGES.find((s) => s.id === search.id);
  const qty = Number(search.quantity) || 0;
  
  const calculateDays = () => {
    if (!search.startDate || !search.endDate) return 30;
    try {
      const s = new Date(search.startDate);
      const e = new Date(search.endDate);
      if (isNaN(s.getTime()) || isNaN(e.getTime())) return 30;
      return Math.max(1, Math.ceil(Math.abs(e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24)));
    } catch {
      return 30;
    }
  };
  
  const days = calculateDays();
  const durMonths = Math.max(1, Math.round(days / 30));
  const subtotal = storage ? (storage.price || 0) * qty * durMonths : 0;
  const fee = Math.round(subtotal * 0.02);
  const total = subtotal + fee;

  const pay = () => {
    if (!online) {
      setStatus("offline");
      return;
    }
    setStatus("processing");
  };

  const handleSimulatedPayment = (success: boolean) => {
    setStatus("idle");
    if (success && storage) {
      const bookedCrop = search.crop || "rice";
      addBooking({
        storageName: storage.name,
        location: storage.location,
        crop: bookedCrop,
        quantity: `${qty} ${search.unit ?? "kg"}`,
        duration: durMonths,
        daysRemaining: days,
      });
      setStatus("success");
    } else {
      setStatus("failure");
    }
  };

  // Calculate remaining crops for sequential booking
  const bookedCrop = search.crop || "rice";
  const remainingCrops = search.remainingCrops
    ? search.remainingCrops.split(",").filter((c) => c !== bookedCrop)
    : [];

  if (!storage) {
    return (
      <PageShell>
        <div className="mx-auto max-w-md px-4 py-20 text-center">
          <h2 className="text-xl font-semibold">{t("Booking not found", "ಬುಕಿಂಗ್ ಸಿಗಲಿಲ್ಲ")}</h2>
          <Button asChild className="mt-4">
            <Link to="/farmer">{t("Start over", "ಮತ್ತೆ ಪ್ರಾರಂಭಿಸಿ")}</Link>
          </Button>
        </div>
      </PageShell>
    );
  }

  if (status === "success") {
    return (
      <PageShell>
        <section className="mx-auto max-w-md px-4 py-16 text-center sm:px-6">
          <div className="rounded-2xl border border-border bg-card p-8 shadow-[var(--shadow-elevated)]">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success/15">
              <CheckCircle2 className="h-9 w-9 text-success" />
            </div>
            <h1 className="mt-4 text-2xl font-bold">
              {t("Storage Booked", "ಸಂಗ್ರಹಣೆ ಬುಕ್ ಆಗಿದೆ")}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {t(
                "Your payment is held in escrow. Storage is confirmed.",
                "ನಿಮ್ಮ ಪಾವತಿಯನ್ನು ಎಸ್ಕ್ರೋದಲ್ಲಿ ಇಡಲಾಗಿದೆ. ಸಂಗ್ರಹಣೆ ದೃಢೀಕರಿಸಲಾಗಿದೆ.",
              )}
            </p>
            {search.ref && (
              <div className="mx-auto mt-4 inline-flex items-center gap-1.5 rounded-md bg-muted px-3 py-1.5 font-mono text-xs">
                <Hash className="h-3 w-3" /> {search.ref}
              </div>
            )}
            <div className="mt-6 flex flex-col gap-2">
              <Button
                size="lg"
                className="w-full"
                onClick={() => navigate({ to: "/farmer/active" })}
              >
                {t("View My Storage", "ನನ್ನ ಸಂಗ್ರಹಣೆ ನೋಡಿ")}
              </Button>
              {remainingCrops.length > 0 && (
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full gap-2 border-primary text-primary hover:bg-primary-soft"
                  onClick={() =>
                    navigate({
                      to: "/farmer/storage",
                      search: {
                        crop: remainingCrops.join(","),
                        quantity: search.quantity,
                        startDate: search.startDate,
                        endDate: search.endDate,
                        unit: search.unit,
                      },
                    })
                  }
                >
                  {t(`Continue to book ${remainingCrops.length} remaining crop(s)`, `ಉಳಿದ ${remainingCrops.length} ಬೆಳೆ(ಗಳು) ಬುಕ್ ಮಾಡಲು ಮುಂದುವರಿಸಿ`)}
                </Button>
              )}
              <Button asChild variant="outline" size="lg" className="w-full gap-2">
                <Link to="/orders">
                  <Download className="h-4 w-4" />
                  {t("Download Invoice", "ಸರಕುಪಟ್ಟಿ ಡೌನ್‌ಲೋಡ್")}
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </PageShell>
    );
  }

  if (status === "failure") {
    return (
      <PageShell>
        <section className="mx-auto max-w-md px-4 py-16 text-center sm:px-6">
          <div className="rounded-2xl border border-border bg-card p-8 shadow-[var(--shadow-elevated)]">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-destructive/15">
              <XCircle className="h-9 w-9 text-destructive" />
            </div>
            <h1 className="mt-4 text-2xl font-bold">{t("Payment Failed", "ಪಾವತಿ ವಿಫಲವಾಗಿದೆ")}</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {t(
                "Don't worry — your money is safe. Try again with a different UPI app.",
                "ಚಿಂತಿಸಬೇಡಿ — ನಿಮ್ಮ ಹಣ ಸುರಕ್ಷಿತವಾಗಿದೆ. ಬೇರೆ UPI ಆಪ್‌ನೊಂದಿಗೆ ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.",
              )}
            </p>

            <div className="mt-4 rounded-lg border border-primary/30 bg-primary-soft/40 p-3 text-left text-xs">
              <div className="font-semibold">
                {t("Smart Routing Suggestions", "ಸ್ಮಾರ್ಟ್ ರೂಟಿಂಗ್")}
              </div>
              <ul className="mt-1.5 space-y-1 text-muted-foreground">
                <li>
                  • {t("Try PhonePe (high success rate)", "PhonePe ಪ್ರಯತ್ನಿಸಿ (ಹೆಚ್ಚಿನ ಯಶಸ್ಸು)")}
                </li>
                <li>• {t("Switch to Google Pay", "Google Pay ಗೆ ಬದಲಾಯಿಸಿ")}</li>
                <li>• {t("Use Net Banking instead", "ನೆಟ್ ಬ್ಯಾಂಕಿಂಗ್ ಬಳಸಿ")}</li>
              </ul>
            </div>

            <div className="mt-6 flex flex-col gap-2">
              <Button size="lg" className="w-full" onClick={() => setStatus("idle")}>
                {t("Retry Payment", "ಪಾವತಿ ಮರು ಪ್ರಯತ್ನಿಸಿ")}
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full">
                <Link to="/farmer">{t("Cancel", "ರದ್ದುಮಾಡಿ")}</Link>
              </Button>
            </div>
          </div>
        </section>
      </PageShell>
    );
  }

  if (status === "offline") {
    return (
      <PageShell>
        <section className="mx-auto max-w-md px-4 py-16 text-center sm:px-6">
          <div className="rounded-2xl border border-border bg-card p-8 shadow-[var(--shadow-elevated)]">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-warning/15">
              <WifiOff className="h-9 w-9 text-warning-foreground" />
            </div>
            <h1 className="mt-4 text-2xl font-bold">
              {t("Network Dropped", "ನೆಟ್‌ವರ್ಕ್ ಕಡಿತಗೊಂಡಿದೆ")}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {t(
                "Your contract state has been saved. Resume payment when you're back online.",
                "ನಿಮ್ಮ ಒಪ್ಪಂದ ಸ್ಥಿತಿ ಉಳಿಸಲಾಗಿದೆ. ಆನ್‌ಲೈನ್‌ಗೆ ಬಂದಾಗ ಪಾವತಿ ಮುಂದುವರಿಸಿ.",
              )}
            </p>
            <Button size="lg" className="mt-6 w-full" onClick={() => setStatus("idle")}>
              {t("Resume", "ಮುಂದುವರಿಸಿ")}
            </Button>
          </div>
        </section>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <section className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <FlowBreadcrumb
          current={3}
          steps={[
            { label: t("Summary", "ಸಾರಾಂಶ") },
            { label: t("Best Matches", "ಉತ್ತಮ ಹೊಂದಿಕೆಗಳು") },
            { label: t("Payment", "ಪಾವತಿ") },
          ]}
        />
        <Button asChild variant="ghost" className="mb-2 text-muted-foreground">
          <Link
            to="/farmer/contract"
            search={{
              id: storage.id,
              quantity: search.quantity,
              startDate: search.startDate,
              endDate: search.endDate,
              unit: search.unit,
            }}
          >
            <ArrowLeft className="mr-1.5 h-4 w-4" /> {t("Back", "ಹಿಂದೆ")}
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">{t("Escrow Payment", "ಎಸ್ಕ್ರೋ ಪಾವತಿ")}</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {t("Secured by GrainGuard Escrow Protocol", "GrainGuard ಎಸ್ಕ್ರೋ ಪ್ರೋಟೋಕಾಲ್ ಮೂಲಕ ಸುರಕ್ಷಿತ")}
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-[1fr_320px]">
          <div className="rounded-xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
            <h2 className="text-lg font-semibold">{t("Booking Summary", "ಬುಕಿಂಗ್ ಸಾರಾಂಶ")}</h2>
            <div className="mt-4 space-y-2.5 text-sm">
              <Row label={t("Storage", "ಸಂಗ್ರಹಣೆ")} value={storage.name} />
              <Row label={t("Location", "ಸ್ಥಳ")} value={storage.location} />
              <Row label={t("Quantity", "ಪ್ರಮಾಣ")} value={`${qty} ${search.unit ?? "kg"}`} />
              <Row label={t("Duration", "ಅವಧಿ")} value={`${days} ${t("days", "ದಿನಗಳು")}`} />
              {search.ref && <Row label={t("Reference", "ಉಲ್ಲೇಖ")} value={search.ref} />}
              <div className="my-2 border-t border-border" />
              <Row label={t("Subtotal", "ಉಪಮೊತ್ತ")} value={`₹${subtotal.toLocaleString()}`} />
              <Row label={t("Platform fee", "ವೇದಿಕೆ ಶುಲ್ಕ")} value={`₹${fee.toLocaleString()}`} />
              <div className="my-2 border-t border-border" />
              <Row label={t("Total", "ಒಟ್ಟು")} value={`₹${total.toLocaleString()}`} bold />
            </div>

            <Button
              size="lg"
              className="mt-5 h-12 w-full gap-2 text-base bg-success hover:bg-success/90"
              onClick={() => handleSimulatedPayment(true)}
              disabled={status === "processing"}
            >
              {status === "processing" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {t("Transferring to Escrow...", "ಎಸ್ಕ್ರೋಗೆ ವರ್ಗಾಯಿಸಲಾಗುತ್ತಿದೆ...")}
                </>
              ) : (
                <>
                  <ShieldCheck className="h-4 w-4" />
                  {t("Confirm Escrow Transfer", "ಎಸ್ಕ್ರೋ ವರ್ಗಾವಣೆಯನ್ನು ಖಚಿತಪಡಿಸಿ")}
                </>
              )}
            </Button>
          </div>

          {/* Vault graphic */}
          <aside className="rounded-xl border border-primary/30 bg-gradient-to-br from-primary-soft to-secondary/40 p-6 text-center">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-card shadow-[var(--shadow-elevated)]">
              <Vault
                className={`h-12 w-12 text-primary ${status === "processing" ? "animate-pulse" : ""}`}
              />
            </div>
            <h3 className="mt-4 font-bold">{t("Escrow Guarantee", "ಎಸ್ಕ್ರೋ ಭರವಸೆ")}</h3>
            <p className="mt-2 text-xs text-muted-foreground">
              {t(
                "Your money goes into a secure vault. It's released to the owner only after grain is safely stored.",
                "ನಿಮ್ಮ ಹಣ ಸುರಕ್ಷಿತ ವಾಲ್ಟ್‌ಗೆ ಹೋಗುತ್ತದೆ. ಧಾನ್ಯ ಸುರಕ್ಷಿತವಾಗಿ ಸಂಗ್ರಹವಾದ ನಂತರ ಮಾತ್ರ ಬಿಡುಗಡೆ.",
              )}
            </p>
            <div className="mt-4 flex items-center justify-center gap-1.5 text-xs font-semibold text-success">
              <ShieldCheck className="h-3.5 w-3.5" />
              {t("100% protected", "100% ರಕ್ಷಿತ")}
            </div>
            {!online && (
              <div className="mt-3 rounded-md bg-warning/20 p-2 text-xs text-warning-foreground">
                <WifiOff className="mr-1 inline h-3 w-3" />
                {t("Offline mode", "ಆಫ್‌ಲೈನ್")}
              </div>
            )}
          </aside>
        </div>
      </section>


    </PageShell>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className={bold ? "text-base font-bold" : "font-medium"}>{value}</span>
    </div>
  );
}
