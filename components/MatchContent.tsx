"use client";

import { useMatches } from "@/lib/use-matches";
import MatchTabs from "./MatchTabs";
import RefreshButton from "./RefreshButton";

function LoadingState() {
  return (
    <div className="mx-auto max-w-3xl space-y-5 px-4 sm:space-y-6 sm:px-6">
      <div className="h-12 animate-pulse rounded-xl border border-pastel-blush/60 bg-white/80 shadow-soft" />
      <div className="flex gap-2 rounded-2xl border border-pastel-blush/50 bg-white/60 p-1.5 shadow-soft">
        <div className="h-12 flex-1 animate-pulse rounded-xl bg-pastel-blush/40" />
        <div className="h-12 flex-1 animate-pulse rounded-xl bg-pastel-blush/30" />
      </div>
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-32 animate-pulse rounded-2xl border border-pastel-sky/40 bg-white shadow-card"
            style={{ animationDelay: `${i * 100}ms` }}
          />
        ))}
      </div>
    </div>
  );
}

function ErrorState({
  error,
  onRetry,
  isRefreshing,
}: {
  error: Error;
  onRetry: () => void;
  isRefreshing: boolean;
}) {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6">
      <div
        role="alert"
        className="rounded-2xl border border-pastel-blush/70 bg-white p-6 text-center shadow-card"
      >
        <p className="text-lg font-medium text-gray-800">Could not load matches</p>
        <p className="mt-1 text-sm text-gray-600">{error.message}</p>
        <div className="mt-5 flex justify-center">
          <RefreshButton
            onClick={onRetry}
            isRefreshing={isRefreshing}
            aria-label="Retry loading matches"
          />
        </div>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6">
      <div className="rounded-2xl border border-pastel-sky/50 bg-white py-12 text-center shadow-card">
        <p className="font-medium text-gray-800">No matches yet</p>
        <p className="mt-1 text-sm text-gray-600">Matches will appear here when available.</p>
      </div>
    </div>
  );
}

export default function MatchContent() {
  const { state, refresh, isRefreshing } = useMatches();

  if (state.status === "loading" && !isRefreshing) {
    return <LoadingState />;
  }

  if (state.status === "error") {
    return (
      <ErrorState
        error={state.error}
        onRetry={refresh}
        isRefreshing={isRefreshing}
      />
    );
  }

  const { data } = state;
  const matches = data.matches ?? [];
  const updatedAt = data.updatedAt;

  if (matches.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="mx-auto max-w-3xl space-y-5 px-4 sm:space-y-6 sm:px-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {updatedAt && (
          <p className="min-w-0 truncate text-sm text-gray-600" aria-live="polite">
            Last updated{" "}
            <time dateTime={updatedAt}>
              {new Date(updatedAt).toLocaleString(undefined, {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </time>
          </p>
        )}
        <div className={`min-h-[44px] ${updatedAt ? "sm:ml-auto" : ""}`}>
          <RefreshButton onClick={refresh} isRefreshing={isRefreshing} />
        </div>
      </div>
      <MatchTabs matches={matches} />
    </div>
  );
}
