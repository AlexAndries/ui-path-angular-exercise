import {
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { BehaviorSubject, combineLatest, map, mergeMap, Observable, startWith, tap } from 'rxjs';
import { ColumnComponent } from './column/column.component';
import { Direction, GridDataConfig, GridPaginator, GridSort } from './grid.model';
import { GridService } from './grid.service';

@Component({
  selector: 't-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [GridService],
})
export class GridComponent<T extends { id: number }> implements OnChanges {
  @Input() data!: T[] | Observable<T[]>;
  @Input() pageSize!: number | null;
  @Input() sortable = false;
  @Output() sortChange = new EventEmitter<GridSort<T>>();
  @Output() paginationChange = new EventEmitter<GridPaginator>();
  @ContentChildren(ColumnComponent) columns!: ColumnComponent<T>[];

  private dataSet = new BehaviorSubject<T[]>([]);
  private dataSet$ = combineLatest([
    this.dataSet.pipe(
      mergeMap((dataSet) => this.data instanceof Observable ? this.data : [dataSet]),
    ),
    this.gridService.sort$.pipe(
      tap((sort?: GridSort<T>) => {
        this.sortChange.emit(sort);
      }),
      startWith(undefined),
    ),
  ]).pipe(
    map(([data, sort]) => {
      if (!sort) {
        return data;
      }

      return [...data].sort((a: T, b: T) => {
        if (sort.direction === Direction.DESC) {
          return b[sort.columnName]?.toString().localeCompare(a[sort.columnName]?.toString() || '') || 0;
        }

        return a[sort.columnName]?.toString().localeCompare(b[sort.columnName]?.toString() || '') || 0;
      });
    }),
  );

  dataConfig$: Observable<GridDataConfig<T>> = combineLatest([
    this.dataSet$,
    this.gridService.paginator$,
  ]).pipe(
    map(([dataSet, { pageSize, currentPage }]) => {
      if (!pageSize) {
        return {
          pageSize,
          currentPage,
          data: dataSet,
          total: dataSet.length,
        };
      }

      const data = dataSet.slice((currentPage - 1) * pageSize, currentPage * pageSize);

      return {
        pageSize,
        currentPage,
        data,
        total: dataSet.length,
      };
    }),
  );

  constructor(private gridService: GridService<T>) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      if (this.data instanceof Observable) {
        this.dataSet.next([]);
      }
      else {
        this.dataSet.next(this.data);
      }
    }

    if (changes['pageSize']) {
      this.gridService.updatePaginator({
        pageSize: this.pageSize,
        currentPage: 1,
      });
    }
  }

  trackRowsBy(index: number, row: T): number {
    return row.id;
  }

  trackColumnsBy(index: number, column: ColumnComponent<T>): keyof T {
    return column.property;
  }

  paginatorChangeHandler(paginator: GridPaginator): void {
    this.paginationChange.emit(paginator);
  }
}
