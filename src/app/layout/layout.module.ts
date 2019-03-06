import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from 'layout/components/button';
import { ClickoutDetectorComponent } from 'layout/components/clickout-detector/';
import { DropdownComponent } from 'layout/components/dropdown/dropdown';
import { DropdownHeadComponent } from 'layout/components/dropdown/dropdown-head';
import { DropdownTailComponent } from 'layout/components/dropdown/dropdown-tail';
import { FormGroupComponent } from 'layout/components/form-group';
import { InteractableComponent } from 'layout/components/interactable';
import { TailComponent } from 'layout/components/tail';
import { TextInputComponent } from 'layout/components/text-input';

const COMPONENTS = [
  TailComponent,
  InteractableComponent,
  DropdownComponent,
  DropdownHeadComponent,
  DropdownTailComponent,
  ClickoutDetectorComponent,
  ButtonComponent,
  TextInputComponent,
  FormGroupComponent,
];

@NgModule({
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  declarations: COMPONENTS,
  exports: COMPONENTS,
})
export class LayoutModule {}
