import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Phone, KeyRound, Languages, ShieldCheck, Wheat, IndianRupee, CheckCircle2, Crown, X } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
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

function Login() {
  const { t, language, setLanguage, login, preAuthRole, selectedPlan, setSelectedPlan } = useApp();
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [docId, setDocId] = useState("");
  const [email, setEmail] = useState("");
  const [ownerPlan, setOwnerPlan] = useState<"Basic" | "Prime">(selectedPlan);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);

  // Determine role from global pre-auth state, default to farmer if not set
  const role = preAuthRole || "farmer";

  const sendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (phone.replace(/\D/g, "").length < 10) {
      setError(t("Enter a valid 10-digit phone number", "ಮಾನ್ಯ 10-ಅಂಕಿಯ ಫೋನ್ ನಂಬರ್ ನಮೂದಿಸಿ"));
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
    if (role === "owner") {
      // Owner: trigger payment popup before completing login
      setPaymentOpen(true);
    } else {
      // Farmer: direct login
      login({ phone, role: "farmer", name, membership: undefined });
      navigate({ to: "/farmer/active" });
    }
  };

  const handlePaymentComplete = () => {
    setPaymentProcessing(true);
    setTimeout(() => {
      setPaymentProcessing(false);
      setPaymentOpen(false);
      login({ phone, role: "owner", name, membership: ownerPlan });
      navigate({ to: "/owner" });
    }, 1500);
  };

  return (
    <PageShell>
      <section className="mx-auto flex max-w-2xl flex-col px-4 py-10 sm:px-6 sm:py-14">
        <div className="mb-6 flex flex-col items-center text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-[var(--shadow-elevated)]">
            <Wheat className="h-7 w-7" />
          </div>
          <h1 className="mt-4 text-3xl font-bold">
            {role === "owner"
              ? t("Owner Registration", "ಮಾಲೀಕ ನೋಂದಣಿ")
              : t("Farmer Registration", "ರೈತ ನೋಂದಣಿ")}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {t("Complete your details and verify to continue.", "ಮುಂದುವರಿಯಲು ನಿಮ್ಮ ವಿವರಗಳನ್ನು ಪೂರ್ಣಗೊಳಿಸಿ.")}
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
            {/* Registration Details — shown before OTP */}
            {!otpSent && (
              <div className="space-y-4">
                <div>
                  <Label className="text-xs font-semibold">{t("Full Name", "ಪೂರ್ಣ ಹೆಸರು")}</Label>
                  <Input value={name} onChange={e => setName(e.target.value)} required className="mt-1" placeholder={t("Enter your name", "ನಿಮ್ಮ ಹೆಸರು ನಮೂದಿಸಿ")} />
                </div>
                <div>
                  <Label className="text-xs font-semibold">{t("Address", "ವಿಳಾಸ")}</Label>
                  <Input value={address} onChange={e => setAddress(e.target.value)} required className="mt-1" placeholder={t("Your physical address", "ನಿಮ್ಮ ಭೌತಿಕ ವಿಳಾಸ")} />
                </div>
                <div>
                  <Label className="text-xs font-semibold">
                    {role === "farmer"
                      ? t("Aadhaar or Kisan Card Number", "ಆಧಾರ್ ಅಥವಾ ಕಿಸಾನ್ ಕಾರ್ಡ್ ಸಂಖ್ಯೆ")
                      : t("Aadhaar Number", "ಆಧಾರ್ ಸಂಖ್ಯೆ")}
                  </Label>
                  <Input value={docId} onChange={e => setDocId(e.target.value)} required className="mt-1" placeholder="XXXX XXXX XXXX" />
                </div>
                <div>
                  <Label className="text-xs font-semibold">{t("Email (Optional)", "ಇಮೇಲ್ (ಐಚ್ಛಿಕ)")}</Label>
                  <Input type="email" value={email} onChange={e => setEmail(e.target.value)} className="mt-1" />
                </div>
              </div>
            )}

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

            {/* Owner Plan Selector */}
            {role === "owner" && !otpSent && (
              <div className="rounded-xl border border-border bg-muted/20 p-5">
                <Label className="text-xs font-semibold mb-3 block">{t("Choose Subscription Plan", "ಚಂದಾದಾರಿಕೆ ಯೋಜನೆ ಆರಿಸಿ")}</Label>
                <div className="grid grid-cols-2 gap-3">
                  <label className={cn(
                    "cursor-pointer rounded-xl border-2 p-4 transition-all",
                    ownerPlan === "Basic" ? "border-primary bg-primary-soft shadow-[var(--shadow-soft)]" : "border-border bg-background hover:border-primary/40"
                  )}>
                    <input type="radio" className="sr-only" checked={ownerPlan === "Basic"} onChange={() => { setOwnerPlan("Basic"); setSelectedPlan("Basic"); }} />
                    <div className="font-bold">Basic</div>
                    <div className="text-xs text-muted-foreground mt-1">{t("Pay fixed listing fee per storage added", "ಸೇರಿಸಿದ ಸಂಗ್ರಹಣೆಗೆ ನಿಗದಿತ ಪಟ್ಟಿ ಶುಲ್ಕ")}</div>
                  </label>
                  <label className={cn(
                    "cursor-pointer rounded-xl border-2 p-4 transition-all",
                    ownerPlan === "Prime" ? "border-primary bg-primary/10 shadow-[var(--shadow-soft)]" : "border-border bg-background hover:border-primary/40"
                  )}>
                    <input type="radio" className="sr-only" checked={ownerPlan === "Prime"} onChange={() => { setOwnerPlan("Prime"); setSelectedPlan("Prime"); }} />
                    <div className="font-bold text-primary flex items-center gap-1"><Crown className="h-3.5 w-3.5" /> Prime</div>
                    <div className="text-xs mt-1">₹999/mo · {t("Full Access", "ಸಂಪೂರ್ಣ ಪ್ರವೇಶ")}</div>
                  </label>
                </div>
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
                  <div className="pl-10">
                    <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} className="h-12 w-12 text-lg" />
                        <InputOTPSlot index={1} className="h-12 w-12 text-lg" />
                        <InputOTPSlot index={2} className="h-12 w-12 text-lg" />
                        <InputOTPSlot index={3} className="h-12 w-12 text-lg" />
                        <InputOTPSlot index={4} className="h-12 w-12 text-lg" />
                        <InputOTPSlot index={5} className="h-12 w-12 text-lg" />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
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
                ? t("Verify & Continue", "ಪರಿಶೀಲಿಸಿ ಮತ್ತು ಮುಂದುವರಿಸಿ")
                : t("Send OTP", "OTP ಕಳುಹಿಸಿ")}
            </Button>

            {otpSent && (
              <button
                type="button"
                onClick={() => { setOtpSent(false); setOtp(""); }}
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

      {/* Payment Popup for Owners */}
      <Dialog open={paymentOpen} onOpenChange={setPaymentOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <IndianRupee className="h-5 w-5 text-primary" />
              {t("Payment", "ಪಾವತಿ")}
            </DialogTitle>
            <DialogDescription>
              {ownerPlan === "Prime"
                ? t("Complete your Prime subscription payment to unlock all features.", "ಎಲ್ಲ ವೈಶಿಷ್ಟ್ಯಗಳನ್ನು ಅನ್ಲಾಕ್ ಮಾಡಲು ಪ್ರೈಮ್ ಚಂದಾದಾರಿಕೆ ಪಾವತಿ ಪೂರ್ಣಗೊಳಿಸಿ.")
                : t("Pay the fixed listing fee to activate your first facility listing.", "ನಿಮ್ಮ ಮೊದಲ ಸೌಲಭ್ಯ ಪಟ್ಟಿಯನ್ನು ಸಕ್ರಿಯಗೊಳಿಸಲು ನಿಗದಿತ ಪಟ್ಟಿ ಶುಲ್ಕ ಪಾವತಿಸಿ.")}
            </DialogDescription>
          </DialogHeader>

          <div className="py-6">
            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 text-center">
              <div className="text-sm font-semibold text-muted-foreground mb-2">
                {ownerPlan === "Prime" ? t("Prime Subscription", "ಪ್ರೈಮ್ ಚಂದಾದಾರಿಕೆ") : t("Basic Listing Fee", "ಮೂಲ ಪಟ್ಟಿ ಶುಲ್ಕ")}
              </div>
              <div className="text-5xl font-black text-primary">
                {ownerPlan === "Prime" ? "₹999" : "₹159"}
              </div>
              <div className="mt-1 text-sm text-muted-foreground">
                {ownerPlan === "Prime" ? t("per month", "ಪ್ರತಿ ತಿಂಗಳು") : t("one-time fee", "ಒಂದು-ಬಾರಿ ಶುಲ್ಕ")}
              </div>
            </div>

            <div className="mt-6 space-y-2">
              {(ownerPlan === "Prime"
                ? ["Unlimited listings", "Market Insights", "Priority ranking", "24/7 Chat Support"]
                : ["1 facility listing", "Standard support", "Escrow protection"]
              ).map((f) => (
                <div key={f} className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-success" /> {f}
                </div>
              ))}
            </div>
          </div>

          <DialogFooter className="flex-col gap-2 sm:flex-col">
            <Button size="lg" className="w-full h-12 text-base" onClick={handlePaymentComplete} disabled={paymentProcessing}>
              {paymentProcessing
                ? t("Processing...", "ಪ್ರಕ್ರಿಯೆಯಲ್ಲಿದೆ...")
                : t("Pay & Complete Registration", "ಪಾವತಿಸಿ ಮತ್ತು ನೋಂದಣಿ ಪೂರ್ಣಗೊಳಿಸಿ")}
            </Button>
            <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
              <ShieldCheck className="h-3.5 w-3.5 text-success" />
              {t("Secured payment gateway", "ಸುರಕ್ಷಿತ ಪಾವತಿ ಗೇಟ್‌ವೇ")}
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageShell>
  );
}
