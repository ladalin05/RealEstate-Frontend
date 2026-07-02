import { useState, useRef, useEffect } from "react";
import { Calendar, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";

const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];

interface DatePickerProps {
  value: string;
  onChange: (value: string) => void;
  min?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
}

export function DatePicker({
  value,
  onChange,
  min,
  placeholder = "Select a date",
  className = "",
}: DatePickerProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const minDate = min ? new Date(min + "T00:00:00") : today;

  const selected = value ? new Date(value + "T00:00:00") : null;
  const [open, setOpen] = useState(false);
  const [viewYear, setViewYear] = useState(selected?.getFullYear() ?? today.getFullYear());
  const [viewMonth, setViewMonth] = useState(selected?.getMonth() ?? today.getMonth());
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (open && !wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const displayValue = selected
    ? selected.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
    : null;

    function selectDate(date: Date) {
        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, "0");
        const dd = String(date.getDate()).padStart(2, "0");
        onChange(`${yyyy}-${mm}-${dd}`);
        setOpen(false);
    }

  function prevMonth() {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  }

  function nextMonth() {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  }

  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const inputCls = `flex items-center gap-2 w-full px-3 py-2 bg-white border rounded-lg cursor-pointer text-sm transition-all
    ${open ? "border-teal-600 ring-2 ring-teal-600/15" : "border-gray-300 hover:border-teal-600"}
    ${className}`;

  return (
    <div className="relative" ref={wrapRef}>
      <button
        type="button"
        className={inputCls}
        onClick={() => setOpen(o => !o)}
        aria-haspopup="true"
        aria-expanded={open}
      >
        <span className={displayValue ? "text-gray-900" : "text-gray-400"}>
          {displayValue ?? placeholder}
        </span>
        <Calendar className="w-4 h-4 text-teal-600 ml-auto" />
      </button>

      {open && (
        <div className="absolute top-[calc(100%+6px)] left-0 z-50 bg-white border border-gray-200 rounded-xl shadow-lg p-3.5 w-72">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <button type="button" onClick={prevMonth}
              className="w-7 h-7 flex items-center justify-center rounded-md border border-gray-200 hover:bg-gray-50 text-gray-500">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-sm font-medium text-gray-900">
              {MONTHS[viewMonth]} {viewYear}
            </span>
            <button type="button" onClick={nextMonth}
              className="w-7 h-7 flex items-center justify-center rounded-md border border-gray-200 hover:bg-gray-50 text-gray-500">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Weekday labels */}
          <div className="grid grid-cols-7 gap-0.5 mb-1">
            {["Su","Mo","Tu","We","Th","Fr","Sa"].map(d => (
              <div key={d} className="text-center text-[11px] font-medium text-gray-400 py-1 uppercase tracking-wide">
                {d}
              </div>
            ))}
          </div>

          {/* Days */}
          <div className="grid grid-cols-7 gap-0.5">
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`e-${i}`} />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const date = new Date(viewYear, viewMonth, i + 1);
              const isPast = date < minDate;
              const isToday = date.getTime() === today.getTime();
              const isSelected = selected && date.getTime() === selected.getTime();

              return (
                <button
                  key={i}
                  type="button"
                  disabled={isPast}
                  onClick={() => !isPast && selectDate(date)}
                  className={`aspect-square flex items-center justify-center text-[13px] rounded-md transition-colors
                    ${isSelected ? "bg-teal-600 text-white font-medium" : ""}
                    ${!isSelected && isToday ? "text-teal-600 font-medium" : ""}
                    ${!isSelected && !isPast ? "hover:bg-gray-100 text-gray-900" : ""}
                    ${isPast ? "text-gray-300 cursor-not-allowed" : ""}
                  `}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}