import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Program } from '../models/program';
import { AuthService } from '../auth/auth.service';
import { Exercise } from '../models/exercise';

@Injectable({
  providedIn: 'root',
})
export class ProgramService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  getPrograms(): Observable<Program[]> {
    return this.http.get<Program[]>(`${environment.apiUrl}/api/programs`);
  }

  getProgramsByUsername(): Observable<Program[]> {
    return this.http.get<Program[]>(
      `${environment.apiUrl}/api/programs/${this.authService.currentUserValue.username}`
    );
  }

  addProgram(programName: string, username: string): Observable<Program> {
    return this.http.post<Program>(`${environment.apiUrl}/api/programs`, {
      name: programName,
      username: username,
    });
  }

  updateProgram(programId: string, program: Program): Observable<object> {
    return this.http.put(`${environment.apiUrl}/api/programs/${programId}`, {
      id: program._id,
      name: program.name,
      username: program.username,
      exercises: program.exercises
    });
  }

  removeProgram(programId: string): Observable<object> {
    return this.http.delete(`${environment.apiUrl}/api/programs/${programId}`);
  }

  addExercise(programId: string, exercise: Exercise): Observable<Exercise> {
    return this.http.post<Exercise>(
      `${environment.apiUrl}/api/programs/${programId}/exercises`,
      {
        name: exercise.name,
        description: exercise.description,
        sets: exercise.sets,
        repsOrTime: exercise.repsOrTime,
      }
    );
  }

  removeExercise(programId: string, exerciseId: string): Observable<object> {
    return this.http.delete(`${environment.apiUrl}/api/programs/${programId}/exercises/${exerciseId}`);
  }
}
