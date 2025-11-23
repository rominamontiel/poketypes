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
    CardAvoidListComponent
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

  //DEVUELVE TIPO ELEGIDO
  selected(): TYPES | undefined {
    return this.typeListFE.find((e) => e.selected)?.type;
  }

  //AL SELECCIONAR UN TIPO...
  selectType(type: TYPES) {
    this.bestAttackers = [];
    this.poorAttackers = [];
    this.bestDefenders = [];
    this.poorDefenders = [];

    this.typeListFE.forEach(
      (t) => (t.selected = t.type === type && !t.selected)
    );

    EFFECTIVENESS.forEach((a) => {
      a.defenders.forEach((d) => {
        // Definir mejores atacantes
        if (this.selected() === d.type && d.damage >= 1)
          this.bestAttackers.push({
            type: a.attacker,
            percentage: this.getPercentage(d.damage),
            highlighted: false,
          });

        //Definir peores atacantes
        if (this.selected() === d.type && d.damage < 1)
          this.poorAttackers.push({
            type: a.attacker,
            damage: d.damage,
          });

        //Mejores defensores
        if (a.attacker === this.selected() && d.damage < 1)
          this.bestDefenders.push({
            type: d.type,
            percentage: this.getPercentage(d.damage),
            highlighted: false,
          });

        //Peores defensores
        if (a.attacker === this.selected() && d.damage >= 1)
          this.poorDefenders.push({
            type: d.type,
            damage: d.damage,
          });
      });
    });
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
