import { Injectable } from '@angular/core';
import { Hero } from '../model/Hero';
import { HEROES } from '../fixtures/heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';


@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(public msgSvc:MessageService) { }

  getHeroes():Observable<Hero[]>{
    this.msgSvc.add("[HeroService] Recogida de heroes...");
    return of(HEROES);
  }
}
