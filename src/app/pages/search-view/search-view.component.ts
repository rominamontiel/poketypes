import { Component } from '@angular/core';
import { BlurLightComponent } from '../../components/ui/blur-light/blur-light.component';
import { BadgeTypeComponent } from '../../components/ui/badge-type/badge-type.component';
import { CardSelectedTypesComponent } from '../../components/ui/card-selected-types/card-selected-types.component';
import { CardRecommendedListComponent } from '../../components/ui/card-recommended-list/card-recommended-list.component';
import { CardAvoidListComponent } from '../../components/ui/card-avoid-list/card-avoid-list.component';
import { ICONS } from '../../core/constants/icons';
import {
  LIST_TYPES,
  MAP_EN_ES_TYPES,
  TYPES,
} from '../../core/models/types.model';
import { ChipTypeComponent } from '../../components/ui/chip-type/chip-type.component';
import { EFFECTIVENESS, TypeDamage } from '../../core/models/effectiveness';
import { NgClass } from '@angular/common';
import { IconComponent } from '../../components/ui/icon/icon.component';
import { PokeApiService } from '../../services/poke-api.service';
import { firstValueFrom } from 'rxjs';
import { LoaderFullscreenComponent } from '../../components/ui/loader-fullscreen/loader-fullscreen.component';
import { ListChipModel } from '../../core/models/list-chip.model';

interface SelectedPokemonFE {
  name: string;
  img: string;
  id: number;
  types: TYPES[];
}
@Component({
  selector: 'app-search-view',
  standalone: true,
  imports: [
    BlurLightComponent,
    BadgeTypeComponent,
    CardRecommendedListComponent,
    CardAvoidListComponent,
    IconComponent,
    LoaderFullscreenComponent,
  ],
  templateUrl: './search-view.component.html',
  styleUrl: './search-view.component.scss',
})
export class SearchViewComponent {
  ICONS = ICONS;
  TYPES = TYPES;

  bestAttackers: ChipTypeComponent[] = [];
  bestDefenders: ChipTypeComponent[] = [];
  poorAttackers: TypeDamage[] = [];
  poorDefenders: TypeDamage[] = [];

  showListResults = false;
  searchWriting = ''; //input

  pokemonSelected: SelectedPokemonFE | undefined;

  isLoading = false;

  fullListPokemons: { name: string; id: number; selected: boolean }[] = [];

  constructor(private readonly pokeApiService: PokeApiService) {}

  ngOnInit() {
    this.getPokemonListService();
  }

  async getPokemonListService() {
    this.isLoading = true;
    const POKEMON_ID = (url: string): number =>
      Number(url.replace(/.*\/(\d+)\/?$/, '$1'));

    try {
      const RESPONSE = await firstValueFrom(
        this.pokeApiService.getPokemonFullList()
      );
      if (RESPONSE?.results) {
        this.fullListPokemons = RESPONSE.results.map((e) => ({
          name: e.name,
          id: POKEMON_ID(e.url),
          selected: false,
        }));
      }
    } catch (err) {
      console.log('err:', err);
    } finally {
      this.isLoading = false;
    }
  }

  async getSpecificPokemon(id: string) {
    this.pokemonSelected = undefined;
    this.isLoading = true;

    try {
      const RESPONSE = await firstValueFrom(
        this.pokeApiService.getSpecificPokemon(id)
      );
      if (RESPONSE) {
        let ARRAY_TYPES: TYPES[] = [];
        RESPONSE.types.forEach((e) => {
          ARRAY_TYPES.push(MAP_EN_ES_TYPES[e.type.name]);
        });

        this.pokemonSelected = {
          name: RESPONSE.name,
          id: RESPONSE.id,
          img: RESPONSE.sprites.front_default,
          types: ARRAY_TYPES,
        };

        if (this.pokemonSelected.types.length > 0) this.calcEffectiveness();
      }
    } catch (error) {
      this.pokemonSelected = undefined;
    } finally {
      this.isLoading = false;
    }
  }

  // Manejo de errores en <img>
  onImageError(event: Event) {
    (event.target as HTMLImageElement).src = 'assets/img/sprites/egg.png';
  }

  //-*-*-*-*-*-*-*-*-*-*-*-*-*-*
  //-----INPUT-AUTOCOMPLETE-----
  //-*-*-*-*-*-*-*-*-*-*-*-*-*-*
  clearInput() {
    this.searchWriting = '';
    this.pokemonSelected = undefined;
  }
  inputSelectPokemon(name: string) {
    document.body.click();
    const ID = this.fullListPokemons.find((e) => e.name === name);
    this.fullListPokemons.forEach((e) => {
      e.selected = e.name === name;
    });
    if (ID) this.getSpecificPokemon(`${ID.id}`);
  }
  inputTextChanges(event: Event) {
    this.searchWriting = (event.target as HTMLInputElement).value;
  }
  filteredlist(): string[] {
    return this.fullListPokemons
      .filter((e) =>
        this.normalizeString(e.name).includes(
          this.normalizeString(this.searchWriting)
        )
      )
      .map((e) => e.name);
  }
  normalizeString(value: string): string {
    return value
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();
  }

  calcEffectiveness() {
    this.bestAttackers = [];
    this.poorAttackers = [];
    this.bestDefenders = [];
    this.poorDefenders = [];

    // -------------------------------------------
    // -------- SOLO UN TIPO SELECCIONADO --------
    // -------------------------------------------
    if (this.pokemonSelected?.types.length === 1) {
      const TYPE_SELECTED = this.pokemonSelected?.types[0];
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
    } else if (this.pokemonSelected?.types.length === 2) {
      const T1: TYPES = this.pokemonSelected.types[0];
      const T2: TYPES = this.pokemonSelected.types[1];

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
