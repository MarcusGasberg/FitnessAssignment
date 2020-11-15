import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUser$: BehaviorSubject<User>;

  constructor(
    private http: HttpClient,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.currentUser$ = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
  }

  public get currentUserValue(): User {
    return this.currentUser$.value;
  }

  get currentUser(): Observable<User> {
    return this.currentUser$.asObservable();
  }

  login(username: string, password: string): Observable<User> {
    return this.http
      .post<any>(`${environment.apiUrl}/api/users/authenticate`, {
        username,
        password,
      })
      .pipe(
        map((user: User) => {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUser$.next(user);
          return user;
        })
      );
  }

  register(user: User): Observable<User> {
    return this.http
      .post<any>(`${environment.apiUrl}/api/users/register`, user)
      .pipe(
        map((result: User) => {
          localStorage.setItem('currentUser', JSON.stringify(result));
          this.currentUser$.next(result);
          return result;
        })
      );
  }

  logout(): void {
    const dialogOptions = {
      width: '20rem',
      data: {
        title: 'Logout',
        msg: 'Are you sure you want to logout?',
      },
    };
    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogOptions);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        localStorage.removeItem('currentUser');
        this.currentUser$.next(null);
        this.router.navigate(['/']);
      }
    });
  }
}
