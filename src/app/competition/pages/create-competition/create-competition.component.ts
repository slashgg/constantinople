import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'gg-create-competition-page',
  templateUrl: './create-competition.component.html',
})
export class CreateCompetitionPageComponent {
  constructor(private httpClient: HttpClient) {}
}
