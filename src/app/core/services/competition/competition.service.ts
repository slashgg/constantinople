import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Competition } from '@core/models/competition';
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
}
