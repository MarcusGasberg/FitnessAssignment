import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Program} from "../models/program";

@Injectable({
  providedIn: 'root'
})
export class ProgramService {

  constructor(private http: HttpClient) { }

  getPrograms(): Observable<Program[]> {
    return this.http.get<Program[]>(`${environment.apiUrl}/programs/`);
  }
}
