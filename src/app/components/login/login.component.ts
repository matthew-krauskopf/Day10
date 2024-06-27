import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatCardModule, MatInputModule, MatFormFieldModule, FormsModule, MatButtonModule, ReactiveFormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  validationPattern = '\\w{4,}';

  constructor(private snackbar : MatSnackBar, private router : Router, private authService : AuthService) {

  }

  loginForm = new FormGroup ({
    username: new FormControl('', [Validators.pattern(this.validationPattern)]),
    password: new FormControl('', [Validators.pattern(this.validationPattern)]),
  })

  performLogin() {
    if (this.authService.checkLogin(this.loginForm.value.username ?? "", this.loginForm.value.password ?? "")) {
      this.router.navigate(["/home"]);
    } else {
      this.snackbar.open("Invalid login credentials", "Close");
    }
  }
}
