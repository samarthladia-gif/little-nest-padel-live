import { NextResponse } from "next/server";
import { mockApiMatches } from "@/lib/mock-matches";

export async function GET() {
  const body = {
    ok: true,
    tournament: "Little Nest Parent's Padel Tournament 3.0",
    updatedAt: new Date().toISOString(),
    matches: mockApiMatches,
    teams: [],
  };
  return NextResponse.json(body);
}
