export type Project = {
  id: number;
  name: string;
  description: string;
  repo_url: string | null;
  live_url: string | null;
  role?: string;
  org?: string;
  period?: string;
  tech?: string[];
  highlights?: string[];
  featured?: boolean;
  image?: string; // 👈 Add this line
};