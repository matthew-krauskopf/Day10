import { Injectable } from '@angular/core';
import { Match } from '../model/match';

@Injectable({
  providedIn: 'root',
})
export class ResultsService {
  constructor() {}

  formatResults(matches: Match[]): Match[][] {
    let results: Match[][] = [];
    let round: Match[] = [];

    let filterdMatches = matches.sort((a, b) => a.round - b.round);
    for (let m of filterdMatches) {
      if (round.length == 0 || round[0].round == m.round) {
        round.push(m);
      } else {
        results.push(round);
        round = [];
        round.push(m);
      }
    }
    if (round.length != 0) {
      results.push(round);
    }
    return results;
  }
}
