import {Component, OnInit} from '@angular/core';
import {ProgramService} from "../shared/program.service";
import {Program} from "../models/program";
import {filter, map} from "rxjs/operators";
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-my-programs',
  templateUrl: './my-programs.component.html',
  styleUrls: ['./my-programs.component.scss']
})
export class MyProgramsComponent implements OnInit {

  programs: Program[];
  selectedProgram: Program;

  constructor(private programService: ProgramService) {
  }

  ngOnInit(): void {
    this.programService
      .getUserPrograms()
      .pipe(filter((programs: Program[]) => programs?.length > 0))
      .subscribe(programs => {
        this.programs = programs;
        this.setSelectedProgram(programs[0]);
      });
  }

  setSelectedProgram(program: Program): void {
    this.selectedProgram = program;
  }
}
