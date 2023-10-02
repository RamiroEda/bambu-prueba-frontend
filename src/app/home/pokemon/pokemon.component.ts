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
      .pipe(debounceTime(0), distinctUntilChanged())
      .subscribe((value) => {
        this.search();
      });
  }

  /**
   * Se inicializa la página de pokemones.
   */
  ngOnInit(): void {
    this.isLoading = true;
    this.changePage({
      first: 0,
      rows: 20,
    }).then(() => {
      this.isLoading = false;
    });
  }

  /**
   * Realiza una búsqueda de pokemones.
   */
  search() {
    // this.isSearching = true;

    return this.refetch();
    // .then(() => {
    //   this.isSearching = false;
    // })
    // .catch(() => {
    //   this.isSearching = false;
    // });
  }

  /**
   * Refresca la página de pokemones.
   */
  async refetch() {
    return this.pokemonRepository
      .getAll({
        offset: this.first,
        limit: this.pageSize,
        search: this.searchValue,
      })
      .then((res) => {
        this.pokemons = res.results;
        this.totalPages = res.count;
      });
  }

  /**
   * Cambia la página de pokemones.
   * @param {PaginatorState} page Página de pokemones.
   */
  changePage(page: PaginatorState) {
    this.first = page.first ?? 0;
    this.pageSize = page.rows ?? 20;
    return this.refetch();
  }
}
