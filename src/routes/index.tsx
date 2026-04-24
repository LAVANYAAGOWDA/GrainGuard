import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  ShieldCheck,
  Warehouse,
  ArrowRight,
  Sprout,
  Lock,
  ThermometerSnowflake,
  CheckCircle2,
  TrendingUp,
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import { useApp } from "@/lib/app-context";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "GrainGuard — Smart Grain Storage Platform" },
      { name: "description", content: "Find trusted storage for your grains." },
    ],
  }),
  component: Landing,
});

function Landing() {
  const { t, isAuthed, role } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthed) {
      if (role === "farmer") navigate({ to: "/farmer", replace: true });
      if (role === "owner") navigate({ to: "/owner", replace: true });
    }
  }, [isAuthed, role, navigate]);

  const [getStartedOpen, setGetStartedOpen] = useState(false);

  const [escrowOpen, setEscrowOpen] = useState(false);
  const [climateOpen, setClimateOpen] = useState(false);
  const [currentReview, setCurrentReview] = useState(0);

  const reviews = [
    {
      name: "Ramesh Gowda",
      role: t("Farmer, Mandya", "ರೈತ, ಮಂಡ್ಯ"),
      text: t("GrainGuard completely changed how I store my harvest. The escrow system gives me peace of mind, and I know exactly where my crops are.", "ಗ್ರೆನ್‌ಗಾರ್ಡ್ ನನ್ನ ಸುಗ್ಗಿಯನ್ನು ನಾನು ಹೇಗೆ ಸಂಗ್ರಹಿಸುತ್ತೇನೆ ಎಂಬುದನ್ನು ಸಂಪೂರ್ಣವಾಗಿ ಬದಲಾಯಿಸಿದೆ. ಎಸ್ಕ್ರೋ ಸಿಸ್ಟಮ್ ನನಗೆ ನೆಮ್ಮದಿ ನೀಡುತ್ತದೆ."),
    },
    {
      name: "Suresh Patil",
      role: t("Facility Owner, Hubli", "ಸೌಲಭ್ಯ ಮಾಲೀಕರು, ಹುಬ್ಬಳ್ಳಿ"),
      text: t("Listing my warehouse was incredibly easy. I've received consistent bookings and the guaranteed payments through escrow are fantastic.", "ನನ್ನ ಗೋದಾಮಿನ ಪಟ್ಟಿ ಮಾಡುವುದು ನಂಬಲಾಗದಷ್ಟು ಸುಲಭವಾಗಿತ್ತು. ನಾನು ಸ್ಥಿರವಾದ ಬುಕಿಂಗ್‌ಗಳನ್ನು ಸ್ವೀಕರಿಸಿದ್ದೇನೆ."),
    },
    {
      name: "Lakshmi N",
      role: t("Farmer, Tumakuru", "ರೈತ, ತುಮಕೂರು"),
      text: t("The climate control alerts saved my jowar from rotting. I highly recommend Prime storage for anyone serious about quality.", "ಹವಾಮಾನ ನಿಯಂತ್ರಣ ಎಚ್ಚರಿಕೆಗಳು ನನ್ನ ಜೋಳವನ್ನು ಕೊಳೆಯದಂತೆ ರಕ್ಷಿಸಿವೆ. ಗುಣಮಟ್ಟದ ಬಗ್ಗೆ ಗಂಭೀರವಾಗಿರುವ ಯಾರಿಗಾದರೂ ನಾನು ಪ್ರೈಮ್ ಸಂಗ್ರಹಣೆಯನ್ನು ಶಿಫಾರಸು ಮಾಡುತ್ತೇನೆ."),
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [reviews.length]);

  return (
    <PageShell>
      {/* Hero — Light Agricultural Theme */}
      <section id="home" className="relative overflow-hidden bg-[#F9FBF9]">
        <div className="absolute inset-0 topo-pattern opacity-[0.04]" aria-hidden />
        <div className="absolute inset-0 bg-gradient-to-br from-[#9CAF88]/10 via-transparent to-[#9CAF88]/5" aria-hidden />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 md:grid-cols-2 md:py-32 md:items-center">
          <div className="z-10 rounded-3xl border border-[#9CAF88]/20 bg-white/70 p-8 shadow-[var(--shadow-elevated)] backdrop-blur-xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#9CAF88]/15 px-3 py-1 text-xs font-semibold text-[#6B8A5E]">
              <Sprout className="h-3.5 w-3.5" />
              {t("Trusted by farmers", "ರೈತರಿಂದ ವಿಶ್ವಾಸಾರ್ಹ")}
            </span>
            <h1 className="mt-4 text-4xl font-black leading-tight text-[#1C2216] md:text-5xl lg:text-6xl tracking-tight">
              {t("Revolutionizing Post-Harvest Storage for India's Farmers", "ಭಾರತದ ರೈತರಿಗೆ ಸುಗ್ಗಿಯ ನಂತರದ ಸಂಗ್ರಹಣೆಯನ್ನು ಕ್ರಾಂತಿಕಾರಿಗೊಳಿಸುವುದು")}
            </h1>
            <p className="mt-4 max-w-lg text-lg text-[#5A6B52] font-medium">
              {t(
                "Find safe, verified storage facilities. Protect every payment with secure escrow. AI-powered monitoring keeps your grain safe 24/7.",
                "ಸುರಕ್ಷಿತ, ಪರಿಶೀಲಿಸಿದ ಸಂಗ್ರಹಣಾ ಸೌಲಭ್ಯಗಳನ್ನು ಹುಡುಕಿ. ಸುರಕ್ಷಿತ ಎಸ್ಕ್ರೋದೊಂದಿಗೆ ಪ್ರತಿ ಪಾವತಿಯನ್ನು ರಕ್ಷಿಸಿ."
              )}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button 
                size="lg" 
                onClick={() => {
                  setGetStartedOpen(true);
                }}
                className="h-14 gap-2 rounded-full bg-[#9CAF88] px-8 text-lg text-[#1C2216] shadow-[var(--shadow-elevated)] transition-all hover:scale-105 hover:bg-[#87A96B]"
              >
                {t("Get Started", "ಪ್ರಾರಂಭಿಸಿ")}
                <ArrowRight className="h-5 w-5" />
              </Button>
              <a
                href="#about"
                className="inline-flex h-14 items-center gap-2 rounded-full border border-[#9CAF88]/40 px-8 text-lg font-medium text-[#6B8A5E] transition-all hover:bg-[#9CAF88]/10"
              >
                {t("How it Works", "ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ")}
              </a>
            </div>
          </div>

          <div className="relative z-10 flex flex-col gap-4">
            <button 
              onClick={() => setEscrowOpen(true)}
              className="flex items-start gap-4 rounded-2xl border border-[#9CAF88]/20 bg-white/60 p-6 text-left shadow-[var(--shadow-soft)] backdrop-blur transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-[var(--shadow-elevated)]"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-success/15 text-success">
                <Lock className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#1C2216]">{t("Secure Escrow", "ಸುರಕ್ಷಿತ ಎಸ್ಕ್ರೋ")}</h3>
                <p className="mt-1 text-sm text-[#5A6B52]">
                  {t("Payments are locked safely.", "ಪಾವತಿಗಳನ್ನು ಸುರಕ್ಷಿತವಾಗಿ ಲಾಕ್ ಮಾಡಲಾಗಿದೆ.")}
                </p>
              </div>
            </button>
            <button 
              onClick={() => setClimateOpen(true)}
              className="flex items-start gap-4 rounded-2xl border border-[#9CAF88]/20 bg-white/60 p-6 text-left shadow-[var(--shadow-soft)] backdrop-blur transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-[var(--shadow-elevated)]"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                <ThermometerSnowflake className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#1C2216]">{t("Climate Control", "ಹವಾಮಾನ ನಿಯಂತ್ರಣ")}</h3>
                <p className="mt-1 text-sm text-[#5A6B52]">
                  {t("Real-time temperature monitoring.", "ನೈಜ-ಸಮಯದ ತಾಪಮಾನ ಮೇಲ್ವಿಚಾರಣೆ.")}
                </p>
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* Trust Modals */}
      <Dialog open={escrowOpen} onOpenChange={setEscrowOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-success" /> {t("Secure Escrow", "ಸುರಕ್ಷಿತ ಎಸ್ಕ್ರೋ")}
            </DialogTitle>
            <DialogDescription className="pt-4 text-base">
              {t("Your money is held in a secure RBI-regulated nodal account. It is only released to the storage owner once you confirm your grain has been safely deposited.", "ನಿಮ್ಮ ಹಣವನ್ನು ಸುರಕ್ಷಿತ ಖಾತೆಯಲ್ಲಿ ಇಡಲಾಗುತ್ತದೆ. ಧಾನ್ಯಗಳನ್ನು ಸುರಕ್ಷಿತವಾಗಿ ಜಮೆ ಮಾಡಿದ ನಂತರವೇ ಮಾಲೀಕರಿಗೆ ಬಿಡುಗಡೆ ಮಾಡಲಾಗುತ್ತದೆ.")}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <Dialog open={climateOpen} onOpenChange={setClimateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ThermometerSnowflake className="h-5 w-5 text-primary" /> {t("Climate Control", "ಹವಾಮಾನ ನಿಯಂತ್ರಣ")}
            </DialogTitle>
            <DialogDescription className="pt-4 text-base">
              {t("Premium storage facilities use IoT sensors to monitor temperature and humidity 24/7. You receive instant alerts if conditions drop below optimal levels.", "ಪ್ರೀಮಿಯಂ ಸೌಲಭ್ಯಗಳು ತಾಪಮಾನವನ್ನು ನಿಯಂತ್ರಿಸುತ್ತವೆ. ವ್ಯತ್ಯಾಸವಾದರೆ ನಿಮಗೆ ತಕ್ಷಣ ಎಚ್ಚರಿಕೆ ಬರುತ್ತದೆ.")}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <Dialog open={getStartedOpen} onOpenChange={setGetStartedOpen}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">{t("Choose Your Role", "ನಿಮ್ಮ ಪಾತ್ರವನ್ನು ಆರಿಸಿ")}</DialogTitle>
            <DialogDescription>
              {t("Are you looking for storage, or do you own a facility?", "ನೀವು ಸಂಗ್ರಹಣೆಗಾಗಿ ಹುಡುಕುತ್ತಿದ್ದೀರಾ ಅಥವಾ ನೀವು ಸೌಲಭ್ಯವನ್ನು ಹೊಂದಿದ್ದೀರಾ?")}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4 sm:grid-cols-2">
            <button
              onClick={() => {
                setGetStartedOpen(false);
                navigate({ to: "/farmer-storage" });
              }}
              className="group flex flex-col items-center justify-center rounded-2xl border-2 border-border bg-card p-6 transition-all hover:border-primary hover:bg-primary-soft/30"
            >
              <h3 className="text-2xl font-black text-foreground">{t("Farmer", "ರೈತ")}</h3>
              <div className="mt-3 flex h-16 w-16 items-center justify-center rounded-full bg-primary/20 text-primary transition-transform group-hover:scale-110">
                <Sprout className="h-8 w-8" />
              </div>
              <p className="mt-4 text-base font-semibold">{t("I want to Store Grain", "ನಾನು ಧಾನ್ಯ ಸಂಗ್ರಹಿಸಲು ಬಯಸುತ್ತೇನೆ")}</p>
              <p className="mt-1 text-center text-sm text-muted-foreground">
                {t("Sign up & choose crop", "ಸೈನ್ ಅಪ್ ಮಾಡಿ ಮತ್ತು ಬೆಳೆ ಆರಿಸಿ")}
              </p>
            </button>
            <button
              onClick={() => {
                setGetStartedOpen(false);
                navigate({ to: "/owner-facility" });
              }}
              className="group flex flex-col items-center justify-center rounded-2xl border-2 border-border bg-card p-6 transition-all hover:border-primary hover:bg-primary-soft/30"
            >
              <h3 className="text-2xl font-black text-foreground">{t("Storage Owner", "ಸಂಗ್ರಹಣಾ ಮಾಲೀಕ")}</h3>
              <div className="mt-3 flex h-16 w-16 items-center justify-center rounded-full bg-primary/20 text-primary transition-transform group-hover:scale-110">
                <Warehouse className="h-8 w-8" />
              </div>
              <p className="mt-4 text-base font-semibold">{t("I have Storage Space", "ನನ್ನ ಬಳಿ ಸಂಗ್ರಹಣಾ ಸ್ಥಳವಿದೆ")}</p>
              <p className="mt-1 text-center text-sm text-muted-foreground">
                {t("Sign up as owner", "ಮಾಲೀಕರಾಗಿ ಸೈನ್ ಅಪ್")}
              </p>
            </button>
          </div>
        </DialogContent>
      </Dialog>


      {/* About Section */}
      <section id="about" className="relative mx-auto max-w-4xl px-4 py-24 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black md:text-4xl text-foreground tracking-tight">{t("Our Mission", "ನಮ್ಮ ಗುರಿ")}</h2>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            {t(
              "GrainGuard is built to empower Indian agriculture by eliminating harvest wastage and providing transparent, secure storage solutions. We bridge the trust gap between farmers and facility owners using real-time IoT monitoring and RBI-regulated escrow payments.",
              "ಸುಗ್ಗಿಯ ವ್ಯರ್ಥವನ್ನು ತೆಗೆದುಹಾಕುವ ಮೂಲಕ ಮತ್ತು ಪಾರದರ್ಶಕ, ಸುರಕ್ಷಿತ ಸಂಗ್ರಹಣಾ ಪರಿಹಾರಗಳನ್ನು ಒದಗಿಸುವ ಮೂಲಕ ಭಾರತೀಯ ಕೃಷಿಯನ್ನು ಸಬಲೀಕರಣಗೊಳಿಸಲು GrainGuard ಅನ್ನು ನಿರ್ಮಿಸಲಾಗಿದೆ."
            )}
          </p>
        </div>

        <div className="mb-16 text-center">
          <h2 className="text-3xl font-black md:text-4xl">{t("The GrainGuard Journey", "ಗ್ರೇನ್‌ಗಾರ್ಡ್ ಪ್ರಯಾಣ")}</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {t("From selection to payout, we've got you covered.", "ಆಯ್ಕೆಯಿಂದ ಪಾವತಿಯವರೆಗೆ, ನಾವು ನಿಮ್ಮೊಂದಿಗಿದ್ದೇವೆ.")}
          </p>
        </div>
        
        <div className="relative mb-24">
          <div className="absolute left-8 top-0 bottom-0 w-1 bg-border md:left-1/2 md:-translate-x-1/2" />
          
          {[
            {
              step: 1,
              title: t("Farmer: Sign Up & Choose Crop", "ರೈತ: ಸೈನ್ ಅಪ್ ಮಾಡಿ ಮತ್ತು ಬೆಳೆ ಆರಿಸಿ"),
              desc: t("Create an account, select your crop, and specify quantity.", "ಖಾತೆ ರಚಿಸಿ, ಬೆಳೆ ಆಯ್ಕೆಮಾಡಿ ಮತ್ತು ಪ್ರಮಾಣವನ್ನು ನಿರ್ದಿಷ್ಟಪಡಿಸಿ."),
              icon: Sprout,
            },
            {
              step: 2,
              title: t("Owner: Sign Up & Add Facility", "ಮಾಲೀಕ: ಸೈನ್ ಅಪ್ ಮಾಡಿ ಮತ್ತು ಸೌಲಭ್ಯವನ್ನು ಸೇರಿಸಿ"),
              desc: t("Owners register and list their warehouses with pricing and climate details.", "ಮಾಲೀಕರು ನೋಂದಾಯಿಸಿಕೊಳ್ಳುತ್ತಾರೆ ಮತ್ತು ಗೋದಾಮುಗಳನ್ನು ಪಟ್ಟಿ ಮಾಡುತ್ತಾರೆ."),
              icon: Warehouse,
            },
            {
              step: 3,
              title: t("Farmer: Find Storage & Sign Contract", "ರೈತ: ಸಂಗ್ರಹಣೆಯನ್ನು ಹುಡುಕಿ ಮತ್ತು ಒಪ್ಪಂದಕ್ಕೆ ಸಹಿ ಮಾಡಿ"),
              desc: t("Farmers find the perfect storage and digitally sign the smart contract.", "ರೈತರು ಪರಿಪೂರ್ಣ ಸಂಗ್ರಹಣೆಯನ್ನು ಕಂಡುಕೊಳ್ಳುತ್ತಾರೆ ಮತ್ತು ಸ್ಮಾರ್ಟ್ ಒಪ್ಪಂದಕ್ಕೆ ಸಹಿ ಹಾಕುತ್ತಾರೆ."),
              icon: ShieldCheck,
            },
            {
              step: 4,
              title: t("Both: Pay, Track & Earn", "ಇಬ್ಬರೂ: ಪಾವತಿಸಿ, ಟ್ರ್ಯಾಕ್ ಮಾಡಿ ಮತ್ತು ಗಳಿಸಿ"),
              desc: t("Farmer pays via escrow. Owner receives booking. Both track inventory.", "ರೈತ ಎಸ್ಕ್ರೋ ಮೂಲಕ ಪಾವತಿಸುತ್ತಾನೆ. ಮಾಲೀಕರು ಬುಕಿಂಗ್ ಪಡೆಯುತ್ತಾರೆ."),
              icon: TrendingUp,
            },
          ].map((item, i) => (
            <div key={item.step} className={`relative mb-12 flex w-full items-center ${i % 2 === 0 ? "md:justify-start" : "md:justify-end"}`}>
              <div className="tree-dot animate-pulse-glow absolute left-8 h-8 w-8 -translate-x-1/2 rounded-full border-4 border-background bg-primary md:left-1/2" />
              <div className={`tree-node ml-16 w-full cursor-default rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)] md:ml-0 md:w-[45%] ${i % 2 === 0 ? "md:pr-8" : "md:pl-8"}`}>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-bold">{item.title}</h3>
                </div>
                <p className="mt-3 text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20">
          <h2 className="text-center text-2xl font-bold mb-8">{t("What People Are Saying", "ಜನರು ಏನು ಹೇಳುತ್ತಿದ್ದಾರೆ")}</h2>
          
          <div className="relative rounded-3xl bg-primary/5 border border-primary/20 p-8 md:p-12 shadow-[var(--shadow-elevated)] overflow-hidden">
            <Quote className="absolute top-6 left-6 h-16 w-16 text-primary/10" />
            
            <div className="relative z-10 flex flex-col items-center text-center transition-all duration-500 ease-in-out">
              <div className="flex gap-1 mb-6">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="h-5 w-5 fill-warning text-warning" />
                ))}
              </div>
              
              <p className="text-xl md:text-2xl font-medium text-foreground italic mb-8 max-w-2xl">
                "{reviews[currentReview].text}"
              </p>
              
              <div>
                <h4 className="font-bold text-lg">{reviews[currentReview].name}</h4>
                <p className="text-sm text-muted-foreground">{reviews[currentReview].role}</p>
              </div>
            </div>

            <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentReview(i)}
                  className={`h-2 w-2 rounded-full transition-all ${
                    i === currentReview ? "w-6 bg-primary" : "bg-primary/30"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
            
            <button 
              onClick={() => setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length)}
              className="absolute left-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-background border border-border shadow-sm hover:bg-muted"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button 
              onClick={() => setCurrentReview((prev) => (prev + 1) % reviews.length)}
              className="absolute right-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-background border border-border shadow-sm hover:bg-muted"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="bg-muted/30 py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-black md:text-4xl">{t("Transparent Pricing", "ಪಾರದರ್ಶಕ ಬೆಲೆ")}</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              {t("Clear pricing for Farmers and Owners. No hidden fees.", "ರೈತರು ಮತ್ತು ಮಾಲೀಕರಿಗೆ ಸ್ಪಷ್ಟ ಬೆಲೆ. ಯಾವುದೇ ಗುಪ್ತ ಶುಲ್ಕಗಳಿಲ್ಲ.")}
            </p>
          </div>

          {/* Farmer Pricing */}
          <div className="mb-12">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Sprout className="h-5 w-5 text-primary" />
              {t("For Farmers", "ರೈತರಿಗೆ")}
            </h3>
            <div className="rounded-3xl border border-border bg-card p-8 shadow-[var(--shadow-soft)]">
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-4xl font-black text-primary">{t("Free", "ಉಚಿತ")}</span>
                <span className="text-lg text-muted-foreground">{t("to browse & search", "ಹುಡುಕಲು ಮತ್ತು ಬ್ರೌಸ್ ಮಾಡಲು")}</span>
              </div>
              <p className="text-muted-foreground mb-6">
                {t("Only pay when you book storage. Fees are calculated based on duration, grain type, and weight — set by each facility owner.", "ಸಂಗ್ರಹಣೆ ಬುಕ್ ಮಾಡಿದಾಗ ಮಾತ್ರ ಪಾವತಿಸಿ. ಅವಧಿ, ಧಾನ್ಯದ ಪ್ರಕಾರ ಮತ್ತು ತೂಕದ ಆಧಾರದ ಮೇಲೆ ಶುಲ್ಕಗಳನ್ನು ಲೆಕ್ಕಹಾಕಲಾಗುತ್ತದೆ.")}
              </p>
              <div className="flex flex-wrap gap-3 mb-6">
                {["Free Search", "Free Market Insights", "Secure Transactions"].map((f) => (
                  <span key={f} className="rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">{f}</span>
                ))}
              </div>
              <div className="rounded-xl bg-success/10 border border-success/20 p-4">
                <div className="flex items-center gap-2 mb-2 font-bold text-success">
                  <ShieldCheck className="h-5 w-5" />
                  {t("Secure Escrow", "ಸುರಕ್ಷಿತ ಎಸ್ಕ್ರೋ")}
                </div>
                <p className="text-sm text-foreground/80">
                  {t("Payments are held in a secure escrow account and only released to the owner after you confirm Check-Out. 100% money-back protection if the facility fails standards.", "ಪಾವತಿಗಳನ್ನು ಸುರಕ್ಷಿತ ಎಸ್ಕ್ರೋ ಖಾತೆಯಲ್ಲಿ ಇರಿಸಲಾಗುತ್ತದೆ ಮತ್ತು ನೀವು ಚೆಕ್-ಔಟ್ ದೃಢಪಡಿಸಿದ ನಂತರವೇ ಮಾಲೀಕರಿಗೆ ಬಿಡುಗಡೆ ಮಾಡಲಾಗುತ್ತದೆ.")}
                </p>
              </div>
            </div>
          </div>

          {/* Owner Pricing */}
          <div>
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Warehouse className="h-5 w-5 text-primary" />
              {t("For Owners", "ಮಾಲೀಕರಿಗೆ")}
            </h3>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-3xl border border-border bg-card p-8 shadow-[var(--shadow-soft)]">
                <h4 className="text-2xl font-bold">{t("Basic", "ಮೂಲ")}</h4>
                <div className="mt-3 flex items-baseline text-4xl font-black">
                  ₹159 <span className="ml-2 text-lg font-medium text-muted-foreground">{t("per listing", "ಪ್ರತಿ ಪಟ್ಟಿ")}</span>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{t("Pay a fixed listing fee for every new facility added.", "ಸೇರಿಸಲಾದ ಪ್ರತಿ ಸೌಲಭ್ಯಕ್ಕೂ ನಿಗದಿತ ಪಟ್ಟಿ ಶುಲ್ಕ.")}</p>
                <ul className="mt-6 space-y-3">
                  {["Secure Escrow", "Verified Listings", "Standard Support"].map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-primary" /> {f}
                    </li>
                  ))}
                </ul>
                <Button size="lg" variant="outline" className="mt-8 w-full rounded-xl">
                  {t("Start Free", "ಉಚಿತವಾಗಿ ಪ್ರಾರಂಭಿಸಿ")}
                </Button>
              </div>

              <div className="relative rounded-3xl border-2 border-primary bg-primary/5 p-8 shadow-[var(--shadow-elevated)]">
                <div className="absolute -top-4 right-8 rounded-full bg-primary px-4 py-1 text-sm font-bold text-primary-foreground">
                  {t("Recommended", "ಶಿಫಾರಸು")}
                </div>
                <h4 className="text-2xl font-bold text-primary">{t("Prime", "ಪ್ರೀಮಿಯಂ")}</h4>
                <div className="mt-3 flex items-baseline text-4xl font-black">
                  ₹999 <span className="ml-2 text-lg font-medium text-muted-foreground">{t("/ month", "/ ತಿಂಗಳು")}</span>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{t("Unlimited listings. Zero commission. Full Market Insights.", "ಅನಿಯಮಿತ ಪಟ್ಟಿಗಳು. ಶೂನ್ಯ ಕಮಿಷನ್. ಸಂಪೂರ್ಣ ಮಾರುಕಟ್ಟೆ ಒಳನೋಟ.")}</p>
                <ul className="mt-6 space-y-3">
                  {["0% Commission", "Market Insights Access", "Priority Search Ranking", "24/7 Phone Support"].map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-primary" /> {f}
                    </li>
                  ))}
                </ul>
                <Button size="lg" className="mt-8 w-full rounded-xl">
                  {t("Go Prime", "ಪ್ರೀಮಿಯಂ ಪಡೆಯಿರಿ")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Us */}
      <section id="contact" className="py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-black md:text-4xl">{t("Contact Us", "ಸಂಪರ್ಕಿಸಿ")}</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              {t("Have questions? We're here to help.", "ಪ್ರಶ್ನೆಗಳಿವೆಯೇ? ಸಹಾಯ ಮಾಡಲು ನಾವಿದ್ದೇವೆ.")}
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-2">{t("Get in Touch", "ಸಂಪರ್ಕದಲ್ಲಿರಿ")}</h3>
                <p className="text-muted-foreground">
                  support@grainguard.in<br />
                  +91 80000 00000
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">{t("Location", "ಸ್ಥಳ")}</h3>
                <p className="text-muted-foreground">
                  GrainGuard Headquarters<br />
                  Bengaluru, Karnataka, India
                </p>
              </div>
            </div>
            
            <form className="space-y-4 rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="text-sm font-medium">{t("Name", "ಹೆಸರು")}</label>
                <input type="text" className="w-full mt-1.5 h-10 rounded-md border border-input bg-background px-3 text-sm" placeholder={t("Your name", "ನಿಮ್ಮ ಹೆಸರು")} />
              </div>
              <div>
                <label className="text-sm font-medium">{t("Phone", "ಫೋನ್")}</label>
                <input type="tel" className="w-full mt-1.5 h-10 rounded-md border border-input bg-background px-3 text-sm" placeholder={t("Your phone number", "ನಿಮ್ಮ ಫೋನ್ ಸಂಖ್ಯೆ")} />
              </div>
              <div>
                <label className="text-sm font-medium">{t("Query", "ಪ್ರಶ್ನೆ")}</label>
                <textarea className="w-full mt-1.5 rounded-md border border-input bg-background px-3 py-2 text-sm" rows={4} placeholder={t("How can we help?", "ನಾವು ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?")} />
              </div>
              <Button type="submit" className="w-full">{t("Send Message", "ಸಂದೇಶ ಕಳುಹಿಸಿ")}</Button>
            </form>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
