import { Component, OnInit } from '@angular/core';
import { PokemonRepositoryService } from './data/repositories/pokemon-repository.service';
import { Pokemon } from 'src/app/data/models/pokemon';
import { PaginatorState } from 'primeng/paginator';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss'],
})
export class PokemonComponent implements OnInit {
  first = 0;
  pokemons: Pokemon[] = [];
  totalPages = 0;
  pageSize = 20;
  isLoading = false;
  isSearching = false;
  searchDebounce = new Subject<string>();
  searchValue = '';

  /**
   * Se inicializa el tiempo de rebote para la búsqueda de pokemones.
   */
  constructor(private pokemonRepository: PokemonRepositoryService) {
    this.searchDebounce
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((value) => {
        this.search(value);
      });
  }

  /**
   * Se inicializa la página de pokemones.
   */
  ngOnInit(): void {
    this.changePage({
      first: 0,
      rows: 20,
    });
  }

  /**
   * Realiza una búsqueda de pokemones.
   * @param {string} incoming Cadena de texto a buscar.
   */
  search(incoming: string) {
    const value = incoming.trim();
    if (value === '') {
      this.changePage({
        first: 0,
        rows: 20,
      });
      return;
    }
    this.isSearching = true;

    this.pokemonRepository
      .get(value)
      .then((res) => {
        this.pokemons = [res];
        this.totalPages = 1;
        this.isSearching = false;
      })
      .catch(() => {
        this.pokemons = [];
        this.totalPages = 0;
        this.isSearching = false;
      });
  }

  /**
   * Cambia la página de pokemones.
   * @param {PaginatorState} page Página de pokemones.
   */
  changePage(page: PaginatorState) {
    this.first = page.first ?? 0;
    this.pageSize = page.rows ?? 20;
    this.isLoading = true;
    this.pokemonRepository.getAll(this.first, this.pageSize).then((res) => {
      this.pokemons = res.results;
      this.totalPages = res.count;
      this.isLoading = false;
    });
  }
}
