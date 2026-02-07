"use client";

import type {
  ApiResponse,
  ApiMatch,
  ApiTeam,
  Match,
  UpcomingMatch,
  CompletedMatch,
} from "@/types";

const POLL_INTERVAL_MS = 30_000;

function getApiUrl(): string {
  const url = process.env.NEXT_PUBLIC_API_URL;
  if (url && typeof url === "string") return url.trim();
  if (typeof window !== "undefined") return "/api/matches";
  return "http://localhost:3000/api/matches";
}

/** Normalize API status to our expected values (API may send "COMPLETE", "UPCOMING", "IN PROGRESS"). */
function normalizeStatus(s: string): "completed" | "upcoming" {
  const upper = s.toUpperCase().replace(/\s+/g, " ").trim();
  if (upper === "COMPLETE") return "completed";
  return "upcoming"; // UPCOMING, IN PROGRESS, or anything else -> upcoming
}

/** Display-friendly player name (sheet errors like #VALUE! become TBD). */
function sanitizePlayerName(value: string): string {
  const v = String(value ?? "").trim();
  if (!v || /^#VALUE!$/i.test(v) || /^#REF!$/i.test(v) || /^#N\/A$/i.test(v)) return "TBD";
  return v;
}

/** Read string from object; tries given keys then case-insensitive match (sheet may use different casing). */
function getStringFrom(
  obj: Record<string, unknown>,
  ...keys: string[]
): string | undefined {
  for (const key of keys) {
    const v = obj[key];
    if (v != null && String(v).trim() !== "") return String(v).trim();
  }
  const target = keys[0].trim().toLowerCase();
  if (!target) return undefined;
  for (const [k, val] of Object.entries(obj)) {
    if (k.trim().toLowerCase() === target && val != null && String(val).trim() !== "")
      return String(val).trim();
  }
  return undefined;
}

function isPlainObject(x: unknown): x is Record<string, unknown> {
  return typeof x === "object" && x !== null && !Array.isArray(x);
}

function parseJson(body: string): unknown {
  try {
    return JSON.parse(body);
  } catch {
    throw new Error("Invalid JSON from server.");
  }
}

/**
 * Fetches tournament data from NEXT_PUBLIC_API_URL, validates ok=true, returns typed ApiResponse.
 * Throws user-friendly errors on network, parse, or validation failures.
 */
export async function fetchTournamentData(): Promise<ApiResponse> {
  const url = getApiUrl();

  let res: Response;
  try {
    res = await fetch(url, { cache: "no-store" });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Network request failed.";
    throw new Error(`Could not reach the server. ${message}`);
  }

  if (!res.ok) {
    if (res.status >= 500) {
      throw new Error("The server is having trouble. Please try again in a moment.");
    }
    if (res.status === 404) {
      throw new Error("Tournament data was not found.");
    }
    throw new Error(`Request failed (${res.status}). Please try again.`);
  }

  const text = await res.text();
  const data = parseJson(text);

  if (!isPlainObject(data)) {
    throw new Error("Server returned invalid data.");
  }

  if (data.ok !== true) {
    throw new Error(
      typeof data.message === "string"
        ? data.message
        : "Tournament data is not available right now."
    );
  }

  if (!Array.isArray(data.matches)) {
    throw new Error("Tournament data is incomplete (missing matches).");
  }

  const matches: ApiMatch[] = [];
  for (let i = 0; i < data.matches.length; i++) {
    const m = data.matches[i];
    if (!isPlainObject(m) || typeof m.match_id !== "string" || typeof m.status !== "string") {
      throw new Error(`Invalid match at position ${i + 1}.`);
    }
    const teamA = String(m.team_a ?? "").trim();
    const teamB = String(m.team_b ?? "").trim();
    const statusNorm = normalizeStatus(m.status);
    matches.push({
      ...m,
      match_id: m.match_id,
      status: statusNorm,
      team_a: teamA,
      team_b: teamB,
      player_a1: sanitizePlayerName(m.player_a1),
      player_a2: sanitizePlayerName(m.player_a2),
      player_b1: sanitizePlayerName(m.player_b1),
      player_b2: sanitizePlayerName(m.player_b2),
      score_summary: m.score_summary != null ? String(m.score_summary).trim() : undefined,
      winner_team:
        m.winner_team === "team_a" || m.winner_team === "team_b" ? m.winner_team : undefined,
      scheduled_time: m.scheduled_time != null ? String(m.scheduled_time).trim() : undefined,
      court: m.court != null ? String(m.court) : undefined,
      group: m.group != null ? String(m.group) : undefined,
      category: getStringFrom(m, "category", "Category"),
      fixture: getStringFrom(m, "fixture", "Fixture"),
    });
  }

  return {
    ok: true,
    tournament: data.tournament != null ? String(data.tournament) : undefined,
    updatedAt: data.updatedAt != null ? String(data.updatedAt) : undefined,
    matches,
    teams: Array.isArray(data.teams) ? data.teams : undefined,
  };
}

/** Map API matches to UI Match shape (team_a/team_b as ApiTeam with players). */
export function mapApiMatchesToUi(apiMatches: ApiMatch[]): Match[] {
  return apiMatches.map((m): Match => {
    const teamA: ApiTeam = {
      name: m.team_a,
      players: [{ name: m.player_a1 }, { name: m.player_a2 }],
    };
    const teamB: ApiTeam = {
      name: m.team_b,
      players: [{ name: m.player_b1 }, { name: m.player_b2 }],
    };

    const isCompleted =
      (m.status === "completed" || String(m.status).toUpperCase() === "COMPLETE") &&
      m.score_summary != null &&
      m.score_summary.trim() !== "" &&
      m.score_summary.toUpperCase() !== "IP" &&
      (m.winner_team === "team_a" || m.winner_team === "team_b");

    if (isCompleted) {
      const completed: CompletedMatch = {
        id: m.match_id,
        status: "completed",
        team_a: teamA,
        team_b: teamB,
        score_summary: m.score_summary,
        winner_team: m.winner_team,
        category: m.category,
        fixture: m.fixture,
      };
      return completed;
    }

    const isInProgress = m.score_summary?.toUpperCase().trim() === "IP";
    const upcoming: UpcomingMatch = {
      id: m.match_id,
      status: "upcoming",
      team_a: teamA,
      team_b: teamB,
      scheduled_at: m.scheduled_time,
      isInProgress: isInProgress || undefined,
      category: m.category,
      fixture: m.fixture,
    };
    return upcoming;
  });
}

export { POLL_INTERVAL_MS };
