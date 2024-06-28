import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatDividerModule],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss',
})
export class SideMenuComponent {
  icon = 'assets/tournament-bracket.svg';

  @Output() viewEmitter: EventEmitter<string> = new EventEmitter<string>();

  viewSelector(id: string) {
    this.viewEmitter.emit(id);
  }
}
