"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { ApiMatchesResponse } from "@/types";
import { fetchTournamentData, mapApiMatchesToUi, POLL_INTERVAL_MS } from "./api";

export type MatchesState =
  | { status: "loading" }
  | { status: "error"; error: Error }
  | { status: "success"; data: ApiMatchesResponse };

export function useMatches() {
  const [state, setState] = useState<MatchesState>({ status: "loading" });
  const [isRefreshing, setIsRefreshing] = useState(false);
  const hadSuccess = useRef(false);

  const load = useCallback(async () => {
    const isRefresh = hadSuccess.current;
    if (isRefresh) {
      setIsRefreshing(true);
    } else {
      setState({ status: "loading" });
    }
    try {
      const response = await fetchTournamentData();
      const data: ApiMatchesResponse = {
        matches: mapApiMatchesToUi(response.matches),
        updatedAt: response.updatedAt,
      };
      hadSuccess.current = true;
      setState({ status: "success", data });
    } catch (err) {
      setState({
        status: "error",
        error: err instanceof Error ? err : new Error("Failed to load matches"),
      });
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    if (state.status !== "success") return;
    const id = setInterval(load, POLL_INTERVAL_MS);
    return () => clearInterval(id);
  }, [state.status, load]);

  return { state, refresh: load, isRefreshing };
}
