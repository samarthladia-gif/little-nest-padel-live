"use client";

type RefreshButtonProps = {
  onClick: () => void;
  disabled?: boolean;
  isRefreshing?: boolean;
  "aria-label"?: string;
};

export default function RefreshButton({
  onClick,
  disabled = false,
  isRefreshing = false,
  "aria-label": ariaLabel = "Refresh matches",
}: RefreshButtonProps) {
  const busy = disabled || isRefreshing;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={busy}
      aria-label={ariaLabel}
      aria-busy={isRefreshing}
      className="inline-flex items-center gap-2 rounded-xl border border-pastel-blush/70 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-soft transition hover:bg-pastel-cream hover:text-accent-forest focus:outline-none focus:ring-2 focus:ring-accent-rose/20 disabled:opacity-50"
    >
      <svg
        className={`h-5 w-5 ${isRefreshing ? "animate-spin" : ""}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
        />
      </svg>
      {isRefreshing ? "Updating…" : "Refresh"}
    </button>
  );
}
