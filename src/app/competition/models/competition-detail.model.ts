import { GameInfo } from '@core/models/game-info.model';

export interface CompetitionDetail {
  id: string;
  name: string;
  slug: string;
  title: string;
  description: string;
  titleCardURL: string;
  maxTeamSize?: number;
  minTeamSize: number;
  rulesSlug: string;
  game: GameInfo;
  playerCount: number;
  teamCount: number;
  competitionLevel: string;
  type: string;
}
