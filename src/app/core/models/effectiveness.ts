import { TYPES } from './types.model';

export interface Effectiveness {
  attacker: TYPES; //quién ataca
  defenders: TypeDamage[]; //cuanto recibe ese tipo
}

export interface TypeDamage {
  type: TYPES; //Tipo
  damage: number; //x Daño recibido
}

export const EFFECTIVENESS: Effectiveness[] = [
  {
    attacker: TYPES.NORMAL,
    defenders: [
      { type: TYPES.ROCA, damage: 0.625 },
      { type: TYPES.ACERO, damage: 0.625 },
      { type: TYPES.FANTASMA, damage: 0.39 },
    ],
  },
  {
    attacker: TYPES.FUEGO,
    defenders: [
      { type: TYPES.PLANTA, damage: 1.6 },
      { type: TYPES.HIELO, damage: 1.6 },
      { type: TYPES.BICHO, damage: 1.6 },
      { type: TYPES.ACERO, damage: 1.6 },
      { type: TYPES.FUEGO, damage: 0.625 },
      { type: TYPES.AGUA, damage: 0.625 },
      { type: TYPES.ROCA, damage: 0.625 },
      { type: TYPES.DRAGON, damage: 0.625 },
    ],
  },
  {
    attacker: TYPES.AGUA,
    defenders: [
      { type: TYPES.FUEGO, damage: 1.6 },
      { type: TYPES.TIERRA, damage: 1.6 },
      { type: TYPES.ROCA, damage: 1.6 },
      { type: TYPES.AGUA, damage: 0.625 },
      { type: TYPES.PLANTA, damage: 0.625 },
      { type: TYPES.DRAGON, damage: 0.625 },
    ],
  },
  {
    attacker: TYPES.PLANTA,
    defenders: [
      { type: TYPES.AGUA, damage: 1.6 },
      { type: TYPES.TIERRA, damage: 1.6 },
      { type: TYPES.ROCA, damage: 1.6 },
      { type: TYPES.FUEGO, damage: 0.625 },
      { type: TYPES.PLANTA, damage: 0.625 },
      { type: TYPES.VENENO, damage: 0.625 },
      { type: TYPES.VOLADOR, damage: 0.625 },
      { type: TYPES.BICHO, damage: 0.625 },
      { type: TYPES.DRAGON, damage: 0.625 },
      { type: TYPES.ACERO, damage: 0.625 },
    ],
  },
  {
    attacker: TYPES.ELECTRICO,
    defenders: [
      { type: TYPES.AGUA, damage: 1.6 },
      { type: TYPES.VOLADOR, damage: 1.6 },
      { type: TYPES.PLANTA, damage: 0.625 },
      { type: TYPES.ELECTRICO, damage: 0.625 },
      { type: TYPES.DRAGON, damage: 0.625 },
      { type: TYPES.TIERRA, damage: 0.39 },
    ],
  },
  {
    attacker: TYPES.HIELO,
    defenders: [
      { type: TYPES.PLANTA, damage: 1.6 },
      { type: TYPES.TIERRA, damage: 1.6 },
      { type: TYPES.VOLADOR, damage: 1.6 },
      { type: TYPES.DRAGON, damage: 1.6 },
      { type: TYPES.FUEGO, damage: 0.625 },
      { type: TYPES.AGUA, damage: 0.625 },
      { type: TYPES.HIELO, damage: 0.625 },
      { type: TYPES.ACERO, damage: 0.625 },
    ],
  },
  {
    attacker: TYPES.LUCHA,
    defenders: [
      { type: TYPES.NORMAL, damage: 1.6 },
      { type: TYPES.HIELO, damage: 1.6 },
      { type: TYPES.ROCA, damage: 1.6 },
      { type: TYPES.SINIESTRO, damage: 1.6 },
      { type: TYPES.ACERO, damage: 1.6 },
      { type: TYPES.VENENO, damage: 0.625 },
      { type: TYPES.VOLADOR, damage: 0.625 },
      { type: TYPES.PSIQUICO, damage: 0.625 },
      { type: TYPES.BICHO, damage: 0.625 },
      { type: TYPES.HADA, damage: 0.625 },
      { type: TYPES.FANTASMA, damage: 0.39 },
    ],
  },
  {
    attacker: TYPES.VENENO,
    defenders: [
      { type: TYPES.PLANTA, damage: 1.6 },
      { type: TYPES.HADA, damage: 1.6 },
      { type: TYPES.VENENO, damage: 0.625 },
      { type: TYPES.TIERRA, damage: 0.625 },
      { type: TYPES.ROCA, damage: 0.625 },
      { type: TYPES.FANTASMA, damage: 0.625 },
      { type: TYPES.ACERO, damage: 0.39 },
    ],
  },
  {
    attacker: TYPES.TIERRA,
    defenders: [
      { type: TYPES.FUEGO, damage: 1.6 },
      { type: TYPES.ELECTRICO, damage: 1.6 },
      { type: TYPES.VENENO, damage: 1.6 },
      { type: TYPES.ROCA, damage: 1.6 },
      { type: TYPES.ACERO, damage: 1.6 },
      { type: TYPES.PLANTA, damage: 0.625 },
      { type: TYPES.BICHO, damage: 0.625 },
      { type: TYPES.VOLADOR, damage: 0.39 },
    ],
  },
  {
    attacker: TYPES.VOLADOR,
    defenders: [
      { type: TYPES.PLANTA, damage: 1.6 },
      { type: TYPES.LUCHA, damage: 1.6 },
      { type: TYPES.BICHO, damage: 1.6 },
      { type: TYPES.ROCA, damage: 0.625 },
      { type: TYPES.ELECTRICO, damage: 0.625 },
      { type: TYPES.ACERO, damage: 0.625 },
    ],
  },
  {
    attacker: TYPES.PSIQUICO,
    defenders: [
      { type: TYPES.LUCHA, damage: 1.6 },
      { type: TYPES.VENENO, damage: 1.6 },
      { type: TYPES.PSIQUICO, damage: 0.625 },
      { type: TYPES.ACERO, damage: 0.625 },
      { type: TYPES.SINIESTRO, damage: 0.39 },
    ],
  },
  {
    attacker: TYPES.BICHO,
    defenders: [
      { type: TYPES.PLANTA, damage: 1.6 },
      { type: TYPES.PSIQUICO, damage: 1.6 },
      { type: TYPES.SINIESTRO, damage: 1.6 },
      { type: TYPES.FUEGO, damage: 0.625 },
      { type: TYPES.LUCHA, damage: 0.625 },
      { type: TYPES.VOLADOR, damage: 0.625 },
      { type: TYPES.FANTASMA, damage: 0.625 },
      { type: TYPES.ACERO, damage: 0.625 },
      { type: TYPES.HADA, damage: 0.625 },
    ],
  },
  {
    attacker: TYPES.ROCA,
    defenders: [
      { type: TYPES.FUEGO, damage: 1.6 },
      { type: TYPES.HIELO, damage: 1.6 },
      { type: TYPES.VOLADOR, damage: 1.6 },
      { type: TYPES.BICHO, damage: 1.6 },
      { type: TYPES.LUCHA, damage: 0.625 },
      { type: TYPES.TIERRA, damage: 0.625 },
      { type: TYPES.ACERO, damage: 0.625 },
    ],
  },
  {
    attacker: TYPES.FANTASMA,
    defenders: [
      { type: TYPES.PSIQUICO, damage: 1.6 },
      { type: TYPES.FANTASMA, damage: 1.6 },
      { type: TYPES.SINIESTRO, damage: 0.625 },
      { type: TYPES.NORMAL, damage: 0.39 },
    ],
  },
  {
    attacker: TYPES.DRAGON,
    defenders: [
      { type: TYPES.DRAGON, damage: 1.6 },
      { type: TYPES.ACERO, damage: 0.625 },
      { type: TYPES.HADA, damage: 0.39 },
    ],
  },
  {
    attacker: TYPES.SINIESTRO,
    defenders: [
      { type: TYPES.PSIQUICO, damage: 1.6 },
      { type: TYPES.FANTASMA, damage: 1.6 },
      { type: TYPES.LUCHA, damage: 0.625 },
      { type: TYPES.SINIESTRO, damage: 0.625 },
      { type: TYPES.HADA, damage: 0.625 },
    ],
  },
  {
    attacker: TYPES.ACERO,
    defenders: [
      { type: TYPES.HIELO, damage: 1.6 },
      { type: TYPES.ROCA, damage: 1.6 },
      { type: TYPES.HADA, damage: 1.6 },
      { type: TYPES.FUEGO, damage: 0.625 },
      { type: TYPES.AGUA, damage: 0.625 },
      { type: TYPES.ELECTRICO, damage: 0.625 },
      { type: TYPES.ACERO, damage: 0.625 },
    ],
  },
  {
    attacker: TYPES.HADA,
    defenders: [
      { type: TYPES.LUCHA, damage: 1.6 },
      { type: TYPES.DRAGON, damage: 1.6 },
      { type: TYPES.SINIESTRO, damage: 1.6 },
      { type: TYPES.FUEGO, damage: 0.625 },
      { type: TYPES.VENENO, damage: 0.625 },
      { type: TYPES.ACERO, damage: 0.625 },
    ],
  },
];

export interface TypeDamageFE extends TypeDamage {
  highlighted: boolean;
}
