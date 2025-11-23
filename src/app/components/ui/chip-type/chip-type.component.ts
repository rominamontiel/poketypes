import { Component, Input } from '@angular/core';
import { BadgeTypeComponent } from "../badge-type/badge-type.component";
import { TYPES } from '../../../core/models/types.model';

@Component({
  selector: 'chip-type',
  standalone: true,
  imports: [BadgeTypeComponent],
  templateUrl: './chip-type.component.html',
  styleUrl: './chip-type.component.scss',
})
export class ChipTypeComponent {
  @Input() type!: TYPES;
  @Input() highlighted: boolean = false;
  @Input() percentage: number = 60;
}
