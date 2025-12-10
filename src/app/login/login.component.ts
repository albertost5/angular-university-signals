import {Component, inject} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {MessagesService} from "../messages/messages.service";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import e from 'express';

@Component({
    selector: 'login',
    imports: [
        RouterLink,
        ReactiveFormsModule
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private messageService = inject(MessagesService);
  private router = inject(Router);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4)]]
  });

  async onLogin() {
    const {email, password} = this.loginForm.value;

    if (email && password) {
        try {
          await this.authService.login(email, password);
          this.router.navigate(['/home']);
        } catch (error) {
          this.messageService.showMessage({
            severity: 'error',
            text: 'Login failed. Please check your credentials and try again.'
          });
        }
    } else {
      this.messageService.showMessage({
        severity: 'error',
        text: 'Please fill in the form correctly before submitting.'
      });
    }
  }
}
