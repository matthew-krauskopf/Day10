import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Player } from '../../model/player';
import { NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
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
    ReactiveFormsModule,
  ],
  templateUrl: './player-detail.component.html',
  styleUrl: './player-detail.component.scss',
})
export class PlayerDetailComponent {
  @Input() detailForm?: FormGroup;

  @Output() cancelEmitter: EventEmitter<any> = new EventEmitter();
  @Output() saveEmitter: EventEmitter<any> = new EventEmitter();
  @Output() deleteEmitter: EventEmitter<any> = new EventEmitter();

  cancel() {
    this.cancelEmitter.emit();
  }

  savePlayer() {
    this.detailForm!.valid
      ? this.saveEmitter.emit()
      : this.detailForm!.markAsTouched();
  }

  deletePlayer() {
    this.deleteEmitter.emit();
  }
}
