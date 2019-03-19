import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Competition } from '@core/models/competition';
import { CompetitionDetail } from 'competition/models/competition-detail.model';
import { CompetitionFormSubmit } from 'competition/models/competition-form-submit.model';
import { CompetitionLevel } from 'competition/models/competition-level.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CompetitionService {
  constructor(private httpClient: HttpClient) {}

  public getAvailableCompetitions() {
    return this.httpClient
      .get('competitions/accessible')
      .pipe(map((obj: Object[]) => obj.map(comp => new Competition(comp))));
  }

  public getCompetitionLevels() {
    return this.httpClient
      .get<CompetitionLevel[]>('competitions/levels')
      .pipe(map(competitionLevels => competitionLevels.sort((c1, c2) => c1.level - c2.level)));
  }

  public getCompetition(id: string) {
    return this.httpClient.get<CompetitionDetail>(`competitions/${id}`);
  }

  public createCompetition(payload: CompetitionFormSubmit) {
    return this.httpClient.post('competitions', payload);
  }
}
