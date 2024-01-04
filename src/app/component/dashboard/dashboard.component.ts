import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Task } from '../to-do/models/task.mode';
import { ToDoDetailsComponent } from '../to-do/to-do-details.component';
import { ToDoComponent } from '../to-do/to-do-details/to-do.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  newTask!: any;
  formValues!: any;
  updatedTask!: any;

  currentYear = new Date().getFullYear();

  constructor() {}
form:any;
  ngOnInit(): void {}
 
  public addTasks($event: any) {
    this.updatedTask = null;
    this.newTask = $event as Task;
  }

  public editTask(task: any) {
    this.newTask = null;
    this.updatedTask = null;
    this.formValues = task;
  }

  public updateTask($event: any) {
    this.formValues = null;
    this.newTask = null;
    this.updatedTask = $event;
  }

  public cancelTask($event: any) {
    this.formValues = null;
    this.newTask = null;
    this.updatedTask = null;
  }
}
