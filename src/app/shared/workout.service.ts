import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../auth/auth.service";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {Workout} from "../models/workout";

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  addWorkout(workout: Workout): Observable<Workout> {
    console.log(JSON.stringify(workout));
    return this.http.post<Workout>(`${environment.apiUrl}/api/workouts`, {
      name: workout.name,
      username: workout.username,
      comment: workout.comment,
      exercises: workout.exercises
    });
  }

  getWorkoutsByUsername(): Observable<Workout[]> {
    return this.http.get<Workout[]>(
      `${environment.apiUrl}/api/workouts/${this.authService.currentUserValue.username}`
    );
  }
}
