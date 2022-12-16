import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  //de service voor het switchen van de spinner aan of uit binnen de template
  public isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }
}