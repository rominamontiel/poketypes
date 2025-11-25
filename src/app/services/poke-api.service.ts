import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { POKEAPI_BASE_URL } from '../config/pokeapi.config';
import {
  PokemonFullListResponse,
  SpecificPokemon,
} from '../core/models/poke-api-models.model';

@Injectable({
  providedIn: 'root',
})
export class PokeApiService {
  private readonly API = POKEAPI_BASE_URL;

  constructor(private http: HttpClient) {}

  getPokemonFullList(limit = 5000, offset = 0) {
    const PARAMS = {
      limit: limit,
      offset: offset,
    };
    return this.http.get<PokemonFullListResponse>(`${this.API}/pokemon`, {
      params: PARAMS,
    });
  }

  getSpecificPokemon(id: string) {
    return this.http.get<SpecificPokemon>(`${this.API}/pokemon/${id}`);
  }
}
