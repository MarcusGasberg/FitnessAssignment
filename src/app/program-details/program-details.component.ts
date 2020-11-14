import {Component, Input, OnChanges} from '@angular/core';
import {Program} from "../models/program";
import {Exercise} from "../models/exercise";
import {MatTableDataSource} from "@angular/material/table";
import {Router} from "@angular/router";

export interface TableElement {
  exercise: Exercise,
  position: number
}

@Component({
  selector: 'app-program-details',
  templateUrl: './program-details.component.html',
  styleUrls: ['./program-details.component.scss']
})
export class ProgramDetailsComponent implements OnChanges {

  @Input() program: Program;
  columns: string[] = ['exercise', 'description', 'sets', 'repsOrTime', 'select'];
  selectedTableElement: TableElement;
  dataSource = new MatTableDataSource<TableElement>();

  constructor(private router: Router) {
  }

  ngOnChanges(): void {
    this.selectedTableElement = null;
    this.dataSource.data = [];
    for (let i = 0; i < this.program?.exercises.length; i++) {
      this.dataSource.data = [...this.dataSource.data, this.createTableElement(this.program.exercises[i], i)];
    }
  }

  onElementSelected(element: any): void {
    this.selectedTableElement = element;
  }

  createTableElement(exercise: Exercise, index: number): TableElement {
    return {exercise: exercise, position: index} as TableElement;
  }

  isMyProgramsRoute() {
    return this.router.url.includes('/myPrograms');
  }
}
