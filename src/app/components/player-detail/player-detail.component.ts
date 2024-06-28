import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Player } from '../../model/player';
import { NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-player-detail',
  standalone: true,
  imports: [
    NgIf,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
  ],
  templateUrl: './player-detail.component.html',
  styleUrl: './player-detail.component.scss',
})
export class PlayerDetailComponent {
  @Input() player?: Player;

  @Output() cancelEmitter: EventEmitter<any> = new EventEmitter();
  @Output() saveEmitter: EventEmitter<Player> = new EventEmitter();
  @Output() deleteEmitter: EventEmitter<Player> = new EventEmitter();

  cancel() {
    this.cancelEmitter.emit();
    this.player = undefined;
  }

  savePlayer() {
    this.saveEmitter.emit(this.player);
  }

  deletePlayer() {
    this.deleteEmitter.emit(this.player);
    this.player = undefined;
  }
}
