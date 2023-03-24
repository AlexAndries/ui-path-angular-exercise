import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GridModule } from '@ui-path/common/ui';
import { GridShowcaseComponent } from './grid-showcase.component';

@NgModule({
  declarations: [
    GridShowcaseComponent,
  ],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: GridShowcaseComponent,
      },
    ]),
    GridModule,
  ],
})
export class GridShowcaseModule {}
