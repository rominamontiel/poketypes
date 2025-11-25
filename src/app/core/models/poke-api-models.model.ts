//LISTADO DE TODOS LOS POKEMONES
export interface PokemonFullListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    name: string;
    url: string;
  }[];
}

//DETALLE DE 1 POKEMON POR ID
export interface SpecificPokemon {
  form_name: string;
  form_names: any[];
  form_order: number;
  id: number;
  is_battle_only: boolean;
  is_default: boolean;
  is_mega: boolean;
  name: string;
  names: any[];
  order: number;
  pokemon: {};
  sprites: Sprites;
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
  version_group: {};
}

export interface Sprites {
  back_default: string;
  back_female: null;
  back_shiny: string;
  back_shiny_female: null;
  front_default: string;
  front_female: null;
  front_shiny: string;
  front_shiny_female: null;
}

