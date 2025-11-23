import { Component, Input } from '@angular/core';

export type IconSizes = 16 | 24 | 32 | 40 | 48;

@Component({
  selector: 'icon',
  standalone: true,
  imports: [],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss',
})
export class IconComponent {
  @Input() name: string | undefined;
  @Input() size?: IconSizes = 24;
}
