import { Routes } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoginComponent } from './components/login/login.component';
import { PlayersPageComponent } from './components/players-page/players-page.component';
import { ResultsPageComponent } from './components/results-page/results-page.component';
import { ResultDetailsComponent } from './components/result-details/result-details.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { AuthGuard } from './guards/auth.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'home', component: HomePageComponent },
      {
        path: 'players',
        component: PlayersPageComponent,
      },
      {
        path: 'players/:id',
        component: PlayersPageComponent,
      },
      {
        path: 'results',
        component: ResultsPageComponent,
      },
      {
        path: 'results/:id',
        component: ResultDetailsComponent,
      },
    ],
  },
  { path: '**', component: NotFoundComponent },
];
