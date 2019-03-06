import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'gg-competition-form',
  templateUrl: './competition-form.component.html',
})
export class CompetitionFormComponent implements OnInit {
  public competitionForm: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.buildForm();
  }

  ngOnInit() {}

  onSubmit() {
    console.log('submit');
    console.log(this.competitionForm.value);
    return;
  }

  private buildForm() {
    this.competitionForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      slug: ['', Validators.compose([Validators.required])],
      title: ['', Validators.compose([Validators.required])],
      description: [''],
      maxTeamSize: [5],
      minTeamSize: [1, Validators.compose([Validators.required, Validators.min(1)])],
    });
  }
}
