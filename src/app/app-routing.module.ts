import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {AllProgramsComponent} from "./all-programs/all-programs.component";
import {MyProgramsComponent} from "./my-programs/my-programs.component";
import {MyWorkoutsComponent} from "./my-workouts/my-workouts.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'programs', component: AllProgramsComponent },
  { path: 'myPrograms', component: MyProgramsComponent },
  { path: 'myWorkouts', component: MyWorkoutsComponent },
  { path: '', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
