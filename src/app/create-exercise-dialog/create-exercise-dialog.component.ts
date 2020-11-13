import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {Exercise} from "../models/exercise";

@Component({
  selector: 'app-create-exercise-dialog',
  templateUrl: './create-exercise-dialog.component.html',
  styleUrls: ['./create-exercise-dialog.component.scss']
})
export class CreateExerciseDialogComponent implements OnInit {

  exerciseForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CreateExerciseDialogComponent>
  ) {
    this.exerciseForm = fb.group({
      name: ['', Validators.required],
      description: [''],
      sets: [''],
      repsOrTime: ['']
    });
  }

  ngOnInit(): void {
  }

  onSave(): void {
    if (this.exerciseForm.valid) {
      const result = this.exerciseFromForm;
      this.dialogRef.close(result);
    }
  }

  get exerciseFromForm(): Exercise {
    return {...this.exerciseForm.value} as Exercise;
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
