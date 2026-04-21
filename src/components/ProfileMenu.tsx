import { Link, useNavigate } from "@tanstack/react-router";
import {
  User as UserIcon,
  FileText,
  Settings,
  LogOut,
  BadgeCheck,
  Phone,
  Mail,
} from "lucide-react";
import { useApp } from "@/lib/app-context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ProfileMenu({ onItemClick }: { onItemClick?: () => void }) {
  const { user, logout, t } = useApp();
  const navigate = useNavigate();

  if (!user) return null;

  const initials = (user.name || user.phone || "U")
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const handleLogout = () => {
    logout();
    onItemClick?.();
    navigate({ to: "/" });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label="Profile menu"
          className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary/30 bg-primary-soft text-sm font-bold text-foreground transition-all hover:border-primary hover:shadow-[var(--shadow-soft)]"
        >
          {user.photo ? (
            <img src={user.photo} alt="" className="h-full w-full rounded-full object-cover" />
          ) : (
            initials
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-72">
        <div className="flex items-center gap-3 px-2 py-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-soft text-base font-bold text-foreground">
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-semibold">
              {user.name || t("Add your name", "ನಿಮ್ಮ ಹೆಸರು ಸೇರಿಸಿ")}
            </div>
            <div className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
              <BadgeCheck className="h-3 w-3 text-primary" />
              <span className="font-mono">{user.uniqueId}</span>
            </div>
          </div>
        </div>
        <DropdownMenuSeparator />
        <div className="px-2 py-1.5 text-xs text-muted-foreground space-y-1">
          <div className="flex items-center gap-1.5">
            <Phone className="h-3 w-3" /> {user.phone || "—"}
          </div>
          <div className="flex items-center gap-1.5">
            <Mail className="h-3 w-3" /> {user.email || t("No email", "ಇಮೇಲ್ ಇಲ್ಲ")}
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuLabel className="text-xs uppercase tracking-wide text-muted-foreground">
          {t("Account", "ಖಾತೆ")}
        </DropdownMenuLabel>
        <DropdownMenuItem asChild onClick={onItemClick}>
          <Link to="/orders" className="cursor-pointer">
            <FileText className="mr-2 h-4 w-4" />
            {t("Orders & Invoices", "ಆದೇಶಗಳು ಮತ್ತು ಸರಕುಪಟ್ಟಿ")}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild onClick={onItemClick}>
          <Link to="/settings" className="cursor-pointer">
            <Settings className="mr-2 h-4 w-4" />
            {t("Settings", "ಸೆಟ್ಟಿಂಗ್‌ಗಳು")}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild onClick={onItemClick}>
          <Link to="/settings" className="cursor-pointer">
            <UserIcon className="mr-2 h-4 w-4" />
            {t("Profile", "ಪ್ರೊಫೈಲ್")}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleLogout}
          className="cursor-pointer text-destructive focus:text-destructive"
        >
          <LogOut className="mr-2 h-4 w-4" />
          {t("Logout", "ಲಾಗ್‌ಔಟ್")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
