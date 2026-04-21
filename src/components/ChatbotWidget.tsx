import { useState } from "react";
import { Bot, X, Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useApp } from "@/lib/app-context";
import { cn } from "@/lib/utils";

export function ChatbotWidget() {
  const { t } = useApp();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  return (
    <>
      {/* Floating button */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="Open chatbot"
        className={cn(
          "fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[var(--shadow-elevated)] transition-all hover:scale-105 active:scale-95",
          open && "rotate-90",
        )}
      >
        {open ? <X className="h-6 w-6" /> : <Bot className="h-6 w-6" />}
        {!open && (
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-success" />
          </span>
        )}
      </button>

      {/* Panel */}
      {open && (
        <div className="fixed bottom-24 right-5 z-50 flex w-[calc(100vw-2.5rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-elevated)] sm:w-96">
          <div className="flex items-center gap-3 border-b border-border bg-primary-soft px-4 py-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <div className="text-sm font-semibold">
                {t("GrainGuard Assistant", "GrainGuard ಸಹಾಯಕ")}
              </div>
              <div className="text-xs text-muted-foreground">
                {t("Online · Ready to help", "ಆನ್‌ಲೈನ್ · ಸಹಾಯಕ್ಕೆ ಸಿದ್ಧ")}
              </div>
            </div>
          </div>

          <div
            className="flex-1 space-y-3 overflow-y-auto px-4 py-4 text-sm"
            style={{ maxHeight: 320 }}
          >
            <div className="flex items-start gap-2">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-soft">
                <Bot className="h-3.5 w-3.5 text-primary" />
              </div>
              <div className="rounded-2xl rounded-tl-sm bg-muted px-3 py-2">
                {t(
                  "Namaste! I can help with finding storage, payments, or your bookings. What do you need?",
                  "ನಮಸ್ತೆ! ಸಂಗ್ರಹಣೆ, ಪಾವತಿ ಅಥವಾ ಬುಕಿಂಗ್ ಬಗ್ಗೆ ಸಹಾಯ ಮಾಡಬಲ್ಲೆ.",
                )}
              </div>
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
              {[
                t("How does escrow work?", "ಎಸ್ಕ್ರೋ ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ?"),
                t("Find storage near me", "ಸಮೀಪದ ಸಂಗ್ರಹಣೆ"),
                t("Payment failed", "ಪಾವತಿ ವಿಫಲ"),
              ].map((s) => (
                <button
                  key={s}
                  type="button"
                  className="rounded-full border border-border bg-background px-3 py-1 text-xs text-foreground hover:border-primary hover:bg-primary-soft"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setMessage("");
            }}
            className="flex items-center gap-2 border-t border-border bg-background p-3"
          >
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={t("Type a message...", "ಸಂದೇಶ ಬರೆಯಿರಿ...")}
              className="h-10"
            />
            <Button type="submit" size="icon" disabled={!message.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      )}
    </>
  );
}
