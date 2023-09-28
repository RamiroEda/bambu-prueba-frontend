import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  redirectLoggedInTo,
  AuthGuard,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component';
import { PokemonComponent } from './home/pokemon/pokemon.component';
import { CadenasComponent } from './home/cadenas/cadenas.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    canActivate: [AuthGuard],
    data: {
      authGuardPipe: () => redirectLoggedInTo(['home']),
    },
  },
  {
    path: 'home',
    canActivate: [AuthGuard],
    component: HomeComponent,
    data: {
      authGuardPipe: () => redirectUnauthorizedTo(['']),
    },
    children: [
      {
        path: '',
        component: PokemonComponent,
      },
      {
        path: 'cadenas',
        component: CadenasComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
