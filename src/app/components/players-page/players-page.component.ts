import { Component } from '@angular/core';
import { Player } from '../../model/player';
import { NgFor, NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { PlayerDetailComponent } from '../player-detail/player-detail.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { PlayerService } from '../../services/player.service';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Match } from '../../model/match';
import { DbService } from '../../services/db.service';

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
    MatIconModule,
    ReactiveFormsModule,
  ],
  templateUrl: './players-page.component.html',
  styleUrl: './players-page.component.scss',
})
export class PlayersPageComponent {
  pageIndex: number = 0;
  pageSize = 5;
  playersPage: Player[] = [];
  players: Player[] = [];
  matches: Match[] = [];
  selectedPlayer?: Player;

  constructor(db: DbService, private playerService: PlayerService) {
    playerService.getPlayers().subscribe((response) => {
      this.players = response;
      this.playersPage = this.players.slice(0, this.pageSize);
      db.fetchAllMatches().subscribe((m) => {
        this.matches = m;
        this.playerService.calcScores(this.players, this.matches);
      });
    });
  }

  addPlayer() {
    this.selectPlayer(this.playerService.getNewPlayer());
  }

  selectPlayer(player: Player) {
    this.selectedPlayer = player;
  }

  cancelSelection() {
    this.selectedPlayer = undefined;
  }

  saveChanges($event: FormGroup) {
    if (this.playerService.saveChanges(this.players, $event) === 1) {
      this.pageIndex = Math.ceil(this.players.length / this.pageSize) - 1;
      this.renderSlice();
    }
    this.cancelSelection();
  }

  deletePlayer($event: Player) {
    this.players = this.playerService.deletePlayer(this.players, $event);
    if (this.pageSize * this.pageIndex >= this.players.length) {
      this.pageIndex--;
    }
    this.cancelSelection();
    this.renderSlice();
  }

  onPageChange($event: any) {
    this.cancelSelection();
    this.pageIndex = $event.pageIndex;
    this.renderSlice();
  }

  renderSlice() {
    const start = this.pageIndex * this.pageSize;
    this.playersPage = this.players.slice(start, start + this.pageSize);
  }
}
