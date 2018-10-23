import { Component, OnInit } from '@angular/core';
import { Hero } from '../model/Hero';
import { HeroService } from '../services/hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
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
