import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthRepositoryService } from '../../data/repositories/auth-repository.service';
import { RegisterInput } from '../../data/models/register-input';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  constructor(
    private authRepository: AuthRepositoryService,
    private messageService: MessageService,
    private router: Router
  ) {}

  registerForm = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20),
      ]),
      passwordConfirm: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20),
      ]),
      name: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      birthday: new FormControl(new Date(2000, 0, 1), [Validators.required]),
    } as Record<keyof RegisterInput, FormControl> & {
      passwordConfirm: FormControl;
    },
    {
      validators: (form) => {
        if (form.value.password !== form.value.passwordConfirm) {
          return { passwordMismatch: true };
        }
        return null;
      },
    }
  );
  isLoading = false;
  maxDate = new Date();

  async register() {
    if (this.registerForm.valid) {
      this.isLoading = true;
      const input = this.registerForm.value;
      delete input.passwordConfirm;
      await this.authRepository
        .register(input as RegisterInput)
        .then(() => {
          this.router.navigate(['home']);
        })
        .catch((e) => {
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
