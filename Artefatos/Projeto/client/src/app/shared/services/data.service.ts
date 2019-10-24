import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService<Type> {
  public source = new BehaviorSubject<Type>(null);
  constructor() {  }

  public update(data: Type) {
    this.source.next(data);
  }
}
