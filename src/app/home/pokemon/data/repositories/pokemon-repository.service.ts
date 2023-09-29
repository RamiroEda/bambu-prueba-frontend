import { Injectable } from '@angular/core';
import { Pokemon } from '../../../../data/models/pokemon';
import { PokeapiPagination } from '../../../../data/models/pokeapi-pagination';

@Injectable({
  providedIn: 'root',
})
export class PokemonRepositoryService {
  /**
   * Devuelve la información de todos los pokemones.
   * @param {number} offset Cantidad de pokemones a omitir.
   * @param {number} pageSize Cantidad de pokemones a devolver.
   * @returns {Observable} Información de todos los pokemones.
   */
  getAll(offset: number, pageSize: number = 10) {
    return fetch(
      `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${pageSize}`
    )
      .then<PokeapiPagination<{ name: string; url: string }>>((res) =>
        res.json()
      )
      .then<PokeapiPagination<Pokemon>>(async (res) => {
        return {
          ...res,
          results: await Promise.all(
            res.results.map((pokemon) =>
              fetch(pokemon.url).then<Pokemon>((res) => res.json())
            )
          ),
        };
      });
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
