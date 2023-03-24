export enum Direction {
  ASC = 'ascending',
  DESC = 'descending'
}

export interface GridSort<T> {
  columnName: keyof T;
  direction: Direction;
}

export interface GridPaginator {
  currentPage: number;
  pageSize: number | null;
}

export interface GridDataConfig<T> extends GridPaginator {
  data: T[],
  total: number;
}
