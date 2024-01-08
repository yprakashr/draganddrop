import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ButtonService {
  private formVisibleSubject: BehaviorSubject<string> = new BehaviorSubject<string>("false");
  formVisible$: Observable<string> = this.formVisibleSubject.asObservable();

  constructor() { }

  setFormVisibility(visibility: string) {
    
    this.formVisibleSubject.next(visibility);
  }
}
