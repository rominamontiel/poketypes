import { Component, Input } from '@angular/core';
import { IconComponent, IconSizes } from '../icon/icon.component';
import { TYPES } from '../../../core/models/types.model';

@Component({
  selector: 'badge-type',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './badge-type.component.html',
  styleUrl: './badge-type.component.scss',
})
export class BadgeTypeComponent {
  @Input() type: TYPES | undefined;
  @Input() size: 24 | 32 | 40 = 32;
  @Input() showRing: boolean = false;
  @Input() showGlow: boolean = false;

  iconSize(): IconSizes {
    const MAP: Record<24 | 32 | 40 | 48, IconSizes> = {
      24: 16,
      32: 24,
      40: 32,
      48: 40,
    };
    return MAP[this.size];
  }
}
