import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, CheckCircle2, MapPin, Sparkles } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useApp } from "@/lib/app-context";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/owner/add")({
  head: () => ({ meta: [{ title: "Add Storage — GrainGuard" }] }),
  component: AddStorage,
});

const CROPS = ["rice", "wheat", "maize", "ragi", "jowar", "pulses"];

function AddStorage() {
  const { t } = useApp();
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string[]>([]);
  const [type, setType] = useState("p2p");
  const [submitted, setSubmitted] = useState(false);

  const toggle = (c: string) =>
    setSelected((s) => (s.includes(c) ? s.filter((x) => x !== c) : [...s, c]));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => navigate({ to: "/owner" }), 1500);
  };

  if (submitted) {
    return (
      <PageShell>
        <section className="mx-auto max-w-md px-4 py-20 text-center sm:px-6">
          <div className="rounded-2xl border border-border bg-card p-8 shadow-[var(--shadow-card)]">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success/15">
              <CheckCircle2 className="h-9 w-9 text-success" />
            </div>
            <h1 className="mt-4 text-2xl font-bold">
              {t("Storage Added", "ಸಂಗ್ರಹಣೆ ಸೇರಿಸಲಾಗಿದೆ")}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {t("Returning to dashboard...", "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್‌ಗೆ ಹಿಂದಿರುಗುತ್ತಿದೆ...")}
            </p>
          </div>
        </section>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <section className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <Button asChild variant="ghost" className="mb-2 text-muted-foreground">
          <Link to="/owner">
            <ArrowLeft className="mr-1.5 h-4 w-4" /> {t("Back", "ಹಿಂದೆ")}
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">
          {t("Setup Your Storage", "ನಿಮ್ಮ ಸಂಗ್ರಹಣೆಯನ್ನು ಹೊಂದಿಸಿ")}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {t(
            "Provide details so farmers can find you.",
            "ರೈತರು ನಿಮ್ಮನ್ನು ಹುಡುಕಲು ವಿವರಗಳನ್ನು ಒದಗಿಸಿ.",
          )}
        </p>

        <form
          onSubmit={submit}
          className="mt-6 space-y-5 rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] md:p-8"
        >
          <div>
            <Label htmlFor="name">{t("Storage Name", "ಸಂಗ್ರಹಣೆ ಹೆಸರು")}</Label>
            <Input
              id="name"
              required
              placeholder={t("e.g. Green Field Warehouse", "ಉದಾ. ಗ್ರೀನ್ ಫೀಲ್ಡ್")}
              className="mt-1.5 h-12 text-base"
            />
          </div>

          <div>
            <Label>{t("Storage Type", "ಸಂಗ್ರಹಣೆ ಪ್ರಕಾರ")}</Label>
            <div className="mt-2 grid gap-2 sm:grid-cols-3">
              {[
                { v: "p2p", label: t("P2P Community", "P2P ಸಮುದಾಯ") },
                { v: "commercial", label: t("Commercial", "ವಾಣಿಜ್ಯ") },
                { v: "govt", label: t("Govt Approved", "ಸರ್ಕಾರ ಅನುಮೋದಿತ") },
              ].map((o) => (
                <button
                  key={o.v}
                  type="button"
                  onClick={() => setType(o.v)}
                  className={cn(
                    "rounded-lg border-2 px-3 py-2.5 text-sm font-medium transition-all",
                    type === o.v
                      ? "border-primary bg-primary-soft"
                      : "border-border bg-background hover:border-primary/40",
                  )}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="cap">{t("Total Capacity (kg)", "ಒಟ್ಟು ಸಾಮರ್ಥ್ಯ (ಕೆಜಿ)")}</Label>
              <Input id="cap" type="number" min={100} required className="mt-1.5 h-12 text-base" />
            </div>
            <div>
              <Label htmlFor="price">{t("Price per unit (₹/kg/month)", "ಪ್ರತಿ ಯೂನಿಟ್ ಬೆಲೆ")}</Label>
              <Input
                id="price"
                type="number"
                min={1}
                step="0.5"
                required
                className="mt-1.5 h-12 text-base"
              />
            </div>
          </div>

          <div>
            <Label className="mb-2 block">{t("Accepted crops", "ಸ್ವೀಕರಿಸುವ ಬೆಳೆಗಳು")}</Label>
            <div className="flex flex-wrap gap-2">
              {CROPS.map((c) => {
                const active = selected.includes(c);
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => toggle(c)}
                    className={cn(
                      "rounded-full border-2 px-4 py-2 text-sm font-medium capitalize transition-all",
                      active
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-background hover:border-primary/50",
                    )}
                  >
                    {c}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <Label htmlFor="best">
              <span className="inline-flex items-center gap-1">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                {t("Best crop to store (recommended)", "ಸಂಗ್ರಹಿಸಲು ಉತ್ತಮ ಬೆಳೆ")}
              </span>
            </Label>
            <Select>
              <SelectTrigger id="best" className="mt-1.5 h-12">
                <SelectValue placeholder={t("Choose your specialty", "ನಿಮ್ಮ ವಿಶೇಷತೆಯನ್ನು ಆರಿಸಿ")} />
              </SelectTrigger>
              <SelectContent>
                {CROPS.map((c) => (
                  <SelectItem key={c} value={c} className="capitalize">
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="security">{t("Security provided", "ಸುರಕ್ಷತೆ ಒದಗಿಸಲಾಗಿದೆ")}</Label>
            <Textarea
              id="security"
              rows={2}
              placeholder={t("e.g. CCTV, Guard, Fire alarm", "ಉದಾ. CCTV, ಗಾರ್ಡ್")}
              className="mt-1.5"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="loc">
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-primary" />
                  {t("Google Maps location (link/coords)", "Google Maps ಸ್ಥಳ")}
                </span>
              </Label>
              <Input
                id="loc"
                required
                placeholder="https://maps.google.com/..."
                className="mt-1.5 h-12 text-base"
              />
            </div>
            <div>
              <Label htmlFor="addr">{t("Physical address", "ಭೌತಿಕ ವಿಳಾಸ")}</Label>
              <Input
                id="addr"
                required
                placeholder={t("Street, City, Pincode", "ರಸ್ತೆ, ನಗರ, ಪಿನ್")}
                className="mt-1.5 h-12 text-base"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="social">
              {t("Social media / promo links (optional)", "ಸಾಮಾಜಿಕ ಮಾಧ್ಯಮ ಲಿಂಕ್‌ಗಳು")}
            </Label>
            <Input
              id="social"
              placeholder="@yourhandle or https://..."
              className="mt-1.5 h-12 text-base"
            />
          </div>

          <Button
            type="submit"
            size="lg"
            className="h-12 w-full text-base"
            disabled={selected.length === 0}
          >
            {t("Submit Storage", "ಸಂಗ್ರಹಣೆ ಸಲ್ಲಿಸಿ")}
          </Button>
        </form>
      </section>
    </PageShell>
  );
}
