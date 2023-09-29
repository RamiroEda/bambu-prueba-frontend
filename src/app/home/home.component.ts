import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthRepositoryService } from '../data/repositories/auth-repository.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(
    private authRepository: AuthRepositoryService,
    private router: Router
  ) {}

  menus: MenuItem[] = [
    {
      label: 'Pokemones',
      routerLink: '/home',
    },
    {
      label: 'Cadenas',
      routerLink: '/home/cadenas',
    },
    {
      label: 'Perfil',
      routerLink: '/home/profile',
    },
  ];

  async logout() {
    await this.authRepository.logout();
    this.router.navigate(['']);
  }
}
