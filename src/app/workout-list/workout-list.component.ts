import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Workout} from "../models/workout";

@Component({
  selector: 'app-workout-list',
  templateUrl: './workout-list.component.html',
  styleUrls: ['./workout-list.component.scss']
})
export class WorkoutListComponent implements OnInit {

  @Input() myWorkouts: Workout[];
  @Output() selected = new EventEmitter<Workout>();
  selectedWorkoutId: string;

  constructor() { }

  ngOnInit(): void {
  }

  onSelected(workout: Workout): void {
    this.selectedWorkoutId = workout._id;
    this.selected.emit(workout);
  }
}
