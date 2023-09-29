import { Component, Input } from '@angular/core';
import { Pokemon } from '../../data/models/pokemon';
import { TypeColors } from '../../data/models/type-colors';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss'],
})
export class PokemonCardComponent {
  /**
   * Pokemon a mostrar.
   */
  @Input() pokemon!: Pokemon;

  /**
   * Colores de los tipos de pokemones.
   */
  TypeColors = TypeColors;

  /**
   * Indica si mostrar el modal de detalles del pokemon.
   */
  isOpen = false;
}
