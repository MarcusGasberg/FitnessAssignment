import {Component, OnInit, ViewChild} from '@angular/core';
import {ProgramService} from '../shared/program.service';
import {Program} from '../models/program';
import {map} from 'rxjs/operators';
import {SaveProgramDialogComponent} from '../save-program-dialog/save-program-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {Observable} from 'rxjs';
import {SaveExerciseDialogComponent} from '../save-exercise-dialog/save-exercise-dialog.component';
import {Exercise} from '../models/exercise';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-my-programs',
  templateUrl: './my-programs.component.html',
  styleUrls: ['./my-programs.component.scss'],
})
export class MyProgramsComponent implements OnInit {
  programs$: Observable<Program[]>;
  selectedProgram: Program;

  constructor(
    private dialog: MatDialog,
    private programService: ProgramService
  ) {
  }

  @ViewChild('programDetails') programDetails;

  ngOnInit(): void {
    this.getMyPrograms();
  }

  getMyPrograms(): void {
    this.programs$ = this.programService.getProgramsByUsername();
  }

  onSelectedProgram(program: Program): void {
    this.selectedProgram = program;
  }

  addProgram(): void {
    const dialogOptions = {
      width: '24rem',
      height: '16rem',
    };
    const dialogRef = this.dialog.open(
      SaveProgramDialogComponent,
      dialogOptions
    );
    dialogRef.componentInstance.dialogTitle = 'New program';
    dialogRef.afterClosed().subscribe((result: Program) => {
      if (result) {
        this.programService
          .addProgram(result.name, result.username)
          .subscribe((_) => this.getMyPrograms());
      }
    });
  }

  updateProgram(): void {
    const dialogOptions = {
      width: '24rem',
      height: '16rem'
    };
    const dialogRef = this.dialog.open(
      SaveProgramDialogComponent,
      dialogOptions
    );
    dialogRef.componentInstance.dialogTitle = 'Edit program';
    dialogRef.afterClosed().subscribe((result: Program) => {
      if (result) {
        this.selectedProgram.name = result.name;
        this.programService
          .updateProgram(this.selectedProgram._id, this.selectedProgram)
          .subscribe((_) => {
            this.getMyPrograms();
          });
      }
    });
  }

  removeProgram(): void {
    const dialogOptions = {
      width: '24rem',
      data: {
        title: `Are you sure?`,
        msg: `Are you sure you want to delete ${this.selectedProgram.name}`,
      },
    };
    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogOptions);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.programService.removeProgram(this.selectedProgram._id).subscribe({
          next: () => {
            this.selectedProgram = null;
            this.getMyPrograms();
          },
        });
      }
    });
  }

  addExercise(): void {
    const dialogOptions = {
      width: '24rem',
      height: '32rem',
    };
    const dialogRef = this.dialog.open(
      SaveExerciseDialogComponent,
      dialogOptions
    );
    dialogRef.componentInstance.dialogTitle = 'New exercise';
    dialogRef.afterClosed().subscribe((result: Exercise) => {
      if (result) {
        this.programService
          .addExercise(this.selectedProgram._id, result)
          .subscribe((_) => {
            this.programService
              .getProgramsByUsername()
              .pipe(
                map((programs) =>
                  programs.find(
                    (program) => program._id === this.selectedProgram._id
                  )
                )
              )
              .subscribe((program) => {
                this.selectedProgram = program;
                this.getMyPrograms();
              });
          });
      }
    });
  }

  updateExercise(): void {
    const dialogOptions = {
      width: '24rem',
      height: '32rem',
    };
    const dialogRef = this.dialog.open(
      SaveExerciseDialogComponent,
      dialogOptions
    );
    dialogRef.componentInstance.dialogTitle = 'Edit exercise';
    dialogRef.afterClosed().subscribe((result: Exercise) => {
      if (result) {
        this.programService
          .updateExercise(
            this.selectedProgram._id,
            this.programDetails.selectedTableElement.exercise._id,
            result
          ).subscribe((_) => {
          this.programService
            .getProgramsByUsername()
            .pipe(
              map((programs) =>
                programs.find(
                  (program) => program._id === this.selectedProgram._id
                )
              )
            )
            .subscribe((program) => {
              this.selectedProgram = program;
              this.getMyPrograms();
            });
        });
      }
    });
  }

  removeExercise(): void {
    const dialogOptions = {
      width: '24rem',
      data: {
        title: `Are you sure?`,
        msg: `Are you sure you want to delete ${this.programDetails.selectedTableElement.exercise.name}`,
      },
    };
    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogOptions);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.programDetails.removeSelectedExercise().subscribe((_) => {
          this.programService
            .getProgramsByUsername()
            .pipe(
              map((programs) =>
                programs.find(
                  (program) => program._id === this.selectedProgram._id
                )
              )
            )
            .subscribe((program) => {
              this.selectedProgram = program;
              this.getMyPrograms();
            });
        });
      }
    });
  }
}
