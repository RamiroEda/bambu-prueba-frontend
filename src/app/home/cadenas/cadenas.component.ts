import { Component } from '@angular/core';

@Component({
  selector: 'app-cadenas',
  templateUrl: './cadenas.component.html',
  styleUrls: ['./cadenas.component.scss'],
})
export class CadenasComponent {
  /**
   * Cadena de texto que contiene números separados por comas.
   */
  numbers = '';
}
