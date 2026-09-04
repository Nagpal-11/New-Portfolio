export interface Project {
  id: string;
  title: string;
  category: string;
  subtitle: string;
  summary: string;
  highlights: string[];
  metrics: { label: string; value: string }[];
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  accentColor: string;
  videoPlaceholder: {
    badgeText: string;
    headline: string;
    aspectRatio?: string;
  };
}

export interface MetricItem {
  metric: string;
  label: string;
  description: string;
  detail: string;
  tag: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answerPrefix: string;
  answerBody: string;
}

export interface Pillar {
  id: 'intelligence' | 'architecture' | 'product';
  title: string;
  headline: string;
  description: string;
  capabilities: string[];
  cardTag: string;
  metric: string;
}

export interface SkillSnippet {
  language: string;
  filename: string;
  code: string;
  githubUrl: string;
  benchmarkNote?: string;
}

export interface SkillGaugeItem {
  id: string;
  name: string;
  shortName: string;
  category: 'Deep Learning' | 'Core CS' | 'Systems & APIs' | 'Data & Cloud';
  percentage?: number;
  level: string; // e.g., "ADVANCED", "PROFICIENT", "MASTERY"
  telemetryBadge: string;
  highlightMetric: string;
  description: string;
  keyTools: string[];
  proofProject: string;
  accentColor?: string;
  snippet: SkillSnippet;
}

export interface ContributionDay {
  date: string;
  count: number;
  level: number; // 0, 1, 2, 3, 4
}

export interface ContributionWeek {
  days: ContributionDay[];
}

export interface GitHubRepoItem {
  id: number;
  name: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  htmlUrl: string;
  updatedAt: string;
}

export interface GitHubEventItem {
  id: string;
  type: string;
  repoName: string;
  createdAt: string;
  message?: string;
  branch?: string;
}

export interface GitHubStats {
  totalContributions: number;
  currentStreak: number;
  longestStreak: number;
  activeDays: number;
  publicRepos: number;
}

