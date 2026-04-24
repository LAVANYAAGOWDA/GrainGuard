import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Boxes,
  TrendingUp,
  Plus,
  ListChecks,
  Phone,
  MapPin,
  BadgeCheck,
  User as UserIcon,
  ShieldCheck,
  FileText,
  CheckCircle2,
  Clock,
  Warehouse,
  Wheat,
} from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useApp } from "@/lib/app-context";
import { useState } from "react";

export const Route = createFileRoute("/owner/")({
  head: () => ({ meta: [{ title: "Owner Dashboard — GrainGuard" }] }),
  component: OwnerDashboard,
});

function OwnerDashboard() {
  const { t, ownerStorages } = useApp();
  const aggregateCapacity = ownerStorages.reduce((s, f) => s + f.capacity, 0) || 1000;
  const [totalCapacity] = useState(aggregateCapacity);
  const [occupied, setOccupied] = useState(0);
  const [bookings, setBookings] = useState<Array<{
    id: string;
    farmerName: string;
    farmerId: string;
    farmerPhone: string;
    farmerAddress: string;
    quantity: string;
    duration: string;
    status: string;
    isKycVerified: boolean;
  }>>([
    {
      id: "b1",
      farmerName: "Ramesh Gowda",
      farmerId: "FA-RG-883",
      farmerPhone: "+91 98765 43210",
      farmerAddress: "Mandya, Karnataka",
      quantity: "5,000 kg Rice",
      duration: "3 months",
      status: "Active",
      isKycVerified: true,
    },
    {
      id: "b2",
      farmerName: "Siddappa",
      farmerId: "FA-SD-112",
      farmerPhone: "+91 91234 56789",
      farmerAddress: "Mysuru, Karnataka",
      quantity: "2,000 kg Wheat",
      duration: "6 months",
      status: "Pending",
      isKycVerified: false,
    },
    {
      id: "b3",
      farmerName: "Lakshmi N",
      farmerId: "FA-LN-402",
      farmerPhone: "+91 99887 76655",
      farmerAddress: "Tumakuru, Karnataka",
      quantity: "3,000 kg Ragi",
      duration: "1 month",
      status: "Pending",
      isKycVerified: true,
    }
  ]);

  const [agreementOpen, setAgreementOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<string | null>(null);

  const handleAccept = (id: string) => {
    setSelectedBooking(id);
    setAgreementOpen(true);
  };

  const confirmAccept = () => {
    setBookings((prev) =>
      prev.map((b) => (b.id === selectedBooking ? { ...b, status: "Active" } : b))
    );
    setAgreementOpen(false);
  };

  const handleDecline = (id: string) => {
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status: "Declined" } : b)));
  };

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
                {ownerStorages.length > 0
                  ? t("+ Add Another Storage", "+ ಮತ್ತೊಂದು ಸಂಗ್ರಹಣೆ")
                  : t("Add Storage", "ಸಂಗ್ರಹಣೆ ಸೇರಿಸಿ")}
              </Link>
            </Button>
          </div>
        </div>

        {/* Interactive Capacity Manager */}
        <div className="mt-6 rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">
              {t("Live Capacity Manager", "ಲೈವ್ ಸಾಮರ್ಥ್ಯ ನಿರ್ವಾಹಕ")}
            </h2>
            <span className="text-xs text-muted-foreground">
              {t("Drag slider or use +/- to adjust", "ಸ್ಲೈಡರ್ ಎಳೆಯಿರಿ ಅಥವಾ +/- ಬಳಸಿ")}
            </span>
          </div>
          <div className="mt-4">
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{t("Total occupied", "ಒಟ್ಟು ಆಕ್ರಮಿತ")}</span>
              <span className="font-semibold">{occupied} / {totalCapacity} kg</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setOccupied((v) => Math.max(0, v - 50))}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border bg-muted text-sm font-bold transition-colors hover:bg-primary-soft"
              >−</button>
              <input
                type="range"
                min={0}
                max={totalCapacity}
                step={10}
                value={occupied}
                onChange={(e) => setOccupied(Number(e.target.value))}
                className="w-full accent-primary"
              />
              <button
                type="button"
                onClick={() => setOccupied((v) => Math.min(totalCapacity, v + 50))}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border bg-muted text-sm font-bold transition-colors hover:bg-primary-soft"
              >+</button>
            </div>
            <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-muted">
              <div
                className={cn("h-full rounded-full transition-all", occupied / totalCapacity > 0.85 ? "bg-destructive" : occupied / totalCapacity > 0.6 ? "bg-warning" : "bg-primary")}
                style={{ width: `${totalCapacity > 0 ? (occupied / totalCapacity) * 100 : 0}%` }}
              />
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <StatCard
            icon={Boxes}
            label={t("Total Capacity", "ಒಟ್ಟು ಸಾಮರ್ಥ್ಯ")}
            value={`${totalCapacity.toLocaleString()} kg`}
            hint={t("Across all facilities", "ಎಲ್ಲಾ ಸೌಲಭ್ಯಗಳು")}
          />
          <StatCard
            icon={TrendingUp}
            label={t("Used Capacity", "ಬಳಸಿದ")}
            value={`${totalCapacity > 0 ? Math.round((occupied / totalCapacity) * 100) : 0}%`}
            hint={occupied === 0 ? t("Awaiting bookings", "ಬುಕಿಂಗ್‌ಗಳಿಗಾಗಿ ಕಾಯುತ್ತಿದೆ") : `${occupied.toLocaleString()} kg ${t("used", "ಬಳಸಲಾಗಿದೆ")}`}
          />
        </div>

        {/* Active Storage Facility Cards */}
        {ownerStorages.length > 0 && (
          <div className="mt-6">
            <h2 className="mb-3 flex items-center gap-2 text-lg font-bold">
              <Warehouse className="h-5 w-5 text-primary" />
              {t("My Storage Facilities", "ನನ್ನ ಸಂಗ್ರಹಣಾ ಸೌಲಭ್ಯಗಳು")}
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {ownerStorages.map((s) => (
                <div key={s.id} className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-soft)]">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-bold">{s.name}</h3>
                      <div className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" /> {s.address}
                      </div>
                    </div>
                    <span className="rounded-full bg-primary-soft px-2.5 py-0.5 text-[10px] font-bold capitalize text-primary">{s.type}</span>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded-lg bg-muted/50 p-3">
                      <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{t("Capacity", "ಸಾಮರ್ಥ್ಯ")}</div>
                      <div className="mt-1 text-sm font-bold">{s.capacity.toLocaleString()} kg</div>
                      <div className="text-[10px] text-muted-foreground">{(s.capacity / 100).toFixed(1)} quintal · {(s.capacity / 1000).toFixed(2)} ton</div>
                    </div>
                    <div className="rounded-lg bg-muted/50 p-3">
                      <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{t("Price", "ಬೆಲೆ")}</div>
                      <div className="mt-1 text-sm font-bold">₹{s.pricePerUnit}</div>
                      <div className="text-[10px] text-muted-foreground">{t("per kg/month", "ಪ್ರತಿ ಕೆಜಿ/ತಿಂಗಳು")}</div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">{t("Accepted Crops", "ಸ್ವೀಕರಿಸುವ ಬೆಳೆಗಳು")}</div>
                    <div className="flex flex-wrap gap-1.5">
                      {s.crops.map((c) => (
                        <span key={c} className="inline-flex items-center gap-1 rounded-full border border-border bg-muted/40 px-2.5 py-0.5 text-xs font-medium capitalize">
                          <Wheat className="h-3 w-3 text-primary" /> {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

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
              {bookings.filter(b => b.status !== "Declined").map((b) => (
                <FarmerBookingCard 
                  key={b.id} 
                  {...b} 
                  onAccept={() => handleAccept(b.id)}
                  onDecline={() => handleDecline(b.id)}
                />
              ))}
            </div>
          )}
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

      <Dialog open={agreementOpen} onOpenChange={setAgreementOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{t("Agreement Logic & Rules", "ಒಪ್ಪಂದದ ನಿಯಮಗಳು")}</DialogTitle>
            <DialogDescription>
              {t("Please agree to the following terms before accepting the booking.", "ಬುಕಿಂಗ್ ಒಪ್ಪಿಕೊಳ್ಳುವ ಮುನ್ನ ಈ ನಿಯಮಗಳನ್ನು ಒಪ್ಪಿ.")}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-3 text-sm">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 mt-0.5 text-primary shrink-0" />
              <p>{t("Payment is released only after Farmer Check-in and Check-out.", "ರೈತರು ಚೆಕ್-ಇನ್ ಮತ್ತು ಚೆಕ್-ಔಟ್ ಮಾಡಿದ ನಂತರವೇ ಪಾವತಿ ಬಿಡುಗಡೆಯಾಗುತ್ತದೆ.")}</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 mt-0.5 text-primary shrink-0" />
              <p>{t("All approvals must happen via the website.", "ಎಲ್ಲಾ ಅನುಮೋದನೆಗಳು ವೆಬ್‌ಸೈಟ್ ಮೂಲಕವೇ ಆಗಬೇಕು.")}</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 mt-0.5 text-primary shrink-0" />
              <p>{t("Owner can sell goods via broker if farmer does not retrieve within the agreed time.", "ರೈತರು ನಿಗದಿತ ಸಮಯದಲ್ಲಿ ಹಿಂದಿರುಗದಿದ್ದರೆ ಮಾಲೀಕರು ಸರಕುಗಳನ್ನು ಬ್ರೋಕರ್ ಮೂಲಕ ಮಾರಾಟ ಮಾಡಬಹುದು.")}</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 mt-0.5 text-primary shrink-0" />
              <p>{t("You have a 24-hour accept/decline window for requests.", "ವಿನಂತಿಗಳಿಗಾಗಿ ನೀವು 24 ಗಂಟೆಗಳ ಒಪ್ಪಿಗೆ/ತಿರಸ್ಕಾರ ವಿಂಡೋವನ್ನು ಹೊಂದಿದ್ದೀರಿ.")}</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 mt-0.5 text-primary shrink-0" />
              <p>{t("Automatic WhatsApp notifications will be sent for accepted/declined requests and expired subscriptions.", "ಒಪ್ಪಿದ/ತಿರಸ್ಕರಿಸಿದ ವಿನಂತಿಗಳು ಮತ್ತು ಅವಧಿ ಮೀರಿದ ಚಂದಾದಾರಿಕೆಗಳಿಗಾಗಿ ಸ್ವಯಂಚಾಲಿತ WhatsApp ಅಧಿಸೂಚನೆಗಳನ್ನು ಕಳುಹಿಸಲಾಗುತ್ತದೆ.")}</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAgreementOpen(false)}>{t("Cancel", "ರದ್ದುಗೊಳಿಸಿ")}</Button>
            <Button onClick={confirmAccept}>{t("I Agree & Accept", "ನಾನು ಒಪ್ಪುತ್ತೇನೆ")}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
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
  isKycVerified: boolean;
  onAccept?: () => void;
  onDecline?: () => void;
}) {
  const { t } = useApp();
  return (
    <div className="rounded-xl border border-border bg-card shadow-[var(--shadow-soft)] overflow-hidden">
      <div className="flex items-center justify-center gap-1.5 bg-success/15 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-success">
        <ShieldCheck className="h-3.5 w-3.5" />
        {t("Payment Locked in Escrow - 100% Secure", "ಪಾವತಿಯನ್ನು ಎಸ್ಕ್ರೋದಲ್ಲಿ ಲಾಕ್ ಮಾಡಲಾಗಿದೆ - 100% ಸುರಕ್ಷಿತ")}
      </div>
      <div className="p-4 flex items-start gap-3">
        <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border-2 border-primary/20 bg-primary-soft text-primary">
          <img src={`https://i.pravatar.cc/150?u=${b.farmerId}`} alt="farmer" className="h-full w-full object-cover" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold">{b.farmerName}</span>
            {b.isKycVerified && (
              <span className="inline-flex items-center gap-0.5 rounded-full bg-success/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-success">
                <BadgeCheck className="h-3 w-3" />
                {t("Verified Identity", "ಪರಿಶೀಲಿಸಿದ ಗುರುತು")}
              </span>
            )}
            <span className="ml-auto text-xs text-muted-foreground">{b.farmerId}</span>
          </div>
          <div className="mt-1 space-y-0.5 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Phone className="h-3 w-3" /> {b.farmerPhone}
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="h-3 w-3" /> {b.farmerAddress}
            </div>
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
            <span className="rounded bg-muted px-2 py-0.5 font-medium">{b.quantity}</span>
            <span className="rounded bg-muted px-2 py-0.5 font-medium">{b.duration}</span>
            <span className={cn("rounded px-2 py-0.5 font-semibold", b.status === "Pending" ? "bg-warning/20 text-warning-foreground" : "bg-primary-soft text-primary")}>{b.status}</span>
            
            {b.status === "Pending" && (
              <div className="ml-auto flex items-center gap-3">
                <span className="flex items-center gap-1 text-[10px] font-bold text-destructive">
                  <Clock className="h-3 w-3" /> 23h 45m {t("left", "ಉಳಿದಿದೆ")}
                </span>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="h-7 text-xs" onClick={b.onDecline}>{t("Decline", "ತಿರಸ್ಕರಿಸಿ")}</Button>
                  <Button size="sm" className="h-7 text-xs" onClick={b.onAccept}>{t("Accept", "ಒಪ್ಪಿಕೊಳ್ಳಿ")}</Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
