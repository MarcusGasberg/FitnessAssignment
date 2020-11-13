import { Component, OnInit } from '@angular/core';
import { ProgramService } from '../shared/program.service';
import { Program } from '../models/program';
import { AuthService } from '../auth/auth.service';
import { filter, mergeAll, mergeMap, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-all-programs',
  templateUrl: './all-programs.component.html',
  styleUrls: ['./all-programs.component.scss'],
})
export class AllProgramsComponent implements OnInit {
  programs: Program[];
  columns: string[] = ['exercise', 'description', 'sets', 'repsOrTime'];
  selectedProgram: Program;

  currentUser$ = this.authService.currentUser;

  constructor(
    private programService: ProgramService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.programService
      .getPrograms()
      .subscribe((programs) => (this.programs = programs));
  }

  onSelectedProgram(program: Program): void {
    this.selectedProgram = program;
  }

  importProgram(): void {
    const currUser = this.authService.currentUserValue;
    if (currUser) {
      this.programService
        .addProgram(this.selectedProgram.name, currUser.fullname)
        .pipe(
          mergeMap((program: Program) =>
            this.selectedProgram.exercises.map((exercise) =>
              this.programService.addExercise(program._id, exercise)
            )
          ),
          mergeAll(),
          mergeMap((_) => this.programService.getPrograms())
        )
        .subscribe((programs) => (this.programs = programs));
    }
  }
}
