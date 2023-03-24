import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProgressModule } from '@ui-path/common/ui';
import { ProgressShowcaseComponent } from './progress-showcase.component';

@NgModule({
  declarations: [
    ProgressShowcaseComponent,
  ],
  imports: [
    CommonModule,
    ProgressModule,
    RouterModule.forChild([
      {
        path: '',
        component: ProgressShowcaseComponent,
      },
    ]),
  ],
})
export class ProgressShowcaseModule {}
