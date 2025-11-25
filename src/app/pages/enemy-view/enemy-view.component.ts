import { Component, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';
import { ICONS } from '../../core/constants/icons';
import { BadgeTypeComponent } from '../../components/ui/badge-type/badge-type.component';
import { BlurLightComponent } from '../../components/ui/blur-light/blur-light.component';
import { CardAvoidListComponent } from '../../components/ui/card-avoid-list/card-avoid-list.component';
import { CardRecommendedListComponent } from '../../components/ui/card-recommended-list/card-recommended-list.component';
import { CardSelectedTypesComponent } from '../../components/ui/card-selected-types/card-selected-types.component';
import { ChipTypeComponent } from '../../components/ui/chip-type/chip-type.component';
import { IconComponent } from '../../components/ui/icon/icon.component';
import { TypeDamage, EFFECTIVENESS } from '../../core/models/effectiveness';
import { LIST_TYPES, TYPES } from '../../core/models/types.model';
import { ListChipModel } from '../../core/models/list-chip.model';

@Component({
  selector: 'app-enemy-view',
  standalone: true,
  imports: [
    BadgeTypeComponent,
    IconComponent,
    NgClass,
    BlurLightComponent,
    CardSelectedTypesComponent,
    CardRecommendedListComponent,
    CardAvoidListComponent,
  ],
  templateUrl: './enemy-view.component.html',
  styleUrl: './enemy-view.component.scss',
})
export class EnemyViewComponent implements OnInit {
  ICONS = ICONS;
  typeList = LIST_TYPES;
  typeListFE: {
    type: TYPES;
    selected: boolean;
  }[] = this.typeList.map((t) => ({ type: t, selected: false }));

  bestAttackers: ChipTypeComponent[] = [];
  bestDefenders: ChipTypeComponent[] = [];

  poorAttackers: TypeDamage[] = [];
  poorDefenders: TypeDamage[] = [];

  ngOnInit() {}

  someSelected(): boolean {
    return this.typeListFE.some((e) => e.selected);
  }

  //DEVUELVE TIPOS ELEGIDO
  selected(): TYPES[] {
    const SELECTED = this.typeListFE.filter((e) => e.selected);
    return SELECTED.map((e) => e.type);
  }

  clearSelection() {
    this.typeListFE.map((e) => (e.selected = false));
  }

  //AL SELECCIONAR UN TIPO...
  selectType(type: TYPES) {
    const T1: TYPES | undefined = this.selected()[0];
    const T2: TYPES | undefined = this.selected()[1];

    //NINGUNO SELECCIONADO
    if (this.selected()?.length === 0) {
      this.typeListFE.forEach((e) => (e.selected = e.type === type));
      // 1 SELECCIONADO
    } else if (this.selected()?.length === 1) {
      this.typeListFE.forEach((e) => {
        if (type === T1) {
          e.selected = false;
        } else if (type === e.type) e.selected = !e.selected;
      });
      // 2 SELECCIONADOS
    } else if (this.selected()?.length === 2) {
      this.typeListFE.forEach((e) => {
        if (e.type === type && type === T1) e.selected = false;
        if (e.type === type && type === T2) e.selected = false;
      });
    }

    this.calcEffectiveness();
  }

  calcEffectiveness() {
    this.bestAttackers = [];
    this.poorAttackers = [];
    this.bestDefenders = [];
    this.poorDefenders = [];

    // -------------------------------------------
    // -------- SOLO UN TIPO SELECCIONADO --------
    // -------------------------------------------
    if (this.selected().length === 1) {
      const TYPE_SELECTED = this.selected()[0];
      EFFECTIVENESS.forEach((a) => {
        a.defenders.forEach((d) => {
          // Definir mejores atacantes
          if (TYPE_SELECTED === d.type && d.damage >= 1)
            this.bestAttackers.push({
              type: a.attacker,
              percentage: this.getPercentage(d.damage),
              highlighted: false,
            });
          //Definir peores atacantes
          if (TYPE_SELECTED === d.type && d.damage < 1)
            this.poorAttackers.push({
              type: a.attacker,
              damage: d.damage,
            });
          //Mejores defensores
          if (a.attacker === TYPE_SELECTED && d.damage < 1)
            this.bestDefenders.push({
              type: d.type,
              percentage: this.getPercentage(d.damage),
              highlighted: false,
            });
          //Peores defensores
          if (a.attacker === TYPE_SELECTED && d.damage >= 1)
            this.poorDefenders.push({
              type: d.type,
              damage: d.damage,
            });
        });
      });
      // -------------------------------------------
      // --------- DOS TIPOS SELECCIONADOS ---------
      // -------------------------------------------
    } else if (this.selected().length === 2) {
      const T1: TYPES = this.selected()[0];
      const T2: TYPES = this.selected()[1];

      const INTERSECTION = (list1: TypeDamage[], list2: TypeDamage[]) => {
        const LIST2_STRINGS = list2.map((e) => e.type);
        return list1.filter((e) => LIST2_STRINGS.includes(e.type));
      };

      //------------Mejores-Peores defensores------------
      let resistT1: TypeDamage[] = [];
      let poorResistT1: TypeDamage[] = [];
      let resistT2: TypeDamage[] = [];
      let poorResistT2: TypeDamage[] = [];

      EFFECTIVENESS.forEach((e) => {
        if (e.attacker === T1) {
          e.defenders.forEach((d) => {
            if (d.damage < 1) resistT1.push(d);
            if (d.damage > 1) poorResistT1.push(d);
          });
        }
        if (e.attacker === T2) {
          e.defenders.forEach((d) => {
            if (d.damage < 1) resistT2.push(d);
            if (d.damage > 1) poorResistT2.push(d);
          });
        }
      });
      //Defino Mejores defensores
      INTERSECTION(resistT1, resistT2).forEach((e) => {
        const ITEM: ListChipModel = {
          type: e.type,
          highlighted: false,
          percentage: this.getPercentage(e.damage),
        };
        this.bestDefenders.push(ITEM);
      });
      //Defino Defensores no recomendados
      this.poorDefenders = INTERSECTION(poorResistT1, poorResistT2);

      //--------------MEJORES/PEORES ATACANQUES--------------

      //Nueva lista de efectividades para los tipo1 y tipo2 en simultáneo
      let attackers: TypeDamage[] = [];

      EFFECTIVENESS.forEach((e) => {
        let damage_t1 = 1;
        let damage_t2 = 1;
        e.defenders.forEach((d) => {
          if (d.type === T1) damage_t1 = d.damage;
          if (d.type === T2) damage_t2 = d.damage;
        });
        attackers.push({
          type: e.attacker,
          damage: damage_t1 * damage_t2,
        });
      });

      attackers.forEach((a) => {
        if (a.damage > 1)
          this.bestAttackers.push({
            type: a.type,
            highlighted: false,
            percentage: this.getPercentage(a.damage),
          });
        if (a.damage < 1) this.poorAttackers.push(a);
      });
    }

    this.sortAndSethighlighted();
  }

  //Ordena alf y por def & atk iguales adelante, define resaltados
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

  getPercentage(value: number): number {
    if (value === 1.6) return 60;
    if (value === 0.39) return -60;
    if (value === 0.625) return -40;
    else {
      return 0;
    }
  }
}
