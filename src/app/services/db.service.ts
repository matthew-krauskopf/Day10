import { Injectable } from '@angular/core';
import { Player } from '../model/player';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DbService {
  baseUrl: string = 'https://json-server-vercel-ebon.vercel.app';
  playersEndpoint: string = '/players';

  constructor(private http: HttpClient) {}

  fetchPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(this.baseUrl + this.playersEndpoint).pipe(
      tap((result) =>
        result.forEach((p) => {
          if (!p.picture) p.picture = 'assets/no-image.jpg';
        })
      ),
      catchError(this.handleError<Player[]>())
    );
  }

  private handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      console.log('Fetch failed: ', error);
      return of(result as T);
    };
  }
}
