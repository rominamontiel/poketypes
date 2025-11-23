import { Component, Input } from '@angular/core';
import { TYPES } from '../../../core/models/types.model';

@Component({
  selector: 'blur-light',
  standalone: true,
  imports: [],
  templateUrl: './blur-light.component.html',
  styleUrl: './blur-light.component.scss',
})
export class BlurLightComponent {
  @Input() type: TYPES | undefined = TYPES.HADA;
}
