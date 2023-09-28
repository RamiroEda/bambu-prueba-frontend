import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthRepositoryService } from '../data/repositories/auth-repository.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    private authRepository: AuthRepositoryService,
    private messageService: MessageService
  ) {}

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });
  isLoading = false;

  async login() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      await this.authRepository
        .login(this.loginForm.value.email!, this.loginForm.value.password!)
        .catch((e) => {
          console.log(e);

          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: e.message,
          });
        });
      this.isLoading = false;
    }
  }
}
