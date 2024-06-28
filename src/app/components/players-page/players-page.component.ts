import { Component } from '@angular/core';
import { Player } from '../../model/player';
import { NgFor, NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { PlayerDetailComponent } from '../player-detail/player-detail.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { ApiService } from '../../services/db.service';

@Component({
  selector: 'app-players-page',
  standalone: true,
  imports: [
    NgFor,
    MatCardModule,
    MatButtonModule,
    PlayerDetailComponent,
    MatPaginatorModule,
    NgIf,
    MatIconModule
  ],
  templateUrl: './players-page.component.html',
  styleUrl: './players-page.component.scss',
})
export class PlayersPageComponent {

  selectedPlayer?: Player;
  pageIndex : number = 0;
  pageSize = 5;
  playersPage : Player[] = [];
  players : Player[] = [];

  constructor(private api : ApiService) {
    this.api.getPlayers().subscribe(response => {
      response.forEach(p => {
        if (!p.picture) p.picture = "assets/no-image.jpg";
      });
      this.players = response;
      this.playersPage = this.players.slice(0, this.pageSize);
    });
  }

  addPlayer() {
    this.selectedPlayer = {
      id: -1,
      wins: 0,
      losses: 0,
      picture: 'assets/no-image.jpg',
    }
  }

  selectPlayer(player: Player) {
    this.selectedPlayer = structuredClone(player);
  }

  cancelSelection() {
    this.selectedPlayer = undefined;
  }

  saveChanges($event: Player) {
    if ($event.id == -1) {
      $event.id = Math.max(...this.players.map(p => p.id))+1
      this.players.push($event);
      this.renderSlice();
    } else {
      const toUpdate = this.players.filter((p) => p.id == $event.id)[0];
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
  }

  deletePlayer($event: Player) {
    this.players = this.players.filter((t) => t.id != $event.id);
    if (this.pageSize * this.pageIndex >= this.players.length) this.pageIndex--;
    this.renderSlice();
  }

  onPageChange($event : any) {
    this.cancelSelection();
    this.pageIndex = $event.pageIndex;
    this.renderSlice();
  }

  renderSlice() {
    const start = this.pageIndex * this.pageSize;
    this.playersPage = this.players.slice(start, start + this.pageSize);
  }
}
