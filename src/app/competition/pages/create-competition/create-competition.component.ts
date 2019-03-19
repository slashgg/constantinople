import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { CompetitionService } from '@core/services/competition';
import { ApiError } from '@utils/models/api-error';
import { CompetitionFormSubmit } from 'competition/models/competition-form-submit.model';

@Component({
  selector: 'gg-create-competition-page',
  templateUrl: './create-competition.component.html',
})
export class CreateCompetitionPageComponent {
  public formError: ApiError;
  constructor(private competitionService: CompetitionService) {}

  public onSubmit(competitionValues: CompetitionFormSubmit) {
    this.competitionService.createCompetition(competitionValues).subscribe(
      result => {
        this.formError = undefined;
      },
      (error: HttpErrorResponse) => {
        this.formError = error.error;
      }
    );
  }
}
