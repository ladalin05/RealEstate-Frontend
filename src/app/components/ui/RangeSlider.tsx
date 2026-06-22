import React from "react";

const MIN = 70000;
const MAX = 7000000;
const STEP = 1000;

function fmt(v: number) {
  return "$" + Math.round(v).toLocaleString();
}

export function RangeSlider({
  filter,
  setFilter,
}: {
  filter: Record<string, string>;
  setFilter: React.Dispatch<React.SetStateAction<Record<string, string>>>;
}) {
  const pct = (v: number) => ((v - MIN) / (MAX - MIN)) * 100;
  const minPrice = Number(filter.minPrice || MIN);
  const maxPrice = Number(filter.maxPrice || MAX);

  const handleMin = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Math.min(Number(e.target.value), maxPrice - STEP);
    setFilter((prev) => ({ ...prev, minPrice: val.toString() }));
  };

  const handleMax = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Math.max(Number(e.target.value), minPrice + STEP);
    setFilter((prev) => ({ ...prev, maxPrice: val.toString() }));
  };

  const lo = pct(minPrice);
  const hi = pct(maxPrice);

  const thumbClass = `
    absolute w-full pointer-events-none appearance-none bg-transparent
    [&::-webkit-slider-thumb]:appearance-none
    [&::-webkit-slider-thumb]:pointer-events-auto
    [&::-webkit-slider-thumb]:w-5
    [&::-webkit-slider-thumb]:h-5
    [&::-webkit-slider-thumb]:rounded-full
    [&::-webkit-slider-thumb]:cursor-pointer
    [&::-webkit-slider-thumb]:border-none
    [&::-webkit-slider-thumb]:bg-indigo-400
    [&::-moz-range-thumb]:w-5
    [&::-moz-range-thumb]:h-5
    [&::-moz-range-thumb]:rounded-full
    [&::-moz-range-thumb]:border-none
    [&::-moz-range-thumb]:bg-indigo-400
  `;

  return (
    <div className="flex flex-col gap-4">
      <div className="relative flex items-center h-5">
        {/* Track background */}
        <div className="absolute inset-x-0 h-1 bg-gray-200 rounded" />

        {/* Filled range */}
        <div
          className="absolute h-1 rounded bg-indigo-400"
          style={{ left: `${lo}%`, width: `${hi - lo}%` }}
        />

        {/* Min thumb */}
        <input
          type="range"
          min={MIN}
          max={MAX}
          step={STEP}
          value={minPrice}
          onChange={handleMin}
          className={thumbClass}
        />

        {/* Max thumb */}
        <input
          type="range"
          min={MIN}
          max={MAX}
          step={STEP}
          value={maxPrice}
          onChange={handleMax}
          className={thumbClass}
        />
      </div>

      <div className="flex justify-between text-sm text-gray-500">
        <span>{fmt(minPrice)}</span>
        <span>{fmt(maxPrice)}</span>
      </div>
    </div>
  );
}