import {Component, Inject, OnInit} from '@angular/core';
import {Exercise} from "../models/exercise";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Program} from "../models/program";
import {Workout} from "../models/workout";
import {AuthService} from "../auth/auth.service";

interface LogWorkoutDialogData {
  dialogTitle: string;
  selectedProgram: Program;
}

@Component({
  selector: 'app-log-workout-dialog',
  templateUrl: './log-workout-dialog.component.html',
  styleUrls: ['./log-workout-dialog.component.scss']
})
export class LogWorkoutDialogComponent implements OnInit {

  workoutForm: FormGroup;
  exercisesToComplete: Exercise[];

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              @Inject(MAT_DIALOG_DATA) public data: LogWorkoutDialogData,
              public dialogRef: MatDialogRef<LogWorkoutDialogComponent>) {
    this.workoutForm = fb.group({
      name: ['', Validators.required],
      comment: [''],
    });
    this.exercisesToComplete = this.data.selectedProgram.exercises;
    if (this.exercisesToComplete?.length > 0) {
      this.exercisesToComplete[0].isCompleted = true;
    }
  }

  ngOnInit(): void {
  }

  onSave(): void {
    if (this.workoutForm.valid) {
      const result = this.workoutFromForm;
      this.dialogRef.close(result);
    }
  }

  someExercisesComplete(): boolean {
    if (this.exercisesToComplete == null){
      return false;
    }
    return this.exercisesToComplete.filter(e => e.isCompleted).length > 0;
  }

  get workoutFromForm(): Workout {
    return {
      name: this.workoutForm.get('name').value,
      comment: this.workoutForm.get('comment').value,
      username: this.authService.currentUserValue.username,
      exercises: this.exercisesToComplete
    } as Workout;
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
