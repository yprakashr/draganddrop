import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { ToDoComponent } from './component/to-do/to-do-details/to-do.component';
import { ToDoDetailsComponent } from './component/to-do/to-do-details.component';
import { PopUpComponent } from './component/pop-up/pop-up.component';
import {DialogModule} from '@angular/cdk/dialog';
import { FieldErrorComponent } from './component/field-error/field-error.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ToDoComponent,
    ToDoDetailsComponent,
    PopUpComponent,
    FieldErrorComponent
  ],
  imports: [
    BrowserModule,
    MatCardModule,
    MatToolbarModule,
    DragDropModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    CdkAccordionModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    DialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

