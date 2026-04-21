import { createFileRoute } from "@tanstack/react-router";
import {
  Sprout,
  Warehouse,
  Search,
  FileSignature,
  ShieldCheck,
  PackageCheck,
  Plus,
  ListChecks,
  Receipt,
} from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { useApp } from "@/lib/app-context";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — GrainGuard" },
      {
        name: "description",
        content:
          "Learn how GrainGuard helps farmers and storage owners with safe, escrow-protected grain storage.",
      },
      { property: "og:title", content: "About GrainGuard" },
      {
        property: "og:description",
        content: "Step-by-step: how farmers and storage owners use GrainGuard.",
      },
    ],
  }),
  component: About,
});

function About() {
  const { t } = useApp();

  const farmerSteps = [
    {
      icon: Sprout,
      title: t("Sign up & choose crop", "ಸೈನ್ ಅಪ್ ಮಾಡಿ"),
      desc: t(
        "Login with your phone and tell us what you need to store.",
        "ನಿಮ್ಮ ಫೋನ್‌ನಿಂದ ಲಾಗಿನ್ ಮಾಡಿ.",
      ),
    },
    {
      icon: Search,
      title: t("Find storage", "ಸಂಗ್ರಹಣೆ ಹುಡುಕಿ"),
      desc: t("Browse verified facilities on map or list.", "ಪರಿಶೀಲಿತ ಸೌಲಭ್ಯಗಳನ್ನು ನೋಡಿ."),
    },
    {
      icon: FileSignature,
      title: t("Sign smart contract", "ಒಪ್ಪಂದಕ್ಕೆ ಸಹಿ"),
      desc: t("Plain-language terms — tap to agree.", "ಸರಳ ನಿಯಮಗಳಿಗೆ ಒಪ್ಪಿಗೆ."),
    },
    {
      icon: ShieldCheck,
      title: t("Pay & track", "ಪಾವತಿಸಿ ಮತ್ತು ಟ್ರ್ಯಾಕ್"),
      desc: t("Money in escrow. Monitor your stored grain anytime.", "ಎಸ್ಕ್ರೋ ಮತ್ತು ಮೇಲ್ವಿಚಾರಣೆ."),
    },
  ];

  const ownerSteps = [
    {
      icon: Warehouse,
      title: t("Sign up as owner", "ಮಾಲೀಕರಾಗಿ ಸೈನ್ ಅಪ್"),
      desc: t("Tell us your storage capacity and location.", "ನಿಮ್ಮ ಸಾಮರ್ಥ್ಯ ಮತ್ತು ಸ್ಥಳ."),
    },
    {
      icon: Plus,
      title: t("Add your facility", "ಸೌಲಭ್ಯ ಸೇರಿಸಿ"),
      desc: t("Set price, security, and accepted crops.", "ಬೆಲೆ ಮತ್ತು ಬೆಳೆಗಳನ್ನು ಹೊಂದಿಸಿ."),
    },
    {
      icon: ListChecks,
      title: t("Receive bookings", "ಬುಕಿಂಗ್ ಸ್ವೀಕರಿಸಿ"),
      desc: t("Verified farmers book directly.", "ರೈತರಿಂದ ನೇರ ಬುಕಿಂಗ್."),
    },
    {
      icon: Receipt,
      title: t("Get paid", "ಪಾವತಿ ಪಡೆಯಿರಿ"),
      desc: t("Escrow releases automatically on completion.", "ಪೂರ್ಣಗೊಂಡಾಗ ಎಸ್ಕ್ರೋ ಬಿಡುಗಡೆ."),
    },
  ];

  return (
    <PageShell>
      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <h1 className="text-4xl font-bold">{t("About GrainGuard", "GrainGuard ಬಗ್ಗೆ")}</h1>
        <p className="mt-3 max-w-3xl text-lg text-muted-foreground">
          {t(
            "GrainGuard is built to solve a real problem in rural India — protecting harvests from wastage and giving farmers safe access to storage with payments they can trust.",
            "GrainGuard ಗ್ರಾಮೀಣ ಭಾರತದ ನಿಜವಾದ ಸಮಸ್ಯೆ ಪರಿಹರಿಸಲು ನಿರ್ಮಿಸಲಾಗಿದೆ.",
          )}
        </p>

        {/* Farmer steps */}
        <div className="mt-10">
          <div className="flex items-center gap-2">
            <Sprout className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-bold">
              {t("How farmers use GrainGuard", "ರೈತರು ಹೇಗೆ ಬಳಸುತ್ತಾರೆ")}
            </h2>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {farmerSteps.map((s, i) => (
              <StepCard key={i} n={i + 1} icon={s.icon} title={s.title} desc={s.desc} />
            ))}
          </div>
        </div>

        {/* Owner steps */}
        <div className="mt-12">
          <div className="flex items-center gap-2">
            <Warehouse className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-bold">
              {t("How storage owners use GrainGuard", "ಮಾಲೀಕರು ಹೇಗೆ ಬಳಸುತ್ತಾರೆ")}
            </h2>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ownerSteps.map((s, i) => (
              <StepCard key={i} n={i + 1} icon={s.icon} title={s.title} desc={s.desc} />
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}

function StepCard({
  n,
  icon: Icon,
  title,
  desc,
}: {
  n: number;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
}) {
  return (
    <div className="relative rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-soft)]">
      <span className="absolute -top-2 -left-2 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground shadow-[var(--shadow-soft)]">
        {n}
      </span>
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-soft">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <h3 className="mt-3 font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
    </div>
  );
}
