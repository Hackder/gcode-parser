import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';
import { filter, map, Observable, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  isLoading$: Observable<boolean>;

  constructor(router: Router) {
    const validEvents = [
      NavigationStart,
      NavigationEnd,
      NavigationCancel,
      NavigationError,
    ];

    this.isLoading$ = router.events.pipe(
      filter((event) => validEvents.some((e) => event instanceof e)),
      map((event) => event instanceof NavigationStart)
    );
  }
}
