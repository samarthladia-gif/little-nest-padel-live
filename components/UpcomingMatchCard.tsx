import type { UpcomingMatch } from "@/types";

type UpcomingMatchCardProps = {
  match: UpcomingMatch;
};

export default function UpcomingMatchCard({ match }: UpcomingMatchCardProps) {
  const inProgress = match.isInProgress === true;
  const hasCategory = match.category != null && String(match.category).trim() !== "";
  const hasFixture = match.fixture != null && String(match.fixture).trim() !== "";

  return (
    <article
      className="min-w-0 overflow-hidden rounded-2xl border border-pastel-sky/60 bg-white shadow-card transition hover:shadow-card-hover"
      data-match-id={match.id}
    >
      <div
        className={`border-b px-4 py-2.5 sm:py-2 ${
          inProgress
            ? "border-accent-gold/40 bg-accent-gold/15"
            : "border-pastel-sky/40 bg-pastel-sky/20"
        }`}
      >
        <span
          className={`inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider sm:py-0.5 ${
            inProgress ? "text-accent-gold/95" : "text-accent-forest/90"
          }`}
          aria-label={inProgress ? "Status: in progress" : "Status: upcoming"}
        >
          {inProgress ? "In progress" : "Upcoming"}
        </span>
      </div>

      <div className="p-4 sm:p-5 md:p-6">
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between sm:gap-4">
          <div className="min-w-0 flex-1 break-words text-center text-[15px] font-medium text-gray-800 sm:text-left">
            {match.team_a.name}
          </div>

          <div className="flex shrink-0 items-center gap-2 text-accent-gold">
            <span className="text-sm font-medium">vs</span>
          </div>

          <div className="min-w-0 flex-1 break-words text-center text-[15px] font-medium text-gray-800 sm:text-right">
            {match.team_b.name}
          </div>
        </div>

        {inProgress && (
          <p className="mt-3 text-center text-sm text-gray-500" aria-live="polite">
            Match in progress
          </p>
        )}
        {!inProgress && match.scheduled_at && (
          <p className="mt-3 text-center text-sm text-gray-500 sm:mt-4">
            {new Date(match.scheduled_at).toLocaleDateString(undefined, {
              dateStyle: "medium",
              timeStyle: "short",
            })}
          </p>
        )}

        {(hasCategory || hasFixture) && (
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 border-t border-pastel-sky/30 pt-3">
            {hasCategory && (
              <span className="rounded-md border border-pastel-blush/70 bg-pastel-blush/30 px-2.5 py-1.5 text-xs font-medium text-gray-600 sm:py-1">
                {match.category}
              </span>
            )}
            {hasFixture && (
              <span className="rounded-md border border-pastel-sage/50 bg-pastel-sage/20 px-2.5 py-1.5 text-xs font-medium text-gray-600 sm:py-1">
                {match.fixture}
              </span>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
