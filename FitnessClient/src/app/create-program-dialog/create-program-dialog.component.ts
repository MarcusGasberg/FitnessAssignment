import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Program} from "../models/program";
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-create-program-dialog',
  templateUrl: './create-program-dialog.component.html',
  styleUrls: ['./create-program-dialog.component.scss']
})
export class CreateProgramDialogComponent implements OnInit {

  programForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    public dialogRef: MatDialogRef<CreateProgramDialogComponent>
  ) {
    this.programForm = fb.group({
      name: ['', Validators.required]
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
