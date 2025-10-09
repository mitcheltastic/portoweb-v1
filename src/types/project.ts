export type Project = {
  id: number;
  name: string;
  description: string | null;
  repo_url: string | null;
  live_url: string | null;

  // New (optional) richness
  role?: string | null;
  org?: string | null;
  period?: string | null;      // e.g. "May–Jun 2025"
  tech?: string[];             // ["Go", "PostgreSQL", ...]
  highlights?: string[];       // bullet points for impact
  featured?: boolean;          // for future filtering
};
