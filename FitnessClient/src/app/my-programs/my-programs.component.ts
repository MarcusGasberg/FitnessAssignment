import {Component, OnInit} from '@angular/core';
import {ProgramService} from "../shared/program.service";
import {Program} from "../models/program";
import {map} from "rxjs/operators";
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-my-programs',
  templateUrl: './my-programs.component.html',
  styleUrls: ['./my-programs.component.scss']
})
export class MyProgramsComponent implements OnInit {

  programs: Program[];
  selectedProgram: Program;

  constructor(private programService: ProgramService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.programService.getPrograms()
      .pipe(map(programs =>
        programs.filter(program =>
          program.userName === this.authService.currentUserValue.username)))
      .subscribe((programs: Program[]) => {
        this.programs = programs;
        if (this.programs.length > 0) {
          this.selectedProgram = this.programs[0];
        }
      });
  }

  setSelectedProgram(program: Program): void {
    this.selectedProgram = program;
  }
}
