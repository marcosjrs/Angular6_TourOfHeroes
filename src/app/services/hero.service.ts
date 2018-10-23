import { Injectable } from '@angular/core';
import { Hero } from '../model/Hero';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesUrl = "api/heroes";  // URL  api 

  constructor(public msgSvc: MessageService, private http: HttpClient) { }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getHeroes(): Observable<Hero[]> {
    this.msgSvc.add("[HeroService] Recogida de heroes...");
    return this.http.get<Hero[]>(this.heroesUrl).pipe(
      tap(heroes => this.msgSvc.add('[HeroService] Recogidos los heroes correctamente')),
      catchError(this.handleError('getHeroes', []))
    );
  }

  /** Devuelve 404 sino lo encuentra */
  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.msgSvc.add(`[HeroService] Recogido heroe id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }
  
  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, httpOptions).pipe(
      tap((hero: Hero) => this.msgSvc.add(`[HeroService] Añadido heroe id=${hero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  updateHero(hero: Hero): Observable<any> {   
    return this.http.put(this.heroesUrl, hero, httpOptions).pipe(
      tap(_ => this.msgSvc.add(`[HeroService] Actualizado heroe id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  deleteHero (hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;
  
    return this.http.delete<Hero>(url, httpOptions).pipe(
      tap(_ => this.msgSvc.add(`[HeroService] Heroe con id=${id} eliminado`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }
  
}
