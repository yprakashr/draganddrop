import { Dialog, DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, EventEmitter, Inject, Output } from '@angular/core';
import {DialogData} from '../to-do/models/dialogData.model'
import { Task } from '../to-do/models/task.mode';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css']
})
export class PopUpComponent {

  constructor(
    public dialogRef: DialogRef<string>,
    @Inject(DIALOG_DATA) public data: DialogData
    ) {}

  deleteTask(){
    this.dialogRef.close('delete');
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
