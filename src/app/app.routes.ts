import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoginComponent } from './components/login/login.component';
import { PlayersPageComponent } from './components/players-page/players-page.component';
import { ResultsPageComponent } from './components/results-page/results-page.component';
import { ResultDetailsComponent } from './components/result-details/result-details.component';
import { HomePageComponent } from './components/home-page/home-page.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'players', component: PlayersPageComponent },
  { path: 'players/:id', component: PlayersPageComponent },
  { path: 'results', component: ResultsPageComponent },
  { path: 'results/:id', component: ResultDetailsComponent },
  { path: '**', component: NotFoundComponent },
];
