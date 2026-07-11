import { useEffect, useRef, useState } from "react";

export const MessageModal = ({ open, type = "info", title, message, onClose, autoCloseMs = 1000 }) => {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (open) dialogRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open || !autoCloseMs || type === "loading") return;
    const timer = setTimeout(() => onClose?.(), autoCloseMs);
    return () => clearTimeout(timer);
  }, [open, autoCloseMs, onClose, type]);

  if (!open) return null;

  const statusMap = { loading: "loading", success: "success", danger: "error" };

  return (
    <div className="fixed inset-0 z-1000 flex items-center justify-center bg-black/45 animate-[modalAlertFadeIn_0.15s_ease]">
      <div ref={dialogRef} role="alertdialog" aria-modal="true" tabIndex={-1}
        className="w-[min(360px,calc(100vw-32px))] rounded-xl border-[0.5px] border-black/10 bg-white p-6 text-center shadow-[0_8px_24px_rgba(0,0,0,0.12),0_2px_6px_rgba(0,0,0,0.08)] outline-none animate-[modalAlertPopIn_0.18s_ease] font-sans"
      >
        <div className="mx-auto mb-3.5 flex items-center justify-center">
          <StatusAnimation status={statusMap[type] || "loading"} />
        </div>
        <p className="mb-1.5 text-base font-semibold text-[#1a1a1a]">{title}</p>
        {message && (
          <p className="mb-1 text-md lg:text-lg font-bold leading-relaxed text-[#5f5f5a]">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

/**
 * status: "loading" | "success" | "error"
 */
export const StatusAnimation = ({ status = "loading" }) => {
  const [showIcon, setShowIcon] = useState(false);

  useEffect(() => {
    if (status !== "loading") {
      // slight delay so the spinner has time to fade before icon draws in
      const t = setTimeout(() => setShowIcon(true), 150);
      return () => clearTimeout(t);
    }
    setShowIcon(false);
  }, [status]);

  return (
    <div className="relative w-16 h-16 flex items-center justify-center">
      {/* Spinner */}
      <div
        className={`absolute inset-0 rounded-full border-4 border-gray-200 border-t-sky-500 animate-spin transition-opacity duration-200 ${
          status === "loading" ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Success check */}
      {status === "success" && (
        <svg
          className="w-16 h-16"
          viewBox="0 0 52 52"
        >
          <circle
            className={`transition-all duration-500 ease-out ${
              showIcon ? "stroke-dashoffset-0" : ""
            }`}
            style={{
              strokeDasharray: 166,
              strokeDashoffset: showIcon ? 0 : 166,
            }}
            cx="26" cy="26" r="24"
            fill="none"
            stroke="#0F6E56"
            strokeWidth="3"
          />
          <path
            className="transition-all duration-300 ease-out delay-300"
            style={{
              strokeDasharray: 48,
              strokeDashoffset: showIcon ? 0 : 48,
            }}
            fill="none"
            stroke="#0F6E56"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14 27l7 7 16-16"
          />
        </svg>
      )}

      {/* Error X */}
      {status === "error" && (
        <svg className="w-16 h-16" viewBox="0 0 52 52">
          <circle
            style={{
              strokeDasharray: 166,
              strokeDashoffset: showIcon ? 0 : 166,
            }}
            className="transition-all duration-500 ease-out"
            cx="26" cy="26" r="24"
            fill="none"
            stroke="#A32D2D"
            strokeWidth="3"
          />
          <path
            style={{
              strokeDasharray: 20,
              strokeDashoffset: showIcon ? 0 : 20,
            }}
            className="transition-all duration-300 ease-out delay-300"
            fill="none"
            stroke="#A32D2D"
            strokeWidth="4"
            strokeLinecap="round"
            d="M17 17l18 18"
          />
          <path
            style={{
              strokeDasharray: 20,
              strokeDashoffset: showIcon ? 0 : 20,
            }}
            className="transition-all duration-300 ease-out delay-500"
            fill="none"
            stroke="#A32D2D"
            strokeWidth="4"
            strokeLinecap="round"
            d="M35 17L17 35"
          />
        </svg>
      )}
    </div>
  );
};