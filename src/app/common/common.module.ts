import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PermissionGateComponent } from 'common/components/permission-gate';

export const DECLARATIONS = [PermissionGateComponent];

@NgModule({
  imports: [CommonModule],
  declarations: DECLARATIONS,
  exports: DECLARATIONS,
})
export class SlashCommonModule {}
