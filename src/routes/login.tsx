import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Phone, KeyRound, Languages, Sprout, Warehouse, ShieldCheck, Wheat } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useApp } from "@/lib/app-context";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Login — GrainGuard" },
      { name: "description", content: "Login to GrainGuard with your phone number." },
    ],
  }),
  component: Login,
});

type Role = "farmer" | "owner";

function Login() {
  const { t, language, setLanguage, login } = useApp();
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [role, setRole] = useState<Role | null>(null);
  const [error, setError] = useState("");

  const sendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (phone.replace(/\D/g, "").length < 10) {
      setError(t("Enter a valid 10-digit phone number", "ಮಾನ್ಯ 10-ಅಂಕಿಯ ಫೋನ್ ನಂಬರ್ ನಮೂದಿಸಿ"));
      return;
    }
    if (!role) {
      setError(t("Please select a role to continue", "ಮುಂದುವರಿಯಲು ಪಾತ್ರವನ್ನು ಆಯ್ಕೆಮಾಡಿ"));
      return;
    }
    setOtpSent(true);
  };

  const verifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (otp.length !== 6) {
      setError(t("Enter the 6-digit OTP", "6 ಅಂಕಿಯ OTP ನಮೂದಿಸಿ"));
      return;
    }
    if (!role) return;
    login({ phone, role });
    navigate({ to: role === "farmer" ? "/farmer" : "/owner" });
  };

  return (
    <PageShell>
      <section className="mx-auto flex max-w-2xl flex-col px-4 py-10 sm:px-6 sm:py-14">
        <div className="mb-6 flex flex-col items-center text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-[var(--shadow-elevated)]">
            <Wheat className="h-7 w-7" />
          </div>
          <h1 className="mt-4 text-3xl font-bold">
            {t("Welcome to GrainGuard", "GrainGuard ಗೆ ಸುಸ್ವಾಗತ")}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {t(
              "Login with your mobile number to continue.",
              "ಮುಂದುವರಿಯಲು ನಿಮ್ಮ ಮೊಬೈಲ್ ಸಂಖ್ಯೆಯೊಂದಿಗೆ ಲಾಗಿನ್ ಮಾಡಿ.",
            )}
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-elevated)] md:p-8">
          {/* Language selector */}
          <div className="mb-5 rounded-lg border border-border bg-muted/40 p-3">
            <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              <Languages className="h-3.5 w-3.5" />
              {t("Choose your language", "ನಿಮ್ಮ ಭಾಷೆ ಆಯ್ಕೆಮಾಡಿ")}
            </div>
            <div className="grid grid-cols-2 gap-2">
              {(["en", "kn"] as const).map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLanguage(l)}
                  className={cn(
                    "rounded-md border-2 py-2 text-sm font-semibold transition-all",
                    language === l
                      ? "border-primary bg-primary-soft text-foreground"
                      : "border-border bg-background text-muted-foreground hover:border-primary/50",
                  )}
                >
                  {l === "en" ? "English" : "ಕನ್ನಡ"}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={otpSent ? verifyOtp : sendOtp} className="space-y-5">
            {/* Phone */}
            <div>
              <Label htmlFor="phone" className="text-sm font-semibold">
                {t("Mobile number", "ಮೊಬೈಲ್ ಸಂಖ್ಯೆ")}
              </Label>
              <div className="relative mt-1.5">
                <span className="pointer-events-none absolute left-3 top-1/2 flex -translate-y-1/2 items-center gap-1 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  +91
                </span>
                <Input
                  id="phone"
                  type="tel"
                  inputMode="numeric"
                  placeholder="XXXXXXXXXX"
                  className="h-12 pl-16 text-base tracking-wider"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                  disabled={otpSent}
                  required
                />
              </div>
            </div>

            {/* Role selection */}
            {!otpSent && (
              <div>
                <Label className="text-sm font-semibold">
                  {t("I am here to...", "ನಾನು ಇಲ್ಲಿರುವುದು...")}
                </Label>
                <div className="mt-2 grid gap-3 sm:grid-cols-2">
                  {[
                    {
                      value: "farmer" as const,
                      icon: Sprout,
                      title: t("Store Grain", "ಧಾನ್ಯ ಸಂಗ್ರಹಿಸಲು"),
                      desc: t("I'm a farmer", "ನಾನು ರೈತ"),
                    },
                    {
                      value: "owner" as const,
                      icon: Warehouse,
                      title: t("Offer Storage", "ಸಂಗ್ರಹಣೆ ನೀಡಲು"),
                      desc: t("I have storage space", "ನನ್ನ ಬಳಿ ಸಂಗ್ರಹಣಾ ಸ್ಥಳವಿದೆ"),
                    },
                  ].map((c) => {
                    const active = role === c.value;
                    return (
                      <label
                        key={c.value}
                        className={cn(
                          "relative flex cursor-pointer flex-col gap-1 rounded-xl border-2 p-4 transition-all",
                          active
                            ? "border-primary bg-primary-soft shadow-[var(--shadow-soft)]"
                            : "border-border bg-background hover:border-primary/40",
                        )}
                      >
                        <input
                          type="radio"
                          name="role"
                          value={c.value}
                          className="sr-only"
                          checked={active}
                          onChange={() => setRole(c.value)}
                        />
                        <div className="flex items-center gap-3">
                          <div
                            className={cn(
                              "flex h-10 w-10 items-center justify-center rounded-lg",
                              active
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted text-primary",
                            )}
                          >
                            <c.icon className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="font-semibold">{c.title}</div>
                            <div className="text-xs text-muted-foreground">{c.desc}</div>
                          </div>
                        </div>
                      </label>
                    );
                  })}
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  {t(
                    "Note: Your role is locked after login.",
                    "ಗಮನಿಸಿ: ಲಾಗಿನ್ ನಂತರ ನಿಮ್ಮ ಪಾತ್ರವನ್ನು ಬದಲಾಯಿಸಲಾಗದು.",
                  )}
                </p>
              </div>
            )}

            {/* OTP */}
            {otpSent && (
              <div>
                <Label htmlFor="otp" className="text-sm font-semibold">
                  {t("Enter OTP sent to your phone", "ನಿಮ್ಮ ಫೋನ್‌ಗೆ ಕಳುಹಿಸಲಾದ OTP ನಮೂದಿಸಿ")}
                </Label>
                <div className="relative mt-1.5">
                  <KeyRound className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="otp"
                    inputMode="numeric"
                    pattern="\d{6}"
                    placeholder="000000"
                    minLength={6}
                    maxLength={6}
                    className="h-12 pl-10 text-base tracking-[0.5em]"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    required
                  />
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  {t("Enter exactly 6 digits", "ನಿಖರವಾಗಿ 6 ಅಂಕಿಗಳನ್ನು ನಮೂದಿಸಿ")}
                </p>
              </div>
            )}

            {error && (
              <div className="flex items-start gap-2 rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                <span>{error}</span>
              </div>
            )}

            <Button type="submit" size="lg" className="h-12 w-full text-base">
              {otpSent
                ? t("Verify & Login", "ಪರಿಶೀಲಿಸಿ ಮತ್ತು ಲಾಗಿನ್")
                : t("Send OTP", "OTP ಕಳುಹಿಸಿ")}
            </Button>

            {otpSent && (
              <button
                type="button"
                onClick={() => {
                  setOtpSent(false);
                  setOtp("");
                }}
                className="block w-full text-center text-sm text-muted-foreground underline-offset-4 hover:underline"
              >
                {t("Change phone number", "ಫೋನ್ ನಂಬರ್ ಬದಲಿಸಿ")}
              </button>
            )}

            <div className="flex items-start gap-2 rounded-lg bg-primary-soft/50 p-3 text-xs text-muted-foreground">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span>
                {t(
                  "We use SMS-based one-time passwords to keep your account secure.",
                  "ನಿಮ್ಮ ಖಾತೆ ಸುರಕ್ಷಿತವಾಗಿರಿಸಲು SMS OTP ಬಳಸುತ್ತೇವೆ.",
                )}
              </span>
            </div>
          </form>
        </div>
      </section>
    </PageShell>
  );
}
