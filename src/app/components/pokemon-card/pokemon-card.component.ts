import { Component, Input } from '@angular/core';
import { Pokemon } from '../../data/models/pokemon';
import { TypeColors } from '../../data/models/type-colors';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss'],
})
export class PokemonCardComponent {
  @Input() pokemon!: Pokemon;
  TypeColors = TypeColors;

  isOpen = false;
}
