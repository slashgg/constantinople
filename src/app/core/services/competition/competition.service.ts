import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Competition } from '@core/models/competition';
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
}
