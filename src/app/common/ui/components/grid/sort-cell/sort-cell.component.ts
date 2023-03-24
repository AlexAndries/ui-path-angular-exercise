import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { Direction } from '../grid.model';

@Component({
  selector: 't-sort-cell',
  templateUrl: './sort-cell.component.html',
  styleUrls: ['./sort-cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SortCellComponent {
  @Input() direction?: Direction;
  @Output() directionChange = new EventEmitter<Direction>();

  @HostListener('click')
  cellClickHandler(): void {
    if (!this.direction) {
      this.directionChange.emit(Direction.ASC);
      return;
    }

    this.directionChange.emit(this.direction === Direction.ASC ? Direction.DESC : undefined);
  }
}
