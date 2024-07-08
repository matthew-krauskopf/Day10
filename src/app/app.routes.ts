import { Routes } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoginComponent } from './components/login/login.component';
import { PlayersPageComponent } from './components/players-page/players-page.component';
import { ResultsPageComponent } from './components/results-page/results-page.component';
import { ResultDetailsComponent } from './components/result-details/result-details.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  {
    path: 'players',
    component: PlayersPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'players/:id',
    component: PlayersPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'results',
    component: ResultsPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'results/:id',
    component: ResultDetailsComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', component: NotFoundComponent },
];
