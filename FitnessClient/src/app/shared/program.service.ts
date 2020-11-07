import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Program} from "../models/program";
import {AuthService} from "../auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class ProgramService {

  constructor(private http: HttpClient,
              private authService: AuthService) { }

  getPrograms(): Observable<Program[]> {
    return this.http.get<Program[]>(`${environment.apiUrl}/api/programs/`);
  }

  getUserPrograms(): Observable<Program[]> {
    return this.http.get<Program[]>(`${environment.apiUrl}/api/programs/${this.authService.currentUserValue.username}/programs`);
  }
}
