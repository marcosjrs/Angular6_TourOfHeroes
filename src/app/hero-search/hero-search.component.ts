import { Component, OnInit } from '@angular/core';
import { HeroService } from '../services/hero.service';
import { Observable } from 'rxjs';
import { Hero } from '../model/Hero';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {
  public heroes$:Observable<Hero[]>;

  constructor( private heroSvc:HeroService) { }

  ngOnInit() {
  }

  search(name){
    this.heroes$ = this.heroSvc.searchHeroes(name);
  }

}
