import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from './models/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUser$: BehaviorSubject<User>;

  constructor(private http: HttpClient) {
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
      .post<any>(`${environment.apiUrl}/users/authenticate`, {
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

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUser$.next(null);
  }
}
