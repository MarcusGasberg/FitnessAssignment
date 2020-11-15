import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Program} from "../models/program";
import {AuthService} from "../auth/auth.service";

interface SaveProgramDialogData {
  dialogTitle: string;
  programName: string;
}

@Component({
  selector: 'app-create-program-dialog',
  templateUrl: './save-program-dialog.component.html',
  styleUrls: ['./save-program-dialog.component.scss']
})
export class SaveProgramDialogComponent implements OnInit {

  programForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: SaveProgramDialogData,
    public dialogRef: MatDialogRef<SaveProgramDialogComponent>
  ) {
    this.programForm = fb.group({
      name: [data.programName, Validators.required]
    });
  }

  ngOnInit(): void {
  }

  onSave(): void {
    if (this.programForm.valid) {
      const result = this.programFromForm;
      this.dialogRef.close(result);
    }
  }

  get programFromForm(): Program {
    return {
      name: this.programForm.get('name').value,
      username: this.authService.currentUserValue.username,
      exercises: []
    } as Program;
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
