import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Program} from "../models/program";
import {AuthService} from "../auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class ProgramService {

  constructor(private http: HttpClient,
              private authService: AuthService) {
  }

  get(): Observable<Program[]> {
    return this.http.get<Program[]>(`${environment.apiUrl}/api/programs/`);
  }

  getByUsername(): Observable<Program[]> {
    return this.http.get<Program[]>(`${environment.apiUrl}/api/programs/${this.authService.currentUserValue.username}/programs`);
  }

  add(programName: string, username: string): Observable<Program> {
    return this.http.post<Program>(`${environment.apiUrl}/api/programs/`, {
      name: programName,
      username: username
    });
  }
}
