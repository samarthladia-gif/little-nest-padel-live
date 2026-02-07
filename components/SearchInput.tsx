"use client";

type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  "aria-label"?: string;
};

export default function SearchInput({
  value,
  onChange,
  placeholder = "Search by team, player, or category…",
  "aria-label": ariaLabel = "Search matches by team name, player name, or category",
}: SearchInputProps) {
  return (
    <div className="relative">
      <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 sm:left-3">
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </span>
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="min-h-[48px] w-full rounded-xl border border-pastel-blush/70 bg-white py-3 pl-11 pr-4 text-base text-gray-800 placeholder-gray-400 shadow-soft outline-none transition focus:border-accent-rose/50 focus:ring-2 focus:ring-accent-rose/20 sm:min-h-0 sm:py-2.5 sm:text-sm"
        aria-label={ariaLabel}
        autoComplete="off"
      />
    </div>
  );
}
