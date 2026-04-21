import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  ArrowLeft,
  User,
  Phone,
  Mail,
  Camera,
  BadgeCheck,
  Save,
  LogOut,
  Settings as SettingsIcon,
} from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useApp } from "@/lib/app-context";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Settings — GrainGuard" }] }),
  component: Settings,
});

function Settings() {
  const { t, user, updateUser, logout, isAuthed } = useApp();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  if (!isAuthed || !user) {
    return (
      <PageShell>
        <section className="mx-auto max-w-md px-4 py-20 text-center sm:px-6">
          <h2 className="text-xl font-semibold">{t("Please log in", "ದಯವಿಟ್ಟು ಲಾಗಿನ್ ಮಾಡಿ")}</h2>
          <Button asChild className="mt-4">
            <Link to="/login">{t("Login", "ಲಾಗಿನ್")}</Link>
          </Button>
        </section>
      </PageShell>
    );
  }

  const initials = (name || user.phone)
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({ name, email });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <PageShell>
      <section className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
        <Button asChild variant="ghost" className="mb-2 text-muted-foreground">
          <Link to="/">
            <ArrowLeft className="mr-1.5 h-4 w-4" /> {t("Back", "ಹಿಂದೆ")}
          </Link>
        </Button>
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <SettingsIcon className="h-6 w-6" />
          </div>
          <h1 className="text-3xl font-bold">{t("Settings", "ಸೆಟ್ಟಿಂಗ್‌ಗಳು")}</h1>
        </div>

        <form
          onSubmit={save}
          className="mt-6 space-y-5 rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] md:p-8"
        >
          {/* Avatar */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary-soft text-2xl font-bold">
                {initials}
              </div>
              <button
                type="button"
                className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[var(--shadow-soft)]"
              >
                <Camera className="h-4 w-4" />
              </button>
            </div>
            <div>
              <div className="font-semibold">{name || t("Add your name", "ಹೆಸರು ಸೇರಿಸಿ")}</div>
              <div className="mt-0.5 inline-flex items-center gap-1 rounded-full bg-success/15 px-2 py-0.5 text-xs font-semibold text-success">
                <BadgeCheck className="h-3 w-3" />
                <span className="font-mono">{user.uniqueId}</span>
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="name">{t("Full Name", "ಪೂರ್ಣ ಹೆಸರು")}</Label>
            <div className="relative mt-1.5">
              <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-11 pl-10"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="phone">{t("Phone", "ಫೋನ್")}</Label>
            <div className="relative mt-1.5">
              <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input id="phone" value={user.phone} disabled className="h-11 pl-10" />
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              {t("Phone is locked after login.", "ಲಾಗಿನ್ ನಂತರ ಫೋನ್ ಲಾಕ್.")}
            </p>
          </div>

          <div>
            <Label htmlFor="email">{t("Email", "ಇಮೇಲ್")}</Label>
            <div className="relative mt-1.5">
              <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 pl-10"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            <Button type="submit" size="lg" className="gap-2">
              <Save className="h-4 w-4" />
              {saved ? t("Saved!", "ಉಳಿಸಲಾಗಿದೆ!") : t("Save Changes", "ಬದಲಾವಣೆಗಳನ್ನು ಉಳಿಸಿ")}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="gap-2 text-destructive hover:text-destructive"
              onClick={() => {
                logout();
                navigate({ to: "/" });
              }}
            >
              <LogOut className="h-4 w-4" />
              {t("Logout", "ಲಾಗ್‌ಔಟ್")}
            </Button>
          </div>
        </form>
      </section>
    </PageShell>
  );
}
