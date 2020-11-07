import {Component, OnInit} from '@angular/core';
import {ProgramService} from "../shared/program.service";
import {Program} from "../models/program";
import {filter} from "rxjs/operators";
import {CreateProgramDialogComponent} from "../create-program-dialog/create-program-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {Observable} from "rxjs";

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
    this.programs$ = this.programService.getByUsername();
  }

  setSelectedProgram(program: Program): void {
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
        this.programService.add(result.name, result.username)
          .subscribe(_ => this.getMyPrograms());
      }
    });
  }
}
