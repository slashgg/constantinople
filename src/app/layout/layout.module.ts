import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonComponent } from 'layout/components/button';
import { ClickoutDetectorComponent } from 'layout/components/clickout-detector/';
import { DropdownComponent } from 'layout/components/dropdown/dropdown';
import { DropdownHeadComponent } from 'layout/components/dropdown/dropdown-head';
import { DropdownTailComponent } from 'layout/components/dropdown/dropdown-tail';
import { InteractableComponent } from 'layout/components/interactable';
import { TailComponent } from 'layout/components/tail';

const COMPONENTS = [
  TailComponent,
  InteractableComponent,
  DropdownComponent,
  DropdownHeadComponent,
  DropdownTailComponent,
  ClickoutDetectorComponent,
  ButtonComponent,
];

@NgModule({
  imports: [CommonModule],
  declarations: COMPONENTS,
  exports: COMPONENTS,
})
export class LayoutModule {}
