import { Component, OnInit } from '@angular/core';
import { Hero } from '../model/Hero';
import { HeroService } from '../services/hero.service';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  hero:Hero;
  heroes:Hero[];

  constructor(private heroService:HeroService) { 
  }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(){
    this.heroService.getHeroes().subscribe(
      heroes=>this.heroes=heroes,
      err => console.log(err)
    );
  }

  
  add(name:string){
    if(!name) return;
    this.heroService.addHero({name} as Hero).subscribe(
      (newHero) => this.heroes.push(newHero)
    );
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }

}
