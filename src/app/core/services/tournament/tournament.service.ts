import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { TournamentDetail } from 'tournament/models/tournament.model';

@Injectable({
  providedIn: 'root',
})
export class TournamentService {
  constructor(private httpClient: HttpClient) {}

  public getTournamentListForCompetition(competitionId: string, page: number = 1, limit: number = 25) {
    const queryParams = new HttpParams().set('page', String(page)).set('limit', String(limit));
    return this.httpClient
      .get<TournamentDetail[]>(`competitions/${competitionId}/tournaments`, { params: queryParams })
      .pipe(
        map(response => {
          return response.map(r => new TournamentDetail(r));
        })
      );
  }
}
