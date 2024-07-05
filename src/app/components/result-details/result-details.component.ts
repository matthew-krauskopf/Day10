import { Component, Inject, Input } from '@angular/core';
import { DbService } from '../../services/db.service';
import { Match } from '../../model/match';
import { Bracket } from '../../model/bracket';
import { ResultsService } from '../../services/results.service';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { Player } from '../../model/player';

@Component({
  selector: 'app-result-details',
  standalone: true,
  imports: [MatCardModule, MatDividerModule],
  templateUrl: './result-details.component.html',
  styleUrl: './result-details.component.scss',
})
export class ResultDetailsComponent {
  @Input() bracket?: Bracket;

  rounds: Match[][] = [];
  players: Player[] = [];

  constructor(db: DbService, resultsService: ResultsService) {
    db.fetchMatches().subscribe(
      (m) => (this.rounds = resultsService.formatResults(m, this.bracket!.id))
    );
    db.fetchPlayers().subscribe((players) => {
      this.players = players;
    });
  }

  getPlayerName(id: number) {
    if (this.players.length > 0) {
      return this.players.filter((p) => p.id == id)[0].name ?? 'Unknown';
    } else {
      return '?';
    }
  }
}
