export interface CompetitionFormSubmit {
  name: string;
  slug: string;
  title: string;
  description?: string;
  maxTeamSize?: number;
  minTeamSize: number;
  competitionLevelId: string;
  ruleSlug: string;
}
