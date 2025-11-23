import { Component } from '@angular/core';
import { IconComponent } from "../icon/icon.component";
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ICONS } from '../../../core/constants/icons';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [IconComponent, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  ICONS = ICONS;
}
