import type { CompletedMatch } from "@/types";

type CompletedMatchCardProps = {
  match: CompletedMatch;
};

/** Show score as-is unless it looks like a date string from the sheet. */
function formatScoreSummary(score: string): string {
  if (!score || /GMT|Standard Time/i.test(score)) return "—";
  return score;
}

function TeamBlock({
  teamName,
  playerNames,
  isWinner,
  align,
}: {
  teamName: string;
  playerNames: string[];
  isWinner: boolean;
  align: "left" | "right";
}) {
  // Mobile: always left aligned (prevents weird empty space + detached winner badge)
  // Desktop (sm+): keep left/right alignment
  const wrapperAlignClass =
    align === "left"
      ? "items-start text-left"
      : "items-start text-left sm:items-end sm:text-right";

  const pillAlignClass = align === "right" ? "sm:self-end" : "";

  return (
    <div className={`flex min-w-0 flex-col ${wrapperAlignClass}`}>
      {isWinner && (
        <span
          className="mb-2 text-lg font-bold leading-none text-card-winner"
          aria-label="Winner"
        >
          W
        </span>
      )}

      <div
        className={`w-fit rounded-lg px-3 py-1.5 ${pillAlignClass} ${
          isWinner
            ? "border-2 border-card-winner bg-card-winner-muted/50"
            : "border border-card-border bg-card-loser-muted/30"
        }`}
      >
        <span
          className={`break-words text-base font-semibold sm:text-lg ${
            isWinner ? "text-card-winner" : "text-card-loser"
          }`}
        >
          {teamName}
        </span>
      </div>

      <div className="mt-2 flex flex-col text-sm text-gray-600">
        {playerNames.map((name) => (
          <span key={name} className="break-words">
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function CompletedMatchCard({ match }: CompletedMatchCardProps) {
  const namesA = match.team_a.players.map((p) => p.name);
  const namesB = match.team_b.players.map((p) => p.name);
  const winnerA = match.winner_team === "team_a";
  const winnerB = match.winner_team === "team_b";
  const scoreDisplay = formatScoreSummary(match.score_summary);
  const hasCategory = match.category != null && String(match.category).trim() !== "";
  const hasFixture = match.fixture != null && String(match.fixture).trim() !== "";

  return (
    <article
      className="min-w-0 overflow-hidden rounded-2xl border border-gray-300 bg-[#f8f2e7] shadow-card transition hover:shadow-card-hover"
      data-match-id={match.id}
    >
      {hasCategory && (
        <div className="border-b border-gray-200 bg-white/50 px-4 py-2.5 text-center">
          <span className="text-sm font-medium text-gray-700">
            Category: {match.category}
          </span>
        </div>
      )}

      {/* Mobile: stacked grid rows. Desktop (sm+): 3-column row */}
      <div className="p-4 sm:p-5 md:p-6">
        <div className="grid gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-center sm:gap-6">
          <div className="min-w-0">
            <TeamBlock
              teamName={match.team_a.name}
              playerNames={namesA}
              isWinner={winnerA}
              align="left"
            />
          </div>

          <div className="flex justify-center sm:justify-center">
            <div className="rounded-lg border border-card-border bg-card-score px-4 py-2">
              <span className="text-lg font-bold tabular-nums text-gray-700 sm:text-xl">
                {scoreDisplay}
              </span>
            </div>
          </div>

          <div className="min-w-0">
            <TeamBlock
              teamName={match.team_b.name}
              playerNames={namesB}
              isWinner={winnerB}
              align="right"
            />
          </div>
        </div>
      </div>

      {hasFixture && (
        <div className="border-t border-gray-200 bg-white/50 px-4 py-2 text-center">
          <span className="text-xs font-medium text-gray-600">{match.fixture}</span>
        </div>
      )}
    </article>
  );
}
