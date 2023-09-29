import { Injectable } from '@angular/core';
import { Pokemon } from '../../../../data/models/pokemon';
import { PokeapiPagination } from '../../../../data/models/pokeapi-pagination';

@Injectable({
  providedIn: 'root',
})
export class PokemonRepositoryService {
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

  get(name: string) {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${name}`).then<Pokemon>(
      (res) => res.json()
    );
  }
}
