import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm = this.fb.group({
    username: [null, Validators.required],
    password: [null, Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  onSubmit(): void {
    const username = this.loginForm.controls.username.value;
    const password = this.loginForm.controls.password.value;
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    this.authService
      .login(username, password)
      .subscribe(() => this.router.navigate([returnUrl]));
  }
}
