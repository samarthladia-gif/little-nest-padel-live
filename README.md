# Little Nest Parent's Padel Tournament 3.0

A production-quality Next.js (App Router) scoreboard for the Little Nest Parent's Padel Tournament. Premium pastel design, TypeScript, Tailwind CSS, and no paid UI kits.

## Features

- **Home page** with header and two tabs: **Completed** and **Upcoming**
- **Data** from a public JSON endpoint (see `NEXT_PUBLIC_API_URL` below)
- **Polling** every 30 seconds and a **manual refresh** button
- **Search** by team name (matches `team_a` or `team_b`)
- **Match cards**
  - Upcoming: Team A vs Team B
  - Completed: Team A vs Team B, 2 player names per team, `score_summary`, and visual highlight for `winner_team`
- **Loading, error, and empty states**
- **Clean structure**: `/components`, `/lib`, `/types`
- **Mobile responsive**, premium look on desktop

## Run instructions

```bash
# Install dependencies
npm install

# Development
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

**Production build:**

```bash
npm run build
npm run start
```

## Setting `NEXT_PUBLIC_API_URL`

Match data is loaded from a public JSON endpoint. Set the env var to your API URL.

**Option 1 – `.env.local` (recommended)**

Create a file `.env.local` in the project root:

```bash
NEXT_PUBLIC_API_URL=https://your-api.example.com/matches.json
```

Restart the dev server after changing env vars.

**Option 2 – Inline when running**

```bash
NEXT_PUBLIC_API_URL=https://your-api.example.com/matches.json npm run dev
```

**Local development without an external API**

If `NEXT_PUBLIC_API_URL` is **not** set, the app falls back to the local route `/api/matches`, which serves mock data. So you can run the app without configuring an external API.

## Expected API response

The endpoint must return JSON of this shape:

```json
{
  "matches": [
    {
      "id": "1",
      "status": "upcoming",
      "team_a": {
        "name": "Team A",
        "players": [{ "name": "Player 1" }, { "name": "Player 2" }]
      },
      "team_b": {
        "name": "Team B",
        "players": [{ "name": "Player 3" }, { "name": "Player 4" }]
      },
      "scheduled_at": "2025-02-08T10:00:00Z"
    },
    {
      "id": "2",
      "status": "completed",
      "team_a": { "name": "Team A", "players": [...] },
      "team_b": { "name": "Team B", "players": [...] },
      "score_summary": "6-4",
      "winner_team": "team_a",
      "completed_at": "2025-02-07T14:00:00Z"
    }
  ]
}
```

- **Search** filters by `team_a.name` or `team_b.name`.
- **Completed** matches require `score_summary` (string, e.g. `"6-4"` or `"6-4, 3-6, 6-2"`) and `winner_team` (`"team_a"` or `"team_b"`). The winning team is highlighted on the card.

### Category and fixture (Google Sheet columns L and M)

The app shows **Category** at the top of each card and **Fixture** at the bottom. These only appear when your API includes them in **each match object**. The keys can be any of:

- `category` or `Category` (and the app will accept case-insensitive matches)
- `fixture` or `Fixture`

**If you see "Category: —" and "—" for fixture**, your Google Apps Script is not sending those fields. In the script:

1. When you read each row from the sheet, include the columns for **category** (e.g. column L) and **fixture** (e.g. column M).
2. Add them to the object you push into `matches`, for example:
   ```js
   match.category = row[11];  // or the index/letter for your category column
   match.fixture = row[12];  // or the index/letter for your fixture column
   ```
3. Redeploy the script and reload the scoreboard. You can confirm by opening DevTools → Network, selecting the request to your script URL, and checking that each item in `matches` has `category` and `fixture` with non-empty values where the sheet has data.

## Scripts

| Command        | Description          |
|----------------|----------------------|
| `npm run dev`  | Start dev server     |
| `npm run build`| Production build     |
| `npm run start`| Run production build |
| `npm run lint` | Run ESLint           |
