import {Component, Input, OnInit, Output} from '@angular/core';
import {Program} from "../models/program";
import {EventEmitter} from "@angular/core";

@Component({
  selector: 'app-program-list',
  templateUrl: './program-list.component.html',
  styleUrls: ['./program-list.component.scss']
})
export class ProgramListComponent implements OnInit {

  @Input() myPrograms: Program[];
  @Output() selected = new EventEmitter<Program>();
  selectedProgramId: string;

  constructor() {
  }

  ngOnInit(): void {
  }

  onSelected(program: Program): void {
    this.selectedProgramId = program._id;
    this.selected.emit(program);
  }
}
