import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Workout} from "../models/workout";
import {WorkoutService} from "../shared/workout.service";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-my-workouts',
  templateUrl: './my-workouts.component.html',
  styleUrls: ['./my-workouts.component.scss']
})
export class MyWorkoutsComponent implements OnInit {

  workouts$: Observable<Workout[]>;
  selectedWorkout: Workout;

  constructor(private workoutService: WorkoutService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getMyWorkouts();
  }

  getMyWorkouts(): void {
    this.workouts$ = this.workoutService.getWorkoutsByUsername();
  }

  onSelectedWorkout(workout: Workout): void {
    this.selectedWorkout = workout;
  }

  removeWorkout(): void {
    const dialogOptions = {
      width: '24rem',
      data: {
        title: `Are you sure?`,
        msg: `Are you sure you want to delete ${this.selectedWorkout.name}`,
      },
    };
    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogOptions);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.workoutService.removeWorkout(this.selectedWorkout._id).subscribe({
          next: () => {
            this.selectedWorkout = null;
            this.getMyWorkouts();
          },
        });
      }
    });
  }
}
