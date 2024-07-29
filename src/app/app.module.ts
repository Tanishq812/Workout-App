import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxChartsModule } from '@swimlane/ngx-charts'; // Import NgxChartsModule

import { AppComponent } from './app.component';
import { WorkoutFormComponent } from './workout-form/workout-form.component';

@NgModule({
  declarations: [
    AppComponent,
    WorkoutFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgxPaginationModule,
    NgxChartsModule // Add NgxChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
