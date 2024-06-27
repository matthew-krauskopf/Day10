import { Component } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatchDetailComponent } from '../match-detail/match-detail.component';
import { MatchListComponent } from '../match-list/match-list.component';
import { TopBarComponent } from '../top-bar/top-bar.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatSidenavModule, MatchDetailComponent, MatchListComponent, TopBarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  sidenavOpened : boolean = true;
  
  toggleSidenav() {
    this.sidenavOpened = !this.sidenavOpened;
  }
}
