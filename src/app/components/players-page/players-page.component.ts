import { Component } from '@angular/core';
import { Player } from '../../model/player';
import { NgFor } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { PlayerDetailComponent } from '../player-detail/player-detail.component';

@Component({
  selector: 'app-players-page',
  standalone: true,
  imports: [NgFor, MatCardModule, MatButtonModule, PlayerDetailComponent],
  templateUrl: './players-page.component.html',
  styleUrl: './players-page.component.scss'
})
export class PlayersPageComponent {

  selectedPlayer? : Player;

  players : Player[] = [
    {
      id: 1,
      name: 'John',
      wins: 0,
      losses: 0,
      city: "Orlando",
      state: "Florida",
      role: "Closer",
      address: "123 Park Way",
      picture: '../../../assets/no-image.jpg'
    },
    {
      id: 2,
      name: 'Sue',
      wins: 0,
      losses: 0,
      city: "Buffalo",
      state: "New York",
      role: "Striker",
      address: "456 Park Way",
      picture: '../../../assets/no-image.jpg'
    }
  ]

  selectPlayer(player : Player) {
    this.selectedPlayer = structuredClone(player);
  }

  cancelSelection() {
    this.selectedPlayer = undefined;
  }

  saveChanges($event : Player) {
    const toUpdate = this.players.filter(p => p.id == $event.id)[0]
    if (toUpdate) {
      toUpdate.name = $event.name;
      toUpdate.wins = $event.wins;
      toUpdate.losses = $event.losses;
      toUpdate.city = $event.city;
      toUpdate.state = $event.state;
      toUpdate.role = $event.role;
      toUpdate.address = $event.address;
      toUpdate.picture = $event.picture;
    }
  }

  deletePlayer($event : Player) {
    console.log(this.players);
    console.log($event);
    this.players = this.players.filter(t => t.id != $event.id);
  }
}
