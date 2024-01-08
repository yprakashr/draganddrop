import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Task } from '../to-do/models/task.mode';
import { ToDoDetailsComponent } from '../to-do/to-do-details.component';
import { ToDoComponent } from '../to-do/to-do-details/to-do.component';
import { ButtonService } from 'src/app/button.service';
import { ToastrService } from 'ngx-toastr';

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

  constructor(
    private buttonService: ButtonService,
    private toastr: ToastrService
  ) {}
  form: any;
  ngOnInit(): void {
    this.form = false;
  }

  public addTasks($event: any) {
    this.updatedTask = null;
    this.newTask = $event as Task;
  }
  handleClick() {
    // Emitting a button click event through the service
    this.buttonService.sendButtonClick();
  }
 // Function to edit a task
public editTask(task: any) {
  this.form = true;
  this.newTask = null;
  this.updatedTask = null;
  this.formValues = { ...task }; 
  console.log(this.form&&this.formValues)
}

  public updateTask($event: any) {
    this.formValues = null;
    this.newTask = null;
    this.updatedTask = $event;
    this.form = false;
    this.toastr.success('Successfully updated');
  }

  public cancelTask($event: any) {
    this.formValues = null;
    this.newTask = null;
    this.updatedTask = null;
    this.form = false;
  }
}
