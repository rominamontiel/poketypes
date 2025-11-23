import { Component, Input } from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { BadgeTypeComponent } from '../badge-type/badge-type.component';
import { ICONS } from '../../../core/constants/icons';
import { TypeDamage } from '../../../core/models/effectiveness';

@Component({
  selector: 'card-avoid-list',
  standalone: true,
  imports: [IconComponent, BadgeTypeComponent],
  templateUrl: './card-avoid-list.component.html',
  styleUrl: './card-avoid-list.component.scss',
})
export class CardAvoidListComponent {
  @Input() title: string = '';
  @Input() type!: 'attack' | 'defense';
  @Input() list: TypeDamage[] = [];

  ICONS = ICONS;

  getPercentage(value: number): number {
    if (value === 1.6) return 60;
    if (value === 0.39) return -60;
    if (value === 0.625) return -40;
    else {
      return 0;
    }
  }
}
