"use client";

import { useMemo, useState } from "react";
import type { Match, UpcomingMatch, CompletedMatch } from "@/types";
import SearchInput from "./SearchInput";
import UpcomingMatchCard from "./UpcomingMatchCard";
import CompletedMatchCard from "./CompletedMatchCard";

type TabId = "completed" | "upcoming";

function filterMatchesByQuery(matches: Match[], query: string): Match[] {
  const q = query.trim().toLowerCase();
  if (!q) return matches;
  return matches.filter((m) => {
    const teamAMatch = m.team_a.name.toLowerCase().includes(q);
    const teamBMatch = m.team_b.name.toLowerCase().includes(q);
    const playerAMatch =
      m.team_a.players.some((p) => p.name.toLowerCase().includes(q));
    const playerBMatch =
      m.team_b.players.some((p) => p.name.toLowerCase().includes(q));
    const categoryMatch =
      m.category != null &&
      String(m.category).trim() !== "" &&
      m.category.toLowerCase().includes(q);
    return (
      teamAMatch ||
      teamBMatch ||
      playerAMatch ||
      playerBMatch ||
      categoryMatch
    );
  });
}

type MatchTabsProps = {
  matches: Match[];
};

export default function MatchTabs({ matches }: MatchTabsProps) {
  const [activeTab, setActiveTab] = useState<TabId>("completed");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = useMemo(
    () => filterMatchesByQuery(matches, searchQuery),
    [matches, searchQuery]
  );

  const completed = useMemo(
    () => filtered.filter((m): m is CompletedMatch => m.status === "completed"),
    [filtered]
  );

  const upcoming = useMemo(
    () => filtered.filter((m): m is UpcomingMatch => m.status === "upcoming"),
    [filtered]
  );

  const tabs: { id: TabId; label: string }[] = [
    { id: "completed", label: "Completed" },
    { id: "upcoming", label: "Upcoming" },
  ];

  return (
    <div className="space-y-6">
      <section aria-labelledby="matches-heading">
        <h2 id="matches-heading" className="sr-only">
          Matches
        </h2>

        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search by team, player, or category…"
          aria-label="Search matches by team name, player name, or category"
        />

        <div
          role="tablist"
          aria-label="Match view"
          className="mt-4 flex rounded-2xl border border-pastel-blush/50 bg-white/80 p-1.5 shadow-soft"
        >
          {tabs.map(({ id, label }) => (
            <button
              key={id}
              role="tab"
              aria-selected={activeTab === id}
              aria-controls={`panel-${id}`}
              id={`tab-${id}`}
              onClick={() => setActiveTab(id)}
              className={`flex-1 rounded-xl py-2.5 text-sm font-medium transition sm:py-3 sm:text-base ${
                activeTab === id
                  ? "bg-white text-accent-forest shadow-card"
                  : "text-gray-600 hover:bg-white/50 hover:text-gray-800"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="min-h-[200px] pt-4">
          {/* Completed Panel */}
          <div
            role="tabpanel"
            id="panel-completed"
            aria-labelledby="tab-completed"
            hidden={activeTab !== "completed"}
            className="space-y-4"
          >
            {completed.length === 0 ? (
              <div className="rounded-2xl border border-pastel-sage/50 bg-white py-10 text-center shadow-card">
                <p className="text-gray-600">
                  {searchQuery
                    ? "No completed matches match your search."
                    : "No completed matches."}
                </p>
              </div>
            ) : (
              <ul className="space-y-4" aria-label="Completed matches">
                {completed.map((match) => (
                  <li key={match.id}>
                    <CompletedMatchCard match={match} />
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Upcoming Panel */}
          <div
            role="tabpanel"
            id="panel-upcoming"
            aria-labelledby="tab-upcoming"
            hidden={activeTab !== "upcoming"}
            className="space-y-4"
          >
            {upcoming.length === 0 ? (
              <div className="rounded-2xl border border-pastel-sky/50 bg-white py-10 text-center shadow-card">
                <p className="text-gray-600">
                  {searchQuery
                    ? "No upcoming matches match your search."
                    : "No upcoming matches."}
                </p>
              </div>
            ) : (
              <ul className="space-y-4" aria-label="Upcoming matches">
                {upcoming.map((match) => (
                  <li key={match.id}>
                    <UpcomingMatchCard match={match} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
