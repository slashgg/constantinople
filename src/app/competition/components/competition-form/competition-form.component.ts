import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompetitionService } from '@core/services/competition';
import { ApiError } from '@utils/models/api-error';
import { CompetitionFormSubmit } from 'competition/models/competition-form-submit.model';
import { CompetitionLevel } from 'competition/models/competition-level.model';

@Component({
  selector: 'gg-competition-form',
  templateUrl: './competition-form.component.html',
})
export class CompetitionFormComponent implements OnInit {
  @Output() formSubmit: EventEmitter<CompetitionFormSubmit> = new EventEmitter<CompetitionFormSubmit>();
  @Input() formError: ApiError;

  public competitionForm: FormGroup;
  public competitionLevels: CompetitionLevel[] = [];
  constructor(private formBuilder: FormBuilder, private competitionService: CompetitionService) {
    this.buildForm();
  }

  ngOnInit() {
    this.competitionService.getCompetitionLevels().subscribe(levels => {
      this.competitionLevels = levels;
      if (!this.competitionForm.value.competitionLevelId.length) {
        this.competitionForm.get('competitionLevelId').setValue(this.competitionLevels[0].id);
      }
    });
  }

  onSubmit() {
    const competitionData = this.competitionForm.value as CompetitionFormSubmit;
    this.formSubmit.emit(competitionData);
  }

  private buildForm() {
    this.competitionForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      slug: ['', Validators.compose([Validators.required])],
      title: ['', Validators.compose([Validators.required])],
      description: [''],
      maxTeamSize: [5],
      minTeamSize: [1, Validators.compose([Validators.required, Validators.min(1)])],
      competitionLevelId: ['', Validators.compose([Validators.required])],
      ruleSlug: [''],
    });
  }
}
