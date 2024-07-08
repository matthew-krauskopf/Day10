import { Component, EventEmitter, Output, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss',
})
export class TopBarComponent {
  authService: AuthService = inject(AuthService);
  title = 'Bracket Viewer';

  @Output() sidenavEmitter: EventEmitter<any> = new EventEmitter();

  toggleSidenav() {
    this.sidenavEmitter.emit();
  }

  logout() {
    this.authService.logout();
  }
}
