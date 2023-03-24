import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GridComponent } from './grid.component';
import { ColumnComponent } from './column/column.component';
import { SortCellComponent } from './sort-cell/sort-cell.component';
import { PaginatorComponent } from './paginator/paginator.component';

@NgModule({
  declarations: [
    GridComponent,
    ColumnComponent,
    SortCellComponent,
    PaginatorComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [
    GridComponent,
    ColumnComponent,
  ],
})
export class GridModule {}
