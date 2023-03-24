import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { GridPaginator, GridSort } from './grid.model';

@Injectable()
export class GridService<T> {
  private sort = new Subject<GridSort<T> | undefined>();
  sort$ = this.sort.asObservable();
  private paginator = new BehaviorSubject<GridPaginator>({
    pageSize: null,
    currentPage: 1,
  });
  paginator$ = this.paginator.asObservable();

  updateSort(sort?: GridSort<T>): void {
    this.sort.next(sort);
  }

  updatePaginator(paginator: GridPaginator): void {
    this.paginator.next(paginator);
  }
}
