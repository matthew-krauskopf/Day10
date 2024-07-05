import { Component, OnInit } from '@angular/core';
import { DbService } from '../../services/db.service';
import { Match } from '../../model/match';
import { Bracket } from '../../model/bracket';
import { ResultsService } from '../../services/results.service';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { Player } from '../../model/player';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-result-details',
  standalone: true,
  imports: [MatCardModule, MatDividerModule],
  templateUrl: './result-details.component.html',
  styleUrl: './result-details.component.scss',
})
export class ResultDetailsComponent implements OnInit {
  rounds: Match[][] = [];
  players: Player[] = [];
  bracket?: Bracket;

  bracketId: number = 0;

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (pm: ParamMap) => (this.bracketId = Number(pm.get('id')))
    );

    this.db
      .fetchBracket(this.bracketId)
      .subscribe((b) => (this.bracket = b[0]));

    this.db.fetchMatches(this.bracketId).subscribe((matches) => {
      this.rounds = this.resultsService.formatResults(matches);
      const uniqueIds: number[] = [];
      this.rounds[0].forEach((r) => {
        if (r.player1Id != -1) uniqueIds.push(r.player1Id);
        if (r.player2Id != -1) uniqueIds.push(r.player2Id);
      });
      this.db.fetchPlayers(uniqueIds).subscribe((players) => {
        this.players = players;
      });
    });
  }

  constructor(
    private route: ActivatedRoute,
    private db: DbService,
    private resultsService: ResultsService
  ) {}

  getPlayerName(id: number) {
    if (id == -1) return 'Bye';
    if (this.players.length > 0) {
      return this.players.filter((p) => p.id == id)[0].name ?? 'Unknown';
    } else {
      return '?';
    }
  }
}
