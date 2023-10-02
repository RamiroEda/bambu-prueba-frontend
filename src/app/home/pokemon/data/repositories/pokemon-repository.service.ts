import { Injectable } from '@angular/core';
import { Pokemon } from '../../../../data/models/pokemon';
import { PokeapiPagination } from '../../../../data/models/pokeapi-pagination';

interface FetchPokemonOptions {
  offset?: number;
  limit?: number;
  search?: string;
}

@Injectable({
  providedIn: 'root',
})
export class PokemonRepositoryService {
  pokemons: Promise<{ name: string; url: string }[]>;

  constructor() {
    this.pokemons = this.fetchAll().then((res) => res.results);
  }

  async fetchAll() {
    return fetch(`https://pokeapi.co/api/v2/pokemon?&limit=100000`).then<
      PokeapiPagination<{ name: string; url: string }>
    >((res) => res.json());
  }

  /**
   * Devuelve la lista de pokemones.
   * @param {FetchPokemonOptions} options Opciones de búsqueda.
   * @returns {Observable} Lista de pokemones.
   */
  async getAll({
    offset = 0,
    limit = 20,
    search = '',
  }: FetchPokemonOptions = {}): Promise<PokeapiPagination<Pokemon>> {
    const pokemons = await this.pokemons;

    const searchFilteredPokemons = pokemons.filter((pokemon) =>
      pokemon.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    );

    const paginatedPokemons = searchFilteredPokemons.slice(
      offset,
      offset + limit
    );

    return {
      results: await Promise.all(
        paginatedPokemons.map((pokemon) =>
          fetch(pokemon.url).then<Pokemon>((res) => res.json())
        )
      ),
      count: searchFilteredPokemons.length,
    };
  }

  /**
   * Devuelve la información de un pokemon.
   * @param {string} name Nombre del pokemon.
   * @returns {Observable} Información del pokemon.
   */
  get(name: string) {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${name}`).then<Pokemon>(
      (res) => res.json()
    );
  }
}
