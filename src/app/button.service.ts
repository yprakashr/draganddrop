import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ButtonService {
  private formVisibleSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  formVisible$: Observable<boolean> = this.formVisibleSubject.asObservable();

  constructor() { }

  setFormVisibility(visibility: boolean) {
    
    this.formVisibleSubject.next(visibility);
  }
}
