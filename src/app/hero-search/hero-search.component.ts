import { Component, OnInit } from '@angular/core';
import { HeroService } from '../services/hero.service';
import { Observable, Subject } from 'rxjs';
import { Hero } from '../model/Hero';
import { debounce, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {
  public heroes$:Observable<Hero[]>;
  public searchTerms = new Subject<string>();

  constructor( private heroSvc:HeroService) { }

  search(name){
    //this.heroes$ = this.heroSvc.searchHeroes(name);// No lo vamos a buscar directamente
    this.searchTerms.next(name);//En su lugar ejecutamos un next en el Subject para que "salte" su "observador"
  }
  
  ngOnInit() {
    //En lugar de hacer un subscribe típico (porque solo subscribiriamos algo que ya ha cambiado, entonces tendríamos que lanzar en el "next" de la subscripción, esto mismo....), 
    //lo que hacemos es subscribirnos a los cambios pero así 
    //(para guardar un observable con los datos devuelto por el servicio, que será lo que observa desde el html):
    this.heroes$ = this.searchTerms.pipe(
      debounceTime(300), //esperamos 300msg entre uno y otro
      distinctUntilChanged(), //ignoramos el valor sino cambió
      switchMap((term: string) => this.heroSvc.searchHeroes(term))
    );
  }

}
