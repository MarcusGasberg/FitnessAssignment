import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NavComponent } from './nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { AllProgramsComponent } from './all-programs/all-programs.component';
import { MatTableModule } from "@angular/material/table";
import {FlexLayoutModule} from "@angular/flex-layout";
import { MyProgramsComponent } from './my-programs/my-programs.component';
import { ProgramListComponent } from './program-list/program-list.component';
import { ProgramDetailsComponent } from './program-details/program-details.component';
import {MatTooltipModule} from "@angular/material/tooltip";
import { CreateProgramDialogComponent } from './create-program-dialog/create-program-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import { CreateExerciseDialogComponent } from './create-exercise-dialog/create-exercise-dialog.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, NavComponent, RegisterComponent, HomeComponent, AllProgramsComponent, MyProgramsComponent, ProgramListComponent, ProgramDetailsComponent, CreateProgramDialogComponent, CreateExerciseDialogComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    HttpClientModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    FlexLayoutModule,
    MatTooltipModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
