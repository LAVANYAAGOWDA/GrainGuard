import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Wheat, Search, Package, Boxes, ShieldCheck, Sparkles, Truck } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useApp } from "@/lib/app-context";
import { cn } from "@/lib/utils";
import { FlowBreadcrumb } from "@/components/Breadcrumb";

export const Route = createFileRoute("/farmer/")({
  head: () => ({
    meta: [{ title: "Farmer Dashboard — GrainGuard" }],
  }),
  component: FarmerDashboard,
});

const CROPS = [
  { id: "rice", label: { en: "Rice", kn: "ಅಕ್ಕಿ" }, emoji: "🌾" },
  { id: "wheat", label: { en: "Wheat", kn: "ಗೋಧಿ" }, emoji: "🌾" },
  { id: "maize", label: { en: "Maize", kn: "ಮೆಕ್ಕೆ" }, emoji: "🌽" },
  { id: "ragi", label: { en: "Ragi", kn: "ರಾಗಿ" }, emoji: "🌱" },
  { id: "jowar", label: { en: "Jowar", kn: "ಜೋಳ" }, emoji: "🌾" },
  { id: "pulses", label: { en: "Pulses", kn: "ಬೇಳೆ" }, emoji: "🫘" },
];

function FarmerDashboard() {
  const { t, language, activeBooking } = useApp();
  const navigate = useNavigate();
  const [crop, setCrop] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("kg");
  const [duration, setDuration] = useState("");

  const canSubmit = crop && quantity && duration;

  return (
    <PageShell>
      <section className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <FlowBreadcrumb
          current={1}
          steps={[
            { label: t("Summary", "ಸಾರಾಂಶ") },
            { label: t("Best Matches", "ಉತ್ತಮ ಹೊಂದಿಕೆಗಳು") },
            { label: t("Payment", "ಪಾವತಿ") },
          ]}
        />

        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-3xl font-bold">{t("Farmer Dashboard", "ರೈತ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್")}</h1>
            <p className="mt-1 text-muted-foreground">
              {t("Tell us what you need to store.", "ನೀವು ಏನನ್ನು ಸಂಗ್ರಹಿಸಬೇಕು ಎಂದು ತಿಳಿಸಿ.")}
            </p>
          </div>
          {activeBooking && (
            <Button asChild variant="outline">
              <Link to="/farmer/active">
                <Package className="mr-2 h-4 w-4" />
                {t("My Storage", "ನನ್ನ ಸಂಗ್ರಹಣೆ")}
              </Link>
            </Button>
          )}
        </div>

        {/* Services intro */}
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {[
            {
              icon: ShieldCheck,
              title: t("Verified Storage", "ಪರಿಶೀಲಿತ ಸಂಗ್ರಹಣೆ"),
              desc: t(
                "Vetted P2P and commercial facilities.",
                "ಪರಿಶೀಲಿತ P2P ಮತ್ತು ವಾಣಿಜ್ಯ ಸೌಲಭ್ಯಗಳು.",
              ),
            },
            {
              icon: Sparkles,
              title: t("AI-Matched Picks", "AI ಹೊಂದಿಕೆ"),
              desc: t("Smart suggestions for your crop type.", "ನಿಮ್ಮ ಬೆಳೆಗೆ ಸ್ಮಾರ್ಟ್ ಸಲಹೆಗಳು."),
            },
            {
              icon: Truck,
              title: t("Logistics Support", "ಸಾಗಣೆ ಬೆಂಬಲ"),
              desc: t("Transport help if storage is far.", "ಸಂಗ್ರಹಣೆ ದೂರವಿದ್ದರೆ ಸಾಗಣೆ ಸಹಾಯ."),
            },
          ].map((s) => (
            <div
              key={s.title}
              className="flex items-start gap-3 rounded-xl border border-border bg-card/80 p-4 backdrop-blur"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-soft">
                <s.icon className="h-4 w-4 text-primary" />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-semibold">{s.title}</div>
                <div className="mt-0.5 text-xs text-muted-foreground">{s.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] md:p-8">
          <h2 className="text-lg font-semibold">{t("Select your crop", "ನಿಮ್ಮ ಬೆಳೆ ಆಯ್ಕೆಮಾಡಿ")}</h2>
          <p className="text-sm text-muted-foreground">
            {t("Tap the icon that matches your harvest.", "ನಿಮ್ಮ ಫಸಲಿಗೆ ಹೊಂದುವ ಐಕಾನ್ ಒತ್ತಿರಿ.")}
          </p>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
            {CROPS.map((c) => {
              const active = crop === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setCrop(c.id)}
                  className={cn(
                    "flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all",
                    active
                      ? "border-primary bg-primary-soft shadow-[var(--shadow-soft)]"
                      : "border-border bg-background hover:border-primary/50",
                  )}
                >
                  <span className="text-3xl" aria-hidden>
                    {c.emoji}
                  </span>
                  <Wheat
                    className={cn(
                      "hidden h-5 w-5",
                      active ? "text-primary" : "text-muted-foreground",
                    )}
                  />
                  <span className="text-sm font-medium">{c.label[language]}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="md:col-span-2">
              <Label htmlFor="qty">{t("Quantity", "ಪ್ರಮಾಣ")}</Label>
              <div className="relative mt-1.5 flex">
                <Boxes className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="qty"
                  type="number"
                  min={1}
                  placeholder="500"
                  className="h-12 rounded-r-none border-r-0 pl-10 text-base"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
                <Select value={unit} onValueChange={setUnit}>
                  <SelectTrigger className="h-12 w-28 rounded-l-none border-l-0">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kg">{t("kg", "ಕೆಜಿ")}</SelectItem>
                    <SelectItem value="quintal">{t("Quintal", "ಕ್ವಿಂಟಾಲ್")}</SelectItem>
                    <SelectItem value="ton">{t("Ton", "ಟನ್")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="dur">{t("Duration", "ಅವಧಿ")}</Label>
              <Select value={duration} onValueChange={setDuration}>
                <SelectTrigger id="dur" className="mt-1.5 h-12 text-base">
                  <SelectValue placeholder={t("Select duration", "ಅವಧಿ ಆಯ್ಕೆಮಾಡಿ")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 {t("month", "ತಿಂಗಳು")}</SelectItem>
                  <SelectItem value="3">3 {t("months", "ತಿಂಗಳು")}</SelectItem>
                  <SelectItem value="6">6 {t("months", "ತಿಂಗಳು")}</SelectItem>
                  <SelectItem value="12">12 {t("months", "ತಿಂಗಳು")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            size="lg"
            className="mt-6 h-12 w-full gap-2 text-base sm:w-auto"
            disabled={!canSubmit}
            onClick={() =>
              navigate({
                to: "/farmer/storage",
                search: { crop, quantity, duration, unit },
              })
            }
          >
            <Search className="h-4 w-4" />
            {t("Find Storage", "ಸಂಗ್ರಹಣೆ ಹುಡುಕಿ")}
          </Button>
        </div>
      </section>
    </PageShell>
  );
}
