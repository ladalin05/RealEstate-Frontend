import { useState, useRef, useEffect } from "react";

export const SelectForm = ({options, value, onChange}: { options: string[]; value: string; onChange: (value: string) => void }) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (isOpen && listRef.current) {
            const el = listRef.current.querySelector("[data-selected='true']");
            if (el) el.scrollIntoView({ block: "nearest" });
        }
    }, [isOpen, value]);


    return (
        <div ref={selectRef} className="relative w-full">
            <button type="button" onClick={() => setIsOpen((prev) => !prev)} className={`w-full flex items-center justify-between h-12 px-3 border rounded-sm text-sm transition-all outline-none
                ${isOpen ? "border-sky-400 ring-1 ring-sky-300" : "border-gray-300"}
                ${value ? "text-gray-900" : "text-gray-400"}`}>
                {value || "Select an option"}
                <svg className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isOpen && (
                <div ref={listRef} className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-sm shadow-lg max-h-60 overflow-auto">
                    {options.map((option) => (
                        <button
                            key={option}
                            type="button"
                            data-selected={value === option}
                            onClick={() => { onChange(option); setIsOpen(false); }}
                            className={`w-full text-left px-3 py-2.5 text-sm transition-colors
                                ${value === option ? "bg-sky-50 text-sky-500 font-medium" : "text-gray-700 hover:bg-gray-50"}`}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}