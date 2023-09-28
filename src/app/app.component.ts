import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    private router: Router,
  ){}

  options = [
    { label: 'Iniciar sesión', value: 'login' },
    { label: 'Registro', value: 'register' },
  ];
  
  value: string = this.router.url.includes('register') ? 'register' : 'login';
}
