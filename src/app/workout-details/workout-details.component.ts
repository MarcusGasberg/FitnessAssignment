import {Component, Input, OnInit} from '@angular/core';
import {Workout} from "../models/workout";

@Component({
  selector: 'app-workout-details',
  templateUrl: './workout-details.component.html',
  styleUrls: ['./workout-details.component.scss']
})
export class WorkoutDetailsComponent implements OnInit {

  @Input() workout: Workout;
  columns: string[] = ['exercise', 'description', 'sets', 'repsOrTime', 'completed'];

  constructor() { }

  ngOnInit(): void {
  }

}
