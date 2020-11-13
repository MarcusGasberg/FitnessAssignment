import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
  isLoggedIn$: Observable<boolean>;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService
  ) {
    this.isLoggedIn$ = authService.currentUser.pipe(map((u) => !!u));
  }

  logout(): void {
    this.authService.logout();
  }
}
