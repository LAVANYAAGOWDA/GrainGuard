import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  Wheat,
  Moon,
  Sun,
  Languages,
  LogIn,
  Menu,
  X,
  TrendingUp,
  LifeBuoy,
  Home,
  Info,
} from "lucide-react";
import { useState } from "react";
import { useApp } from "@/lib/app-context";
import { Button } from "@/components/ui/button";
import { ProfileMenu } from "./ProfileMenu";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { theme, toggleTheme, language, setLanguage, t, isAuthed } = useApp();
  const navigate = useNavigate();
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);

  const links = [
    { to: "/", label: t("Home", "ಮುಖಪುಟ"), icon: Home },
    { to: "/about", label: t("About", "ನಮ್ಮ ಬಗ್ಗೆ"), icon: Info },
    { to: "/market", label: t("Market Insights", "ಮಾರುಕಟ್ಟೆ ಒಳನೋಟ"), icon: TrendingUp },
    { to: "/help", label: t("Help & Support", "ಸಹಾಯ"), icon: LifeBuoy },
  ] as const;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-[var(--shadow-soft)]">
            <Wheat className="h-5 w-5" />
          </span>
          <span className="font-display text-xl font-bold text-foreground">GrainGuard</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((l) => {
            const active = path === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-primary-soft text-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLanguage(language === "en" ? "kn" : "en")}
            className="gap-1.5"
            aria-label="Toggle language"
          >
            <Languages className="h-4 w-4" />
            <span className="text-xs font-semibold">{language === "en" ? "EN" : "ಕನ್"}</span>
          </Button>
          <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </Button>
          {isAuthed ? (
            <ProfileMenu />
          ) : (
            <Button onClick={() => navigate({ to: "/login" })} size="sm" className="gap-1.5">
              <LogIn className="h-4 w-4" /> {t("Login", "ಲಾಗಿನ್")}
            </Button>
          )}
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          {isAuthed && <ProfileMenu />}
          <button
            className="rounded-md p-2 text-foreground"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="flex items-center gap-2.5 rounded-md px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted"
              >
                <l.icon className="h-4 w-4 text-primary" />
                {l.label}
              </Link>
            ))}
            <div className="mt-2 flex items-center gap-2 border-t border-border pt-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setLanguage(language === "en" ? "kn" : "en")}
                className="flex-1 gap-1.5"
              >
                <Languages className="h-4 w-4" />
                {language === "en" ? "English" : "ಕನ್ನಡ"}
              </Button>
              <Button variant="outline" size="sm" onClick={toggleTheme} className="gap-1.5">
                {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              </Button>
            </div>
            {!isAuthed && (
              <Button
                onClick={() => {
                  setOpen(false);
                  navigate({ to: "/login" });
                }}
                size="sm"
                className="mt-2 gap-1.5"
              >
                <LogIn className="h-4 w-4" /> {t("Login", "ಲಾಗಿನ್")}
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
