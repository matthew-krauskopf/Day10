import { Component, EventEmitter, Output, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatDividerModule, RouterLink],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss',
})
export class SideMenuComponent {
  authService: AuthService = inject(AuthService);
  icon = 'assets/tournament-bracket.svg';
}
