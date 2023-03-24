import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProgressModule } from './components/progress';
import { GridModule } from './components/grid';

@NgModule({
  imports: [
    CommonModule,
    GridModule,
    ProgressModule,
  ],
  exports: [
    CommonModule,
    GridModule,
    ProgressModule,
  ],
})
export class CommonUiModule {}
