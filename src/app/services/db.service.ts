import { Injectable } from '@angular/core';
import { Player } from '../model/player';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';
import { Bracket } from '../model/bracket';
import { Match } from '../model/match';

@Injectable({
  providedIn: 'root',
})
export class DbService {
  baseUrl: string = 'https://json-server-vercel-ebon.vercel.app';
  playersEndpoint: string = '/players';
  bracketsEndpoint: string = '/brackets';
  matchesEndpoint: string = '/matches';

  constructor(private http: HttpClient) {}

  fetchAllPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(this.baseUrl + this.playersEndpoint).pipe(
      tap((result) =>
        result.forEach((p) => {
          if (!p.picture) p.picture = 'assets/no-image.jpg';
        })
      ),
      catchError(this.handleError<Player[]>())
    );
  }

  fetchPlayers(ids: number[]): Observable<Player[]> {
    let paramString: string = 'id=' + ids.join('&id=');
    return this.http
      .get<Player[]>(this.baseUrl + this.playersEndpoint + '?' + paramString)
      .pipe(catchError(this.handleError<Player[]>()));
  }

  fetchBrackets(): Observable<Bracket[]> {
    return this.http
      .get<Bracket[]>(this.baseUrl + this.bracketsEndpoint)
      .pipe(catchError(this.handleError<Bracket[]>()));
  }

  fetchBracket(id: number): Observable<Bracket[]> {
    return this.http
      .get<Bracket[]>(this.baseUrl + this.bracketsEndpoint + '?id=' + id)
      .pipe(catchError(this.handleError<Bracket[]>()));
  }

  fetchAllMatches(): Observable<Match[]> {
    return this.http
      .get<Match[]>(this.baseUrl + this.matchesEndpoint)
      .pipe(catchError(this.handleError<Match[]>()));
  }

  fetchMatches(bracketId: number): Observable<Match[]> {
    return this.http
      .get<Match[]>(
        this.baseUrl + this.matchesEndpoint + '?bracketId=' + bracketId
      )
      .pipe(catchError(this.handleError<Match[]>()));
  }

  private handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      console.log('Fetch failed: ', error);
      return of(result as T);
    };
  }
}
