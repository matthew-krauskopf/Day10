import { Injectable } from '@angular/core';
import { DbService } from './db.service';
import { Player } from '../model/player';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { Match } from '../model/match';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  NEW_ID: number = -1;

  constructor(private db: DbService) {}

  getPlayers(): Observable<Player[]> {
    return this.db.fetchAllPlayers();
  }

  getNewPlayer(): Player {
    return {
      id: this.NEW_ID,
      wins: 0,
      losses: 0,
      picture: 'assets/no-image.jpg',
    };
  }

  saveChanges(players: Player[], form: FormGroup): number {
    if (form.value.id == this.NEW_ID) {
      this.saveNewPlayer(players, form);
      return 1;
    } else {
      this.updatePlayer(players, form);
      return 0;
    }
  }

  updatePlayer(players: Player[], form: FormGroup) {
    const toUpdate = players.filter((p) => p.id == form.value.id)[0];
    if (toUpdate) {
      toUpdate.name = form.value.name;
      toUpdate.city = form.value.city;
      toUpdate.state = form.value.state;
      toUpdate.role = form.value.role;
      toUpdate.address = form.value.address;
    }
  }

  saveNewPlayer(players: Player[], form: FormGroup) {
    const newP: Player = this.getNewPlayer();
    newP.id = Math.max(...players.map((p) => p.id)) + 1;
    newP.name = form.value.name;
    newP.city = form.value.city;
    newP.state = form.value.state;
    newP.address = form.value.address;
    newP.role = form.value.role;
    players.push(newP);
  }

  deletePlayer(players: Player[], form: FormGroup) {
    return players.filter((t) => t.id != form.value.id);
  }

  calcScores(players: Player[], matches: Match[]) {
    players.forEach((p) => {
      if (p.wins + p.losses == 0) {
        let p1Matches: Match[] = matches.filter((m) => m.player1Id == p.id);
        p1Matches.forEach((pm) =>
          pm.player1Score > pm.player2Score ? p.wins++ : p.losses++
        );

        let p2Matches: Match[] = matches.filter((m) => m.player2Id == p.id);
        p2Matches.forEach((pm) =>
          pm.player2Score > pm.player1Score ? p.wins++ : p.losses++
        );
      }
    });
  }
}
