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

  constructor(public snackBar: MatSnackBar, public dialog: Dialog) {}

  ngOnInit() {
    this.getTaskList();
  }

  column1 = [
    {
      name: 'AGE 1-18',
      name2: 'AGE 19-25',
      name3: 'AGE 25-45',
      name4: 'AGE 45-80',
    },
  ];
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

  // drop(event: CdkDragDrop<Task[]>) {
  //   // console.log(event)
  //   if (event.previousContainer === event.container) {
  //     moveItemInArray(
  //       event.container.data,
  //       event.previousIndex,
  //       event.currentIndex
  //     );

  //   } else {
  //     transferArrayItem(
  //       event.previousContainer.data,
  //       event.container.data,
  //       event.previousIndex,
  //       event.currentIndex
  //     );
  //     if (event.container.id === 'cdk-drop-list-3') {
  //       this.autoDeleteTask();
  //     }
  //   }
  //   console.log(event.previousContainer.data)
  //   localStorage.setItem(
  //     'toDoBoardData',
  //     JSON.stringify(this.toDoBoard1.columns)
  //   );
  // }

  getAgeFromColumnName(columnName: string): number {
    switch (columnName) {
      case 'cdk-drop-list-0':
        return 18;
      case 'cdk-drop-list-1':
        return 25;
      case 'cdk-drop-list-2':
        return 45;
      case 'cdk-drop-list-3':
        return 80;
      default:
        return 0; // Default value if the column name doesn't match
    }
  }
  
  // Modify the drop method to use the new column names and age ranges
  drop(event: CdkDragDrop<Task[]>) {
    this.targetColumnName = event.container.id;
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
  
      localStorage.setItem('toDoBoardData', JSON.stringify(this.toDoBoard1.columns));
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

  addTask(task: Task) {
    if (!task) return;
    task.id = IdUtils.getUUID();
    this.toDoBoard1.columns[0].task.push(task);
    localStorage.setItem(
      'toDoBoardData',
      JSON.stringify(this.toDoBoard1.columns)
    );
  }

  updateTask(updatedTask: Task) {
    if (!updatedTask) return;
    this.toDoBoard1.columns.forEach((col) => {
      col.task.forEach((task) => {
        if (task.id == updatedTask.id) {
          task.name = updatedTask.name;
          task.email = updatedTask.email;
          task.phone = updatedTask.phone;
          task.age = updatedTask.age;
          return;
        }
      });
    });
    localStorage.setItem(
      'toDoBoardData',
      JSON.stringify(this.toDoBoard1.columns)
    );
  }

  editTask(task: Task) {
    this.onTaskEdit.emit(task);
    // this.customEvent.emit('true');
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
