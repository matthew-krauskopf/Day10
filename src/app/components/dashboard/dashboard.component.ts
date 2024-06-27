import { Component } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import { TopBarComponent } from '../top-bar/top-bar.component';
import { SideMenuComponent } from '../side-menu/side-menu.component';
import { MatchDetailComponent } from '../match-detail/match-detail.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatSidenavModule, TopBarComponent, SideMenuComponent, MatchDetailComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  sidenavOpened : boolean = true;
  
  toggleSidenav() {
    this.sidenavOpened = !this.sidenavOpened;
  }
}
