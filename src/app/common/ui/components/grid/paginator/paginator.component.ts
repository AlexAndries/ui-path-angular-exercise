import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { GridPaginator } from '../grid.model';
import { GridService } from '../grid.service';

@Component({
  selector: 't-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginatorComponent<T> {
  @Input() total!: number;
  @Input() pageSize!: number | null;
  @Input() currentPage!: number;
  @Output() paginatorChange = new EventEmitter<GridPaginator>();

  pageSizeOptions = [5, 10, 25, 50];

  constructor(private gridService: GridService<T>) {}

  get totalPages(): number {
    if (!this.pageSize) {
      return 1;
    }

    if (this.total % this.pageSize) {
      return Math.floor(this.total / this.pageSize) + 1;
    }

    return Math.floor(this.total / this.pageSize);
  }

  pageSizeChangeHandler(pageSize: number): void {
    const paginator: GridPaginator = {
      pageSize,
      currentPage: 1,
    };
    this.gridService.updatePaginator(paginator);
    this.paginatorChange.emit(paginator);
  }

  pageChangeHandler(page: number): void {
    const paginator: GridPaginator = {
      pageSize: this.pageSize,
      currentPage: page,
    };
    this.gridService.updatePaginator(paginator);
    this.paginatorChange.emit(paginator);
  }
}
