import { NgModule } from '@angular/core';
import { CommonUiModule } from '@ui-path/common/ui';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [
    CommonUiModule,
  ],
  exports: [DashboardComponent],
})
export class DashboardModule {}
