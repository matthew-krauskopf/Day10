import { Injectable } from '@angular/core';
import { DbService } from './db.service';
import { Player } from '../model/player';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  NEW_ID: number = -1;

  constructor(private db: DbService) {}

  getPlayers(): Observable<Player[]> {
    return this.db.fetchPlayers();
  }

  getNewPlayer(): Player {
    return {
      id: this.NEW_ID,
      wins: 0,
      losses: 0,
      picture: 'assets/no-image.jpg',
    };
  }

  saveChanges(players: Player[], player: Player): number {
    if (player.id == this.NEW_ID) {
      this.saveNewPlayer(players, player);
      return 1;
    } else {
      this.updatePlayer(players, player);
      return 0;
    }
  }

  updatePlayer(players: Player[], newP: Player) {
    const toUpdate = players.filter((p) => p.id == newP.id)[0];
    if (toUpdate) {
      toUpdate.name = newP.name;
      toUpdate.wins = newP.wins;
      toUpdate.losses = newP.losses;
      toUpdate.city = newP.city;
      toUpdate.state = newP.state;
      toUpdate.role = newP.role;
      toUpdate.address = newP.address;
      toUpdate.picture = newP.picture;
    }
  }

  saveNewPlayer(players: Player[], newP: Player) {
    newP.id = Math.max(...players.map((p) => p.id)) + 1;
    players.push(newP);
  }

  deletePlayer(players: Player[], player: Player) {
    return players.filter((t) => t.id != player.id);
  }
}
