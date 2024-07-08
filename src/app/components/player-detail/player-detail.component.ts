import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Player } from '../../model/player';
import { NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { PlayerService } from '../../services/player.service';

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
    ReactiveFormsModule,
  ],
  templateUrl: './player-detail.component.html',
  styleUrl: './player-detail.component.scss',
})
export class PlayerDetailComponent {
  private _player: Player | undefined;
  detailForm: FormGroup;

  @Output() cancelEmitter: EventEmitter<void> = new EventEmitter();
  @Output() saveEmitter: EventEmitter<FormGroup> = new EventEmitter();
  @Output() deleteEmitter: EventEmitter<Player> = new EventEmitter();

  constructor(private playerService: PlayerService) {
    this.detailForm = this.playerService.createForm();
  }

  @Input() set player(selectedPlayer: Player | undefined) {
    this._player = selectedPlayer;
    this.playerService.formatForm(this.detailForm, this.player);
  }
  get player(): Player | undefined {
    return this._player;
  }

  cancel() {
    this.cancelEmitter.emit();
  }

  savePlayer() {
    this.detailForm.valid
      ? this.saveEmitter.emit(this.detailForm)
      : this.detailForm!.markAsTouched();
  }

  deletePlayer() {
    this.deleteEmitter.emit(this.player);
  }
}
