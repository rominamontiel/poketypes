import { Component, Input } from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { BadgeTypeComponent } from '../badge-type/badge-type.component';
import { TYPES } from '../../../core/models/types.model';
import { ICONS } from '../../../core/constants/icons';

@Component({
  selector: 'card-selected-types',
  standalone: true,
  imports: [IconComponent, BadgeTypeComponent],
  templateUrl: './card-selected-types.component.html',
  styleUrl: './card-selected-types.component.scss',
})
export class CardSelectedTypesComponent {
  @Input() type: TYPES | undefined;
  @Input() isEnemy: boolean = true;
  ICONS = ICONS;
}
