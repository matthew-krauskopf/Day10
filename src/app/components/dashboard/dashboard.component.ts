import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { TopBarComponent } from '../top-bar/top-bar.component';
import { SideMenuComponent } from '../side-menu/side-menu.component';
import { MatchDetailComponent } from '../match-detail/match-detail.component';
import { PlayersPageComponent } from '../players-page/players-page.component';
import { HomePageComponent } from '../home-page/home-page.component';
import { ResultsPageComponent } from '../results-page/results-page.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatSidenavModule,
    TopBarComponent,
    SideMenuComponent,
    MatchDetailComponent,
    HomePageComponent,
    PlayersPageComponent,
    ResultsPageComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  sidenavOpened: boolean = true;
  selectedView: string = 'Players'; // Default to home

  toggleSidenav() {
    this.sidenavOpened = !this.sidenavOpened;
  }

  selectView($event: string) {
    this.selectedView = $event;
  }
}
