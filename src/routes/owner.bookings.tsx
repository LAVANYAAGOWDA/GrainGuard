import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Inbox, Phone, MapPin, BadgeCheck, User as UserIcon } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import { useApp } from "@/lib/app-context";

export const Route = createFileRoute("/owner/bookings")({
  head: () => ({ meta: [{ title: "Bookings — GrainGuard" }] }),
  component: Bookings,
});

function Bookings() {
  const { t } = useApp();
  // Frontend-only — wire to backend later
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
      <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <Button asChild variant="ghost" className="mb-2 text-muted-foreground">
          <Link to="/owner">
            <ArrowLeft className="mr-1.5 h-4 w-4" /> {t("Back", "ಹಿಂದೆ")}
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">{t("All Bookings", "ಎಲ್ಲ ಬುಕಿಂಗ್")}</h1>
        <p className="mt-1 text-muted-foreground">
          {t(
            "Every farmer who booked your storage.",
            "ನಿಮ್ಮ ಸಂಗ್ರಹಣೆಯನ್ನು ಬುಕ್ ಮಾಡಿದ ಪ್ರತಿಯೊಬ್ಬ ರೈತ.",
          )}
        </p>

        {bookings.length === 0 ? (
          <div className="mt-8 flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card py-20 text-center">
            <Inbox className="h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-semibold">
              {t("No bookings yet", "ಇನ್ನೂ ಬುಕಿಂಗ್ ಇಲ್ಲ")}
            </h3>
            <p className="mt-1 max-w-sm text-sm text-muted-foreground">
              {t(
                "Bookings will appear with farmer photo, ID, contact, and address.",
                "ಬುಕಿಂಗ್ ರೈತರ ಫೋಟೋ, ID, ಸಂಪರ್ಕ ಮತ್ತು ವಿಳಾಸದೊಂದಿಗೆ ಕಾಣಿಸುತ್ತದೆ.",
              )}
            </p>
          </div>
        ) : (
          <div className="mt-6 grid gap-3">
            {bookings.map((b) => (
              <div
                key={b.id}
                className="rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-soft)]"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <UserIcon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-semibold">{b.farmerName}</span>
                      <span className="inline-flex items-center gap-0.5 rounded-full bg-success/15 px-2 py-0.5 text-xs font-semibold text-success">
                        <BadgeCheck className="h-3 w-3" /> {b.farmerId}
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
                    <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                      <span className="rounded bg-muted px-2 py-0.5">{b.quantity}</span>
                      <span className="rounded bg-muted px-2 py-0.5">{b.duration}</span>
                      <span className="rounded bg-success/15 px-2 py-0.5 text-success">
                        {b.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </PageShell>
  );
}
