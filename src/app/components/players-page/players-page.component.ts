import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { Player } from '../../model/player';
import { NgFor, NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { PlayerDetailComponent } from '../player-detail/player-detail.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { PlayerService } from '../../services/player.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
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
export class PlayersPageComponent implements AfterViewChecked {
  pageIndex: number = 0;
  pageSize = 5;
  playersPage: Player[] = [];
  players: Player[] = [];
  matches: Match[] = [];
  detailForm?: FormGroup;

  ngAfterViewChecked(): void {
    this.playerService.calcScores(this.players, this.matches);
  }

  constructor(db: DbService, private playerService: PlayerService) {
    playerService.getPlayers().subscribe((response) => {
      this.players = response;
      this.playersPage = this.players.slice(0, this.pageSize);
    });
    db.fetchAllMatches().subscribe((m) => {
      this.matches = m;
    });
  }

  addPlayer() {
    this.selectPlayer(this.playerService.getNewPlayer());
  }

  selectPlayer(player: Player) {
    this.detailForm = this.createForm(player);
  }

  cancelSelection() {
    this.detailForm = undefined;
  }

  saveChanges() {
    if (this.playerService.saveChanges(this.players, this.detailForm!) === 1) {
      this.pageIndex = Math.ceil(this.players.length / this.pageSize) - 1;
      this.renderSlice();
    }
    this.cancelSelection();
  }

  deletePlayer() {
    this.players = this.playerService.deletePlayer(
      this.players,
      this.detailForm!
    );
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

  createForm(player: Player) {
    return new FormGroup({
      id: new FormControl(player.id),
      name: new FormControl(player.name, [
        Validators.required,
        Validators.pattern('^([A-Z][a-zA-Z]*( ){0,1})+$'),
      ]),
      role: new FormControl(player.role, [
        Validators.required,
        Validators.pattern('^([A-Z][a-zA-Z]*( ){0,1})+$'),
      ]),
      city: new FormControl(player.city, [
        Validators.required,
        Validators.pattern('^([A-Z][a-zA-Z]*( ){0,1})+$'),
      ]),
      state: new FormControl(player.state, [
        Validators.required,
        Validators.pattern('^([A-Z][a-zA-Z]*( ){0,1})+$'),
      ]),
      address: new FormControl(player.address, [
        Validators.required,
        Validators.pattern('^[0-9]+( [A-Z][a-z]*)+(\\.){0,1}( )*$'),
      ]),
      picture: new FormControl(player.picture),
    });
  }
}
