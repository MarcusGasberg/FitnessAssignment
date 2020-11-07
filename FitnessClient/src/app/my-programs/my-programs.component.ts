import {Component, OnInit} from '@angular/core';
import {ProgramService} from "../shared/program.service";
import {Program} from "../models/program";
import {filter, find, map} from "rxjs/operators";
import {CreateProgramDialogComponent} from "../create-program-dialog/create-program-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {Observable} from "rxjs";
import {CreateExerciseDialogComponent} from "../create-exercise-dialog/create-exercise-dialog.component";
import {Exercise} from "../models/exercise";

@Component({
  selector: 'app-my-programs',
  templateUrl: './my-programs.component.html',
  styleUrls: ['./my-programs.component.scss']
})
export class MyProgramsComponent implements OnInit {

  programs$: Observable<Program[]>;
  selectedProgram: Program;

  constructor(private dialog: MatDialog,
              private programService: ProgramService) {
  }

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
      CreateProgramDialogComponent,
      dialogOptions
    );
    dialogRef.afterClosed().subscribe((result: Program) => {
      if (result) {
        this.programService.addProgram(result.name, result.username)
          .subscribe(_ => this.getMyPrograms());
      }
    });
  }

  addExercise(): void {
    const dialogOptions = {
      width: '24rem',
      height: '32rem',
    };
    const dialogRef = this.dialog.open(
      CreateExerciseDialogComponent,
      dialogOptions
    );
    dialogRef.afterClosed().subscribe((result: Exercise) => {
      if (result) {
        this.programService.addExercise(this.selectedProgram._id, result)
          .subscribe(_ => {
            this.programService.getProgramsByUsername().pipe(
              map(programs => programs.find(program => program._id === this.selectedProgram._id)))
              .subscribe(program => {
                this.selectedProgram = program;
                this.getMyPrograms();
              })
          });
      }
    });
  }
}
