import { Component } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  constructor() {}

  /**
   * Opciones de navegación.
   */
  options = [
    { label: 'Iniciar sesión', value: 'login' },
    { label: 'Registro', value: 'register' },
  ];

  /**
   * Ruta de navegación actual.
   */
  value: string = 'login';
}
