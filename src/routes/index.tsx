import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ShieldCheck,
  Warehouse,
  CalendarCheck,
  ArrowRight,
  Sprout,
  Users,
  Lock,
} from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import { useApp } from "@/lib/app-context";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "GrainGuard — Smart Grain Storage Platform" },
      {
        name: "description",
        content:
          "Find trusted storage for your grains with secure escrow payments. Built for farmers.",
      },
      { property: "og:title", content: "GrainGuard — Smart Grain Storage" },
      {
        property: "og:description",
        content: "Connect with trusted storage owners. Pay safely. Store smartly.",
      },
    ],
  }),
  component: Landing,
});

function Landing() {
  const { t } = useApp();
  return (
    <PageShell>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 grain-pattern opacity-40" aria-hidden />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-24 md:items-center">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-foreground">
              <Sprout className="h-3.5 w-3.5" />
              {t("Trusted by farmers", "ರೈತರಿಂದ ವಿಶ್ವಾಸಾರ್ಹ")}
            </span>
            <h1 className="mt-4 text-4xl font-bold leading-tight text-foreground md:text-5xl">
              {t("Smart Grain Storage Platform", "ಸ್ಮಾರ್ಟ್ ಧಾನ್ಯ ಸಂಗ್ರಹಣಾ ವೇದಿಕೆ")}
            </h1>
            <p className="mt-4 max-w-lg text-base text-muted-foreground md:text-lg">
              {t(
                "GrainGuard helps farmers find safe, verified storage facilities and protects every payment with secure escrow.",
                "GrainGuard ರೈತರಿಗೆ ಸುರಕ್ಷಿತ ಸಂಗ್ರಹಣಾ ಸೌಲಭ್ಯಗಳನ್ನು ಹುಡುಕಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ ಮತ್ತು ಪ್ರತಿ ಪಾವತಿಯನ್ನು ಸುರಕ್ಷಿತಗೊಳಿಸುತ್ತದೆ.",
              )}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild size="lg" className="gap-2">
                <Link to="/login">
                  {t("Get Started", "ಪ್ರಾರಂಭಿಸಿ")}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/about">{t("Learn More", "ಇನ್ನಷ್ಟು ತಿಳಿಯಿರಿ")}</Link>
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-elevated)]">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Warehouse, label: t("Verified Storage", "ಪರಿಶೀಲಿತ ಸಂಗ್ರಹಣೆ") },
                  { icon: ShieldCheck, label: t("Secure Escrow", "ಸುರಕ್ಷಿತ ಎಸ್ಕ್ರೋ") },
                  { icon: CalendarCheck, label: t("Easy Booking", "ಸುಲಭ ಬುಕಿಂಗ್") },
                  { icon: Users, label: t("Trusted Network", "ವಿಶ್ವಾಸಾರ್ಹ ಜಾಲ") },
                ].map((f) => (
                  <div
                    key={f.label}
                    className="flex flex-col items-start gap-2 rounded-lg bg-muted p-4"
                  >
                    <f.icon className="h-6 w-6 text-primary" />
                    <span className="text-sm font-medium">{f.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold">{t("How it works", "ಇದು ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ")}</h2>
          <p className="mt-2 text-muted-foreground">
            {t("Three simple steps to safe storage", "ಸುರಕ್ಷಿತ ಸಂಗ್ರಹಣೆಗೆ ಮೂರು ಸರಳ ಹಂತಗಳು")}
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              n: "1",
              title: t("Choose Your Crop", "ನಿಮ್ಮ ಬೆಳೆ ಆಯ್ಕೆಮಾಡಿ"),
              desc: t(
                "Select crop type, quantity and storage duration.",
                "ಬೆಳೆ ಪ್ರಕಾರ, ಪ್ರಮಾಣ ಮತ್ತು ಅವಧಿಯನ್ನು ಆಯ್ಕೆಮಾಡಿ.",
              ),
            },
            {
              n: "2",
              title: t("Find Storage", "ಸಂಗ್ರಹಣೆ ಹುಡುಕಿ"),
              desc: t(
                "Browse verified storage facilities near you.",
                "ನಿಮ್ಮ ಬಳಿಯ ಪರಿಶೀಲಿತ ಸಂಗ್ರಹಣಾ ಸೌಲಭ್ಯಗಳನ್ನು ನೋಡಿ.",
              ),
            },
            {
              n: "3",
              title: t("Pay Securely", "ಸುರಕ್ಷಿತವಾಗಿ ಪಾವತಿಸಿ"),
              desc: t(
                "Money is held in escrow until storage is confirmed.",
                "ಸಂಗ್ರಹಣೆ ದೃಢೀಕರಿಸುವವರೆಗೆ ಹಣ ಎಸ್ಕ್ರೋದಲ್ಲಿರುತ್ತದೆ.",
              ),
            },
          ].map((s) => (
            <div
              key={s.n}
              className="rounded-xl border border-border bg-card p-6 shadow-[var(--shadow-card)]"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                {s.n}
              </div>
              <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="border-y border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <div className="mb-10">
            <h2 className="text-3xl font-bold">{t("Why GrainGuard", "GrainGuard ಏಕೆ")}</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Lock,
                title: t("Secure Escrow", "ಸುರಕ್ಷಿತ ಎಸ್ಕ್ರೋ"),
                desc: t(
                  "Your payment is protected until grains are safely stored.",
                  "ಧಾನ್ಯಗಳು ಸುರಕ್ಷಿತವಾಗಿ ಸಂಗ್ರಹವಾಗುವವರೆಗೆ ಪಾವತಿ ರಕ್ಷಿಸಲಾಗುತ್ತದೆ.",
                ),
              },
              {
                icon: Warehouse,
                title: t("Trusted Storage", "ವಿಶ್ವಾಸಾರ್ಹ ಸಂಗ್ರಹಣೆ"),
                desc: t(
                  "All storage owners are verified and rated by the community.",
                  "ಎಲ್ಲ ಸಂಗ್ರಹಣಾ ಮಾಲೀಕರು ಪರಿಶೀಲಿತರು.",
                ),
              },
              {
                icon: CalendarCheck,
                title: t("Easy Booking", "ಸುಲಭ ಬುಕಿಂಗ್"),
                desc: t(
                  "Book in minutes, manage everything from one dashboard.",
                  "ನಿಮಿಷಗಳಲ್ಲಿ ಬುಕ್ ಮಾಡಿ, ಒಂದೇ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್‌ನಿಂದ ನಿರ್ವಹಿಸಿ.",
                ),
              },
            ].map((f) => (
              <div key={f.title} className="rounded-xl border border-border bg-card p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-soft">
                  <f.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="rounded-2xl border border-border bg-primary-soft p-8 text-center md:p-12">
          <h2 className="text-3xl font-bold">{t("Have questions?", "ಪ್ರಶ್ನೆಗಳಿವೆಯೇ?")}</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            {t(
              "Our team is here to help farmers and storage owners get started.",
              "ರೈತರಿಗೆ ಮತ್ತು ಸಂಗ್ರಹಣಾ ಮಾಲೀಕರಿಗೆ ಸಹಾಯ ಮಾಡಲು ನಮ್ಮ ತಂಡ ಇಲ್ಲಿದೆ.",
            )}
          </p>
          <Button asChild size="lg" className="mt-6">
            <Link to="/help">{t("Get Help & Support", "ಸಹಾಯ ಮತ್ತು ಬೆಂಬಲ")}</Link>
          </Button>
        </div>
      </section>
    </PageShell>
  );
}
