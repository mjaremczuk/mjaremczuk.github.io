export interface Project {
  title: string;
  description: string;
  tags: string[];
  stars?: number;
  forks?: number;
  metric?: string;
  metricValue?: number;
  href: string;
  status: 'active' | 'development' | 'experimental' | 'archived';
  accent: 'primary' | 'secondary' | 'tertiary';
  icon?: string;
  webHref?: string; // Link to the web version of the app
}
