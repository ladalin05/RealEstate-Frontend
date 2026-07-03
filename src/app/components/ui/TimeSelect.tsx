import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";

const generateTimes = () => {
  const times = [];
  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m += 15) {
      const hour12 = h % 12 === 0 ? 12 : h % 12;
      const ampm = h < 12 ? "am" : "pm";
      const hh = String(hour12).padStart(2, "0");
      const mm = String(m).padStart(2, "0");
      times.push(`${hh}:${mm} ${ampm}`);
    }
  }
  return times;
};

const times = generateTimes();

export const TimeSelect = ({ value, onChange }: { value: string | null; onChange: (t: string) => void }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (open && value && listRef.current) {
      const el = listRef.current.querySelector("[data-selected='true']");
      if (el) el.scrollIntoView({ block: "nearest" });
    }
  }, [open]);

  return (
    <div ref={wrapperRef} className="relative w-full">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`w-full flex items-center justify-between h-12 px-3 border rounded-sm text-sm transition-all outline-none
          ${open ? "border-sky-400 ring-1 ring-sky-300" : "border-gray-300"}
          ${value ? "text-gray-900" : "text-gray-400"}`}
      >
        {value || t('schedule_tour.select_time')}
        <svg
          className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div
          ref={listRef}
          className="absolute z-10 w-full bg-white border border-t-0 border-sky-400 rounded-b-sm max-h-48 overflow-y-auto divide-y divide-gray-100 shadow-sm"
        >
          {times.map((time) => (
            <button
              key={time}
              type="button"
              data-selected={value === time}
              onClick={() => { onChange(time); setOpen(false); }}
              className={`w-full text-left px-3 py-2.5 text-sm transition-colors
                ${value === time ? "bg-sky-50 text-sky-500 font-medium" : "text-gray-700 hover:bg-gray-50"}`}
            >
              {time}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}