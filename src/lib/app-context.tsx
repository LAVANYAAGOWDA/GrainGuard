import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

type Theme = "light" | "dark";
type Language = "en" | "kn";
type Role = "farmer" | "owner" | null;

export interface Booking {
  id: string;
  storageName: string;
  location: string;
  crop: string;
  quantity: string;
  duration: number;
  daysRemaining: number;
}

export interface OwnerStorage {
  id: string;
  name: string;
  type: string;
  capacity: number;
  pricePerUnit: number;
  crops: string[];
  location: string;
  address: string;
}

interface User {
  name: string;
  phone: string;
  email: string;
  photo: string | null;
  uniqueId: string;
  membership?: "Basic" | "Prime";
}

interface AppState {
  theme: Theme;
  toggleTheme: () => void;
  language: Language;
  setLanguage: (l: Language) => void;
  t: (en: string, kn: string) => string;
  isAuthed: boolean;
  login: (data: { phone: string; role: Exclude<Role, null>; name?: string; membership?: "Basic" | "Prime" }) => void;
  logout: () => void;
  role: Role;
  preAuthRole: Role;
  setPreAuthRole: (r: Role) => void;
  selectedPlan: "Basic" | "Prime";
  setSelectedPlan: (p: "Basic" | "Prime") => void;
  user: User | null;
  updateUser: (patch: Partial<User>) => void;
  /** @deprecated use activeBookings array */
  activeBooking: Booking | null;
  /** @deprecated use addBooking / removeBooking */
  setActiveBooking: (b: Booking | null) => void;
  activeBookings: Booking[];
  addBooking: (b: Omit<Booking, "id">) => void;
  updateBooking: (id: string, patch: Partial<Booking>) => void;
  removeBooking: (id: string) => void;
  td: (str: string | number) => string;
  isKycVerified: boolean;
  setKycVerified: (v: boolean) => void;
  ownerStorages: OwnerStorage[];
  addOwnerStorage: (s: Omit<OwnerStorage, "id">) => void;
}

const AppContext = createContext<AppState | null>(null);

function generateUniqueId(prefix: string) {
  // Auto-generate alphanumeric IDs: FA-XXXX for Farmers and OW-XXXX for Owners.
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `${prefix}-${rand}`;
}

function generateBookingId() {
  return `BK-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
}

export function toKannadaString(str: string): string {
  const numMap: Record<string, string> = {
    "0": "೦", "1": "೧", "2": "೨", "3": "೩", "4": "೪",
    "5": "೫", "6": "೬", "7": "೭", "8": "೮", "9": "೯"
  };
  const locationMap: Record<string, string> = {
    Mysuru: "ಮೈಸೂರು",
    Hassan: "ಹಾಸನ",
    Mandya: "ಮಂಡ್ಯ",
    Tumakuru: "ತುಮಕೂರು",
    Belagavi: "ಬೆಳಗಾವಿ",
    Davangere: "ದಾವಣಗೆರೆ",
    Raichur: "ರಾಯಚೂರು",
  };

  let result = str.replace(/[0-9]/g, (match) => numMap[match]);
  for (const [en, kn] of Object.entries(locationMap)) {
    const regex = new RegExp(`\\b${en}\\b`, "gi");
    result = result.replace(regex, kn);
  }
  return result;
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [language, setLanguage] = useState<Language>("en");
  const [isAuthed, setIsAuthed] = useState(false);
  const [role, setRole] = useState<Role>(null);
  const [preAuthRole, setPreAuthRole] = useState<Role>(null);
  const [selectedPlan, setSelectedPlan] = useState<"Basic" | "Prime">("Basic");
  const [user, setUser] = useState<User | null>(null);
  const [activeBookings, setActiveBookings] = useState<Booking[]>([]);
  const [isKycVerified, setKycVerified] = useState(false);
  const [ownerStorages, setOwnerStorages] = useState<OwnerStorage[]>([]);

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
      t: (en, kn) => (language === "en" ? en : toKannadaString(kn)),
      td: (str) => {
        const s = String(str);
        return language === "en" ? s : toKannadaString(s);
      },
      isAuthed,
      login: ({ phone, role: r, name, membership }) => {
        setIsAuthed(true);
        setRole(r);
        setUser({
          name: name || "",
          phone,
          email: "",
          photo: null,
          uniqueId: generateUniqueId(r === "farmer" ? "FA" : "OW"),
          membership: r === "owner" ? (membership || "Basic") : undefined,
        });
      },
      logout: () => {
        setIsAuthed(false);
        setRole(null);
        setUser(null);
        setActiveBookings([]);
        setOwnerStorages([]);
        setKycVerified(false);
      },
      role,
      preAuthRole,
      setPreAuthRole,
      selectedPlan,
      setSelectedPlan,
      user,
      updateUser: (patch) => setUser((u) => (u ? { ...u, ...patch } : u)),
      // Backward compat: activeBooking returns first booking or null
      activeBooking: activeBookings.length > 0 ? activeBookings[0] : null,
      setActiveBooking: (b) => {
        if (b) {
          setActiveBookings([{ ...b, id: b.id || generateBookingId() }]);
        } else {
          setActiveBookings([]);
        }
      },
      activeBookings,
      addBooking: (b) => {
        setActiveBookings((prev) => [...prev, { ...b, id: generateBookingId() }]);
      },
      updateBooking: (id, patch) => {
        setActiveBookings((prev) => prev.map((b) => (b.id === id ? { ...b, ...patch } : b)));
      },
      removeBooking: (id) => {
        setActiveBookings((prev) => prev.filter((b) => b.id !== id));
      },
      isKycVerified,
      setKycVerified,
      ownerStorages,
      addOwnerStorage: (s) => {
        setOwnerStorages((prev) => [...prev, { ...s, id: `ST-${Math.random().toString(36).slice(2, 8).toUpperCase()}` }]);
      },
    }),
    [theme, language, isAuthed, role, preAuthRole, selectedPlan, user, activeBookings, isKycVerified, ownerStorages],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}
