import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 't-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressComponent {
  @HostBinding('style.color')
  @Input() color!: string;
  defaultColor = '#EAEAEAFF';

  private _radius!: number;

  get radius(): number {
    return this._radius;
  }

  @Input()
  set radius(value: number) {
    if (value < 50) {
      throw new Error('Input \'radius\' can\'t be lower than 50');
    }
    this._radius = value;
  }

  private _progress!: number;

  get progress(): number {
    return this._progress;
  }

  @Input()
  set progress(value: number) {
    if (value < 0) {
      throw new Error('Input \'progress\' can\'t be lower than 0');
    }
    if (value > 100) {
      throw new Error('Input \'progress\' can\'t be higher than 100');
    }
    this._progress = value;
  }

  @HostBinding('style.width.px')
  @HostBinding('style.height.px')
  get diameter(): number {
    return this.radius * 2;
  }

  get rotation(): string {
    if (this.progress <= 50) {
      const degrees = (100 - (50 - this.progress)) / 100 * -360;
      return `rotate(${degrees}deg)`;
    }

    const degrees = (100 - this.progress) / 100 * 360;
    return `rotate(${degrees}deg)`;
  }
}
