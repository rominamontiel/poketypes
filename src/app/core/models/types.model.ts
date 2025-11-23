// TIPOS DE POKEMONES
export enum TYPES {
  ACERO = 'acero',
  AGUA = 'agua',
  BICHO = 'bicho',
  DRAGON = 'dragon',
  ELECTRICO = 'electrico',
  FANTASMA = 'fantasma',
  FUEGO = 'fuego',
  HADA = 'hada',
  HIELO = 'hielo',
  LUCHA = 'lucha',
  NORMAL = 'normal',
  PLANTA = 'planta',
  PSIQUICO = 'psiquico',
  ROCA = 'roca',
  SINIESTRO = 'siniestro',
  TIERRA = 'tierra',
  VENENO = 'veneno',
  VOLADOR = 'volador',
}

export const LIST_TYPES: TYPES[] = Object.values(TYPES);

//INGLES → ESPAÑOL
export const MAP_EN_ES_TYPES = {
  steel: TYPES.ACERO,
  water: TYPES.AGUA,
  bug: TYPES.BICHO,
  dragon: TYPES.DRAGON,
  electric: TYPES.ELECTRICO,
  ghost: TYPES.FANTASMA,
  fire: TYPES.FUEGO,
  fairy: TYPES.HADA,
  ice: TYPES.HIELO,
  fight: TYPES.LUCHA,
  normal: TYPES.NORMAL,
  grass: TYPES.PLANTA,
  psychic: TYPES.PSIQUICO,
  rock: TYPES.ROCA,
  dark: TYPES.SINIESTRO,
  ground: TYPES.TIERRA,
  poison: TYPES.VENENO,
  flying: TYPES.VOLADOR,
};
