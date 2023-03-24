import { ChangeDetectionStrategy, Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Direction } from '../grid.model';
import { GridService } from '../grid.service';

@Component({
  selector: 't-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColumnComponent<T> {
  @Input() name!: string;
  @Input() property!: keyof T;
  @Input() sortable = false;
  @ViewChild('headerCell', { static: true }) headerCellRef!: TemplateRef<any>;
  @ViewChild('rowCell', { static: true }) rowCellRef!: TemplateRef<any>;

  sortDirection$: Observable<Direction | undefined> = this.gridService.sort$.pipe(
    map((sort) => {
      if (sort?.columnName === this.property) {
        return sort.direction;
      }

      return undefined;
    }),
  );

  constructor(private gridService: GridService<T>) {}

  sortDirectionChangeHandler(direction?: Direction): void {
    if (!direction) {
      this.gridService.updateSort(undefined);
      return;
    }

    this.gridService.updateSort({
      columnName: this.property,
      direction,
    });
  }
}
