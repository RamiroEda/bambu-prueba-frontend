import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  constructor(private router: Router) {}

  options = [
    { label: 'Iniciar sesión', value: 'login' },
    { label: 'Registro', value: 'register' },
  ];

  value: string = this.router.url.includes('register') ? 'register' : 'login';
}
