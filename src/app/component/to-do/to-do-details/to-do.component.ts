import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Task } from '../models/task.mode';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css'],
})
export class ToDoComponent implements OnInit, OnChanges {
  @Output() onTaskAdd = new EventEmitter<any>();
  @Output() onTaskUpdate = new EventEmitter<any>();
  @Output() onTaskCancel = new EventEmitter<any>();
  @Input() formValues!: Task;

  btnTitle: string = 'Submit';
  validForm: boolean = true;
  formSubmitAttempt = false;

  form: FormGroup = this.fb.group({
    id: [],
    name: [
      null,
      [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(100),
        Validators.pattern('^(?! ).*[^ ]$'),
      ],
    ],
    email: [
      null,
      [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(155),
        Validators.pattern('/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/;'),
      ],
    ],
    phone: [
      null,
      [
        Validators.required,
        Validators.minLength(10),
        // Validators.maxLength(155),
        Validators.pattern('^(?! ).*[^ ]$'),
      ],
    ],
    age: [
      null,
      [
        Validators.required,
        // Validators.minLength(10),
        // Validators.maxLength(155),
        Validators.pattern('^(?! ).*[^ ]$'),
      ],
    ],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [],
      name: [
        null,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(100),
          Validators.pattern('^(?! ).*[^ ]$'),
        ],
      ],
      email: [
        null,
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(155),
          Validators.pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/),
        ],
      ],
      phone: [
        null,
        [
          Validators.required,
          // Validators.minLength(10),
          // Validators.maxLength(10),
          Validators.pattern(
            /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
          ),
        ],
      ],
      age: [
        null,
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(3),
          // Validators.pattern(/^\S[0-9]{0,3}$/)
        ],
      ],
    });
  }

  ngOnChanges() {
    this.initialiZeForm(this.formValues);
  }

  public initialiZeForm(task: Task) {
    if (!task || task.name == '') {
      this.btnTitle = 'Submit';
      return;
    }
    this.btnTitle = 'Update';
    this.form.patchValue({
      id: task.id,
      name: task.name,
      email: task.email,
      phone: task.phone,
      age: task.age,
    });
   
  }

  public addNewTask(form: any) {
    this.formSubmitAttempt = true;
    if (this.form.valid) {
      if (this.btnTitle == 'Update') {
        this.onUpdate(form);
        return;
      }
      this.onTaskAdd.emit(form.value as Task);
      this.form.reset();
    } else {
      this.validateAllFormFields(this.form);
    }
  }

  public onUpdate(form: any) {
    if (this.form.valid) {
      this.onTaskUpdate.emit(form.value as Task);
      this.form.reset();
      this.btnTitle = 'Submit';
    } else {
      this.validateAllFormFields(this.form);
    }
  }

  public onCancel() {
    this.btnTitle = 'Submit';
    this.form.reset();
    this.onTaskCancel.emit();
  }

  isFieldValid(field: string) {
    return (
      !this.form.controls[field].valid && this.form.controls[field].touched
    );
  }

  getErrorMessage(field: string) {
    if (this.form.controls[field].errors?.['required'])
      return field + ' is required';
    else if (this.form.controls[field].errors?.['minlength'])
      return field + ' must be at least 10 characters long.';
    else if (this.form.controls[field].errors?.['maxlength'])
      return field + ' can not exceed 100 characters long.';
    else if (this.form.controls[field].errors?.['pattern'])
      return field + ' can not contain whitespaces at the begining and end.';
    else return '';
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.controls[field];
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }
}
