import { Component, OnInit } from '@angular/core';
import {ProgramService} from "../shared/program.service";
import {Program} from "../models/program";

@Component({
  selector: 'app-all-programs',
  templateUrl: './all-programs.component.html',
  styleUrls: ['./all-programs.component.scss']
})
export class AllProgramsComponent implements OnInit {

  programs: Program[];
  columns: string[] = ['exercise', 'description', 'sets', 'repsOrTime'];

  constructor(private programService: ProgramService) { }

  ngOnInit(): void {
    this.programService.get()
      .subscribe(programs => this.programs = programs);
  }
}
