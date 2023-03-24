import { ChangeDetectionStrategy, Component } from '@angular/core';
import { interval, map, startWith } from 'rxjs';

@Component({
  selector: 't-progress-showcase',
  templateUrl: './progress-showcase.component.html',
  styleUrls: ['./progress-showcase.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgressShowcaseComponent {
  progress$ = interval(2000).pipe(
    startWith(0),
    map(() => ({
      progress: Math.floor(Math.random() * 100),
      color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
      radius: Math.floor(Math.random() * 400) + 50
    })),
  );
}
