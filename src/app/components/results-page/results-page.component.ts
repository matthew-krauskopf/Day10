import { Component, inject } from '@angular/core';
import { DbService } from '../../services/db.service';
import { Bracket } from '../../model/bracket';
import { Match } from '../../model/match';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ResultDetailsComponent } from '../result-details/result-details.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-results-page',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    ResultDetailsComponent,
    RouterLink,
  ],
  templateUrl: './results-page.component.html',
  styleUrl: './results-page.component.scss',
})
export class ResultsPageComponent {
  db: DbService = inject(DbService);

  brackets?: Bracket[];
  matches?: Match[];
  selectedBracket?: Bracket;

  constructor() {
    this.db
      .fetchBrackets()
      .subscribe(
        (brackets) => (this.brackets = brackets.sort((a, b) => a.date - b.date))
      );
  }

  selectBracket(b: Bracket) {
    this.selectedBracket = b;
  }

  dateString(d: number) {
    let dString = String(d);
    return (
      dString.slice(4, 6) + '/' + dString.slice(6) + '/' + dString.slice(0, 4)
    );
  }

  deleteBracket(id: number) {
    this.brackets = this.brackets?.filter((b) => b.id != id);
  }
}
