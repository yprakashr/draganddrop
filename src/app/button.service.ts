import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ButtonService {
  private buttonClickSubject = new Subject<void>();

  sendButtonClick(): void {
    this.buttonClickSubject.next();
  }

  getButtonClick(): Observable<void> {
    return this.buttonClickSubject.asObservable();
  }
}
