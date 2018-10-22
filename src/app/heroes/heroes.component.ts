import { Component, OnInit } from '@angular/core';
import { Hero } from '../model/Hero';
import {HEROES} from '../fixtures/heroes';
import { HeroService } from '../services/hero.service';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  hero:Hero;
  heroes:Hero[];

  constructor(private _heroSv:HeroService) { 
  }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(){
    this._heroSv.getHeroes().subscribe(
      heroes=>this.heroes=heroes,
      err => console.log(err)
    );
  }

  selectHero(hero:Hero){
    this.hero = hero;
  }

}
