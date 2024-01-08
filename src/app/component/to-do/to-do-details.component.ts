import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { MatSnackBar } from '@angular/material/snack-bar';
import { v4 as uuid } from 'uuid';
import { Column } from './models/column.model';
import { TodoBoard1 } from './models/todo.model';
import { Task } from './models/task.mode';
import { Dialog, DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { PopUpComponent } from '../pop-up/pop-up.component';
import IdUtils from 'src/app/utils/id.util';
import { ButtonService } from 'src/app/button.service';

@Component({
  selector: 'app-to-do-details',
  templateUrl: './to-do-details.component.html',
  styleUrls: ['./to-do-details.component.css'],
})
export class ToDoDetailsComponent implements OnChanges {
  @Input() newTask!: Task;
  @Input() updatedTask!: Task;
  @Output() onTaskEdit = new EventEmitter<Task>();
  @Output() showModal = new EventEmitter<any>();
  @Output() customEvent = new EventEmitter<string>();
  targetColumnName!: string;
  form: boolean = true;
  columnMap: any;
  // Initialize variables
  searchQuery: string = '';
  filteredTasks: Task[] = [];
  originalToDoBoardData: any; // Replace 'any' with the appropriate type

  initializeToDoBoard() {
    this.originalToDoBoardData = this.toDoBoard1;
    // this.toDoBoard1 = /* Your original data */;
  }
  onSearchChange() {
    const query = this.searchQuery.toLowerCase().trim();

    if (!query) {
      this.toDoBoard1 = { ...this.originalToDoBoardData };
      return;
        }

    this.toDoBoard1.columns.forEach((column) => {
      column.task = column.task.filter(
        (task) =>
          task.name.toLowerCase().includes(query) ||
          task.age.toString().includes(query) // Convert age to string for search
      );
    });
  
  }

  sortTasksByName(column: Column) {
    column.task.sort((a, b) => a.name.localeCompare(b.name));
  }

  constructor(public snackBar: MatSnackBar, public dialog: Dialog, private buttonService: ButtonService) {}

  ngOnInit() {
    this.getTaskList();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.updateTask(this.updatedTask);
    this.addTask(this.newTask);
    this.getTaskList();
  }

  public toDoBoard1: TodoBoard1 = new TodoBoard1('TODO LIST', [
    new Column('Age 1-18', []),
    new Column('Age 19-25', []),
    new Column('Age 25-45', []),
    new Column('Age 45-80', []),
  ]);

  drop(event: CdkDragDrop<Task[]>, columnName: string) {
    this.targetColumnName = columnName;
    console.log(this.targetColumnName);
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      const taskToMove = event.previousContainer.data[event.previousIndex];
      taskToMove.age = this.getAgeFromColumnName(this.targetColumnName);

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      localStorage.setItem(
        'toDoBoardData',
        JSON.stringify(this.toDoBoard1.columns)
      );
    }
  }

  getAgeFromColumnName(columnName: string): number {
    switch (columnName) {
      case 'Age 1-18':
        return 18;
      case 'Age 19-25':
        return 25;
      case 'Age 25-45':
        return 45;
      case 'Age 45-80':
        return 80;
      default:
        return 0; // Default value if the column name doesn't match
    }
  }

  autoDeleteTask() {
    this.openSnackBar();
    setTimeout(() => {
      this.toDoBoard1.columns[5].task = [];
    }, 10000);
  }

  openSnackBar() {
    this.snackBar.open(
      'Items in DONE state will be deleted in 10 Seconds.',
      'OK',
      {
        duration: 2000,
      }
    );
  }

  getTaskList() {
    let taskList = localStorage.getItem('toDoBoardData');
    if (!taskList) return;
    this.toDoBoard1.columns = JSON.parse(taskList);
  }
  // Function to sort tasks in a column by task name

  addTask(task: Task) {
    if (!task) return;

    task.id = IdUtils.getUUID(); // Assigning a unique ID to the task

    const age = task.age; // Assuming task has an 'age' property

    if (age >= 1 && age <= 18) {
      this.toDoBoard1.columns[0].task.push(task); // Add task to the first column for Age 1-18
    } else if (age >= 19 && age <= 25) {
      this.toDoBoard1.columns[1].task.push(task); // Add task to the second column for Age 19-25
    } else if (age >= 26 && age <= 45) {
      this.toDoBoard1.columns[2].task.push(task); // Add task to the third column for Age 26-45
    } else if (age >= 46 && age <= 80) {
      this.toDoBoard1.columns[3].task.push(task); // Add task to the fourth column for Age 46-80
    }

    // Update the storage or perform other necessary operations
    localStorage.setItem(
      'toDoBoardData',
      JSON.stringify(this.toDoBoard1.columns)
    );
  }
  updateTask(updatedTask: Task) {
    if (!updatedTask) return;

    // Loop through columns and tasks to find and update the task
    this.toDoBoard1.columns.forEach((col) => {
      col.task.forEach((task) => {
        if (task.id === updatedTask.id) {
          task.name = updatedTask.name;
          task.email = updatedTask.email;
          task.phone = updatedTask.phone;
          task.age = updatedTask.age;
        }
      });
    });

    const age = updatedTask.age;

    // Remove the task from any column it's already in
    this.toDoBoard1.columns.forEach((col) => {
      col.task = col.task.filter((task) => task.id !== updatedTask.id);
    });

    // Add the updated task to the appropriate column based on age
    if (age >= 1 && age <= 18) {
      this.toDoBoard1.columns[0].task.push(updatedTask);
    } else if (age >= 19 && age <= 25) {
      this.toDoBoard1.columns[1].task.push(updatedTask);
    } else if (age >= 26 && age <= 45) {
      this.toDoBoard1.columns[2].task.push(updatedTask);
    } else if (age >= 46 && age <= 80) {
      this.toDoBoard1.columns[3].task.push(updatedTask);
    } else {
      // Handle tasks that don't fit into any defined age range
      // For example, you might choose to ignore or handle them differently
      console.log("Task doesn't fit into any age range");
    }
    localStorage.setItem(
      'toDoBoardData',
      JSON.stringify(this.toDoBoard1.columns)
    );
  }

  editTask(task: Task) {
    this.onTaskEdit.emit(task);
    this.buttonService.setFormVisibility("false");
  }

  deleteTask(item: any) {
    console.log('deleteTask');
    const dialogRef = this.dialog.open<string>(PopUpComponent, {
      width: '300px',
      data: { title: 'Are you sure you want to delete?', data: item },
    });

    dialogRef.closed.subscribe((result) => {
      if (!result) return;
      this.toDoBoard1.columns.forEach((col) => {
        col.task = col.task.filter((tsk) => {
          return tsk.id !== item.id;
        });
      });
      localStorage.setItem(
        'toDoBoardData',
        JSON.stringify(this.toDoBoard1.columns)
      );
    });
  }
}
