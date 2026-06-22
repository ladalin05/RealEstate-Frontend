import { CheckIcon, ChevronDownIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface CustomSelectProps {
  label: string;
  options: { label: string; value: string }[];
  icon?: React.ComponentType<any>;
  value?: string;
  className?: string;
  onChange?: (value: string) => void;
}

export const CustomSelect = ({ label, options, icon: Icon, value, onChange, className }: CustomSelectProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  const handleSelect = (option: string) => {
    onChange?.(option);
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative inline-block w-full h-full">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={`${className ? className : " bg-gray-200 text-sm rounded-lg me-2 outline-none"} flex items-center gap-2 pl-3 pr-2.5 min-w-[100px] transition-all h-full`}
      >
        {Icon && <Icon className="text-gray-600 mr-2" size={20} />}
        <span
          className={`flex-1 text-left truncate ${!value ? "text-gray-400" : "text-gray-700"}`} >
          {options.find((option) => option.value.toString() === value?.toString())?.label || label}
        </span>

        <ChevronDownIcon
          className={`w-4 h-4 text-gray-400 transition-transform ${
            open ? "rotate-180" : ""
          }`} />
      </button>

      {open && (
        <div className="absolute top-[calc(100%+4px)] left-0 min-w-full z-100 bg-white border border-gray-200 rounded-lg p-1 shadow-sm">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleSelect(option.value)}
              className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900">
              <CheckIcon
                className={`w-3 h-3 ${
                  value === option.value ? "opacity-100" : "opacity-0"
                }`} />
              <span className="text-nowrap">{option.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};