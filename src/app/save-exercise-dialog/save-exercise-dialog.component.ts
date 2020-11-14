import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Exercise} from "../models/exercise";

interface SaveExerciseDialogData {
  dialogTitle: string;
  exerciseToSave: Exercise;
}

@Component({
  selector: 'app-create-exercise-dialog',
  templateUrl: './save-exercise-dialog.component.html',
  styleUrls: ['./save-exercise-dialog.component.scss']
})
export class SaveExerciseDialogComponent implements OnInit {

  exerciseForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: SaveExerciseDialogData,
    public dialogRef: MatDialogRef<SaveExerciseDialogComponent>
  ) {
    this.exerciseForm = fb.group({
      name: [this.data.exerciseToSave.name, Validators.required],
      description: [this.data.exerciseToSave.description],
      sets: [this.data.exerciseToSave.sets],
      repsOrTime: [this.data.exerciseToSave.repsOrTime]
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
