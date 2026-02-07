import type { CompletedMatch } from "@/types";

/** Show score as-is unless it looks like a date string from the sheet. */
function formatScoreSummary(score: string): string {
  if (!score || /GMT|Standard Time/i.test(score)) return "—";
  return score;
}

export default function CompletedMatchCard({ match }: CompletedMatchCardProps) {
  const namesA = match.team_a.players.map((p) => p.name);
  const namesB = match.team_b.players.map((p) => p.name);
  const winnerA = match.winner_team === "team_a";
  const winnerB = match.winner_team === "team_b";
  const scoreDisplay = formatScoreSummary(match.score_summary);
  const hasCategory = match.category != null && String(match.category).trim() !== "";
  const hasFixture = match.fixture != null && String(match.fixture).trim() !== "";

  const teamALabel = match.team_a.name;
  const teamBLabel = match.team_b.name;

  return (
    <article
      className="overflow-hidden rounded-2xl border border-gray-300 bg-[#f8f2e7] shadow-card transition hover:shadow-card-hover"
      data-match-id={match.id}
    >
      {/* Top: Category from sheet (e.g. Men's) */}
      {hasCategory && (
        <div className="border-b border-gray-200 bg-white/50 px-4 py-2.5 text-center">
          <span className="text-sm font-medium text-gray-700">
            Category: {match.category}
          </span>
        </div>
      )}

      <div className="flex flex-col items-stretch gap-4 p-5 sm:flex-row sm:items-center sm:gap-6 sm:p-6">
        <div className="flex flex-1 flex-col items-center">
          {winnerA ? (
            <>
              <span
                className="mb-1.5 text-lg font-bold leading-none text-card-winner"
                aria-label="Winner"
              >
                W
              </span>
              <div className="rounded-lg border-2 border-card-winner bg-card-winner-muted/50 px-3 py-1.5">
                <span className="text-lg font-semibold text-card-winner">
                  {teamALabel}
                </span>
              </div>
              <div className="mt-2 flex w-full flex-col text-left text-sm text-gray-600">
                {namesA.map((name) => (
                  <span key={name}>{name}</span>
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="rounded-lg border border-card-border bg-card-loser-muted/30 px-3 py-1.5">
                <span className="text-lg font-semibold text-card-loser">
                  {teamALabel}
                </span>
              </div>
              <div className="mt-2 flex w-full flex-col text-left text-sm text-gray-600">
                {namesA.map((name) => (
                  <span key={name}>{name}</span>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="flex shrink-0 flex-col items-center justify-center">
          <div className="rounded-lg border border-card-border bg-card-score px-4 py-2">
            <span className="text-xl font-bold tabular-nums text-gray-700">
              {scoreDisplay}
            </span>
          </div>
        </div>

        <div className="flex flex-1 flex-col items-center">
          {winnerB ? (
            <>
              <span
                className="mb-1.5 text-lg font-bold leading-none text-card-winner"
                aria-label="Winner"
              >
                W
              </span>
              <div className="rounded-lg border-2 border-card-winner bg-card-winner-muted/50 px-3 py-1.5">
                <span className="text-lg font-semibold text-card-winner">
                  {teamBLabel}
                </span>
              </div>
              <div className="mt-2 flex w-full flex-col text-right text-sm text-gray-600">
                {namesB.map((name) => (
                  <span key={name}>{name}</span>
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="rounded-lg border border-card-border bg-card-loser-muted/30 px-3 py-1.5">
                <span className="text-lg font-semibold text-card-loser">
                  {teamBLabel}
                </span>
              </div>
              <div className="mt-2 flex w-full flex-col text-right text-sm text-gray-600">
                {namesB.map((name) => (
                  <span key={name}>{name}</span>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Bottom: Fixture from sheet (e.g. Group B), small text */}
      {hasFixture && (
        <div className="border-t border-gray-200 bg-white/50 px-4 py-2 text-center">
          <span className="text-xs font-medium text-gray-600">
            {match.fixture}
          </span>
        </div>
      )}
    </article>
  );
}

type CompletedMatchCardProps = {
  match: CompletedMatch;
};
