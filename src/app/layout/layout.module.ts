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
import { InputComponent } from 'layout/components/input';
import { InteractableComponent } from 'layout/components/interactable';
import { SelectComponent } from 'layout/components/select';
import { TableComponent } from 'layout/components/table/table';
import { TableBodyComponent } from 'layout/components/table/table-body';
import { TableCellComponent } from 'layout/components/table/table-cell';
import { TableHeadComponent } from 'layout/components/table/table-head';
import { TableHeaderComponent } from 'layout/components/table/table-header';
import { TableRowComponent } from 'layout/components/table/table-row';
import { TailComponent } from 'layout/components/tail';
import { TextAreaComponent } from 'layout/components/text-area';

const COMPONENTS = [
  TailComponent,
  InteractableComponent,
  DropdownComponent,
  DropdownHeadComponent,
  DropdownTailComponent,
  ClickoutDetectorComponent,
  ButtonComponent,
  InputComponent,
  FormGroupComponent,
  TextAreaComponent,
  SelectComponent,
  TableComponent,
  TableCellComponent,
  TableHeadComponent,
  TableHeaderComponent,
  TableBodyComponent,
  TableRowComponent,
];

@NgModule({
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  declarations: COMPONENTS,
  exports: COMPONENTS,
})
export class LayoutModule {}
