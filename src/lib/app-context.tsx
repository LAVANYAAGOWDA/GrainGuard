import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

type Theme = "light" | "dark";
type Language = "en" | "kn";
type Role = "farmer" | "owner" | null;

interface Booking {
  storageName: string;
  location: string;
  crop: string;
  quantity: string;
  duration: number;
  daysRemaining: number;
}

interface User {
  name: string;
  phone: string;
  email: string;
  photo: string | null;
  uniqueId: string;
}

interface AppState {
  theme: Theme;
  toggleTheme: () => void;
  language: Language;
  setLanguage: (l: Language) => void;
  t: (en: string, kn: string) => string;
  isAuthed: boolean;
  login: (data: { phone: string; role: Exclude<Role, null> }) => void;
  logout: () => void;
  role: Role;
  user: User | null;
  updateUser: (patch: Partial<User>) => void;
  activeBooking: Booking | null;
  setActiveBooking: (b: Booking | null) => void;
}

const AppContext = createContext<AppState | null>(null);

function generateUniqueId(prefix: string) {
  // Auto-generated UI placeholder ID — not from a backend
  const rand = Math.random().toString(36).slice(2, 8).toUpperCase();
  const stamp = Date.now().toString(36).slice(-4).toUpperCase();
  return `${prefix}-${stamp}${rand}`;
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [language, setLanguage] = useState<Language>("en");
  const [isAuthed, setIsAuthed] = useState(false);
  const [role, setRole] = useState<Role>(null);
  const [user, setUser] = useState<User | null>(null);
  const [activeBooking, setActiveBooking] = useState<Booking | null>(null);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const value = useMemo<AppState>(
    () => ({
      theme,
      toggleTheme: () => setTheme((t) => (t === "light" ? "dark" : "light")),
      language,
      setLanguage,
      t: (en, kn) => (language === "en" ? en : kn),
      isAuthed,
      login: ({ phone, role: r }) => {
        setIsAuthed(true);
        setRole(r);
        setUser({
          name: "",
          phone,
          email: "",
          photo: null,
          uniqueId: generateUniqueId(r === "farmer" ? "FRM" : "OWN"),
        });
      },
      logout: () => {
        setIsAuthed(false);
        setRole(null);
        setUser(null);
        setActiveBooking(null);
      },
      role,
      user,
      updateUser: (patch) => setUser((u) => (u ? { ...u, ...patch } : u)),
      activeBooking,
      setActiveBooking,
    }),
    [theme, language, isAuthed, role, user, activeBooking],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}
