import { Component } from '@angular/core';
import { LIST_TYPES, TYPES } from '../../core/models/types.model';

@Component({
  selector: 'app-type-enemy',
  standalone: true,
  imports: [],
  templateUrl: './type-enemy.component.html',
  styleUrl: './type-enemy.component.scss',
})
export class TypeEnemyComponent {
  types = LIST_TYPES;

  enemySelected: TYPES | undefined;

  bestAttackers: TypeDamageFE[] = [];
  bestDefenders: TypeDamageFE[] = [];

  poorAttackers: TypeDamage[] = [];
  poorDefenders: TypeDamage[] = [];

  ngOnInit() {}

  //Elige un tipo enemigo
  selectEnemy(enemy: TYPES) {
    this.bestAttackers = [];
    this.poorAttackers = [];
    this.bestDefenders = [];
    this.poorDefenders = [];

    this.enemySelected = enemy === this.enemySelected ? undefined : enemy;

    EFFECTIVENESS.forEach((a) => {
      a.defenders.forEach((d) => {
        // Definir mejores atacantes
        if (this.enemySelected === d.type && d.damage >= 1)
          this.bestAttackers.push({
            type: a.attacker,
            damage: d.damage,
            highlighted: false,
          });

        //Definir peores atacantes
        if (this.enemySelected === d.type && d.damage < 1)
          this.poorAttackers.push({
            type: a.attacker,
            damage: d.damage,
          });

        //Mejores defensores
        if (a.attacker === this.enemySelected && d.damage < 1)
          this.bestDefenders.push({
            type: d.type,
            damage: d.damage,
            highlighted: false,
          });

        //Peores defensores
        if (a.attacker === this.enemySelected && d.damage >= 1)
          this.poorDefenders.push({
            type: d.type,
            damage: d.damage,
          });
      });
    });

    this.sortAndSethighlighted();
  }

  //Ordena alf y por def&atk iguales adelante, define resaltados
  sortAndSethighlighted() {
    this.bestAttackers.sort((a, b) => a.type.localeCompare(b.type));
    this.bestDefenders.sort((a, b) => a.type.localeCompare(b.type));
    this.poorAttackers.sort((a, b) => a.type.localeCompare(b.type));
    this.poorDefenders.sort((a, b) => a.type.localeCompare(b.type));

    const ATK = this.bestAttackers.map((e) => e.type);
    const DEF = this.bestDefenders.map((e) => e.type);
    const INTERSECTION = ATK.filter((a) => DEF.includes(a)).sort();

    // marco highlighted y reordeno con los de la intersección adelante
    this.bestAttackers = [
      ...this.bestAttackers
        .map((e) => ({ ...e, highlighted: INTERSECTION.includes(e.type) }))
        .sort((a, b) => {
          // primero los que están en la intersección
          if (a.highlighted && !b.highlighted) return -1;
          if (!a.highlighted && b.highlighted) return 1;
          // si ambos están igual → orden alfabético
          return a.type.localeCompare(b.type);
        }),
    ];
    this.bestDefenders = [
      ...this.bestDefenders
        .map((e) => ({ ...e, highlighted: INTERSECTION.includes(e.type) }))
        .sort((a, b) => {
          if (a.highlighted && !b.highlighted) return -1;
          if (!a.highlighted && b.highlighted) return 1;
          return a.type.localeCompare(b.type);
        }),
    ];
  }

  getPercentage(value: number): string | undefined {
    if (value === 1.6) return '+60%';
    if (value === 0.39) return '-60%';
    if (value === 0.625) return '-40%';
    else {
      return undefined;
    }
  }
}
import {
  EFFECTIVENESS,
  TypeDamage,
  TypeDamageFE,
} from '../../core/models/effectiveness';
