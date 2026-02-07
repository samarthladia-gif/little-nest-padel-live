/** API response and match types (raw from API; allow unknown extra fields) */

/** Top-level API response from NEXT_PUBLIC_API_URL */
export interface ApiResponse {
  ok: boolean;
  tournament?: string;
  updatedAt?: string;
  matches: ApiMatch[];
  teams?: unknown[];
}

/** Single match from the API; extra fields allowed safely */
export interface ApiMatch {
  match_id: string;
  status: string;
  team_a: string;
  team_b: string;
  player_a1: string;
  player_a2: string;
  player_b1: string;
  player_b2: string;
  score_summary?: string;
  winner_team?: "team_a" | "team_b";
  scheduled_time?: string;
  court?: string;
  group?: string;
  category?: string;
  fixture?: string;
  [key: string]: unknown;
}

/** UI-facing types (normalized from API or mock) */

export type MatchStatus = "upcoming" | "completed";

export interface ApiPlayer {
  name: string;
}

export interface ApiTeam {
  name: string;
  players: [ApiPlayer, ApiPlayer];
}

export interface UpcomingMatch {
  id: string;
  status: "upcoming";
  team_a: ApiTeam;
  team_b: ApiTeam;
  scheduled_at?: string;
  /** True when score_summary from the sheet is "IP" (match in progress). */
  isInProgress?: boolean;
  category?: string;
  fixture?: string;
}

export interface CompletedMatch {
  id: string;
  status: "completed";
  team_a: ApiTeam;
  team_b: ApiTeam;
  score_summary: string;
  winner_team: "team_a" | "team_b";
  completed_at?: string;
  category?: string;
  fixture?: string;
}

export type Match = UpcomingMatch | CompletedMatch;

export interface ApiMatchesResponse {
  matches: Match[];
  updatedAt?: string;
}
