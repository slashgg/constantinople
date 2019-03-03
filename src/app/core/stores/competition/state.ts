import { Competition } from '@core/models/competition';

export interface CompetitionState {
  initialized: boolean;
  competitions: Competition[];
  selectedCompetition?: Competition;
}
