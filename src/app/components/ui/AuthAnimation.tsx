// components/auth/AuthAnimation.tsx
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface AuthAnimationProps {
  status: "loading" | "done" | "error";
  variant?: "login" | "logout";
  message?: string;
  onDone?: () => void;
}

export const AuthAnimation = ({ status, variant = "login", message, onDone }: AuthAnimationProps) => {
  const [showIcon, setShowIcon] = useState(false);

  useEffect(() => {
    if (status === "done" || status === "error") {
      const t1 = setTimeout(() => setShowIcon(true), 150);
      const t2 = setTimeout(() => onDone?.(), status === "done" ? 1000 : 1800);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    }
    setShowIcon(false);
  }, [status, onDone]);

  const content = (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-blue-950/40 backdrop-blur-sm animate-[fadeIn_0.15s_ease]">
      <div className="w-[min(300px,calc(100vw-32px))] rounded-2xl bg-white p-8 text-center shadow-2xl flex flex-col items-center gap-4">
        <div className="relative w-16 h-16 flex items-center justify-center">
          <div
            className={`absolute inset-0 rounded-full border-4 border-blue-100 ${
              variant === "logout" ? "border-t-orange-500" : "border-t-blue-600"
            } animate-spin transition-opacity duration-200 ${
              status === "loading" ? "opacity-100" : "opacity-0"
            }`}
          />

          {status === "done" && (
            <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-400 ease-out ${
              variant === "logout" ? "bg-orange-50" : "bg-green-50"
            } ${showIcon ? "scale-100 opacity-100" : "scale-50 opacity-0"}`}>
              {variant === "logout" ? (
                <svg className="w-7 h-7 text-orange-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                  <polyline strokeLinecap="round" strokeLinejoin="round" points="16 17 21 12 16 7"/>
                  <line strokeLinecap="round" x1="21" y1="12" x2="9" y2="12"/>
                </svg>
              ) : (
                <svg className="w-7 h-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
          )}

          {status === "error" && (
            <div className={`w-16 h-16 rounded-full bg-red-50 flex items-center justify-center transition-all duration-400 ease-out ${
              showIcon ? "scale-100 opacity-100" : "scale-50 opacity-0"
            }`}>
              <svg className="w-7 h-7 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          )}
        </div>

        <p className="text-sm font-bold text-[#1e1b2e]">
          {status === "loading"
            ? (variant === "logout" ? "Signing you out…" : "Signing you in…")
            : message}
        </p>
      </div>
    </div>
  );

  return createPortal(content, document.body);
};