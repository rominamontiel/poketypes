import { Component, Input, OnInit } from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { ChipTypeComponent } from '../chip-type/chip-type.component';
import { ICONS } from '../../../core/constants/icons';
import { ListChipModel } from '../../../core/models/list-chip.model';

@Component({
  selector: 'card-recommended-list',
  standalone: true,
  imports: [IconComponent, ChipTypeComponent],
  templateUrl: './card-recommended-list.component.html',
  styleUrl: './card-recommended-list.component.scss',
})
export class CardRecommendedListComponent implements OnInit {
  @Input() type!: 'attack' | 'defense';
  @Input() title: string = '';
  @Input() list: ListChipModel[] = []; //TypeDamage

  ICONS = ICONS;
  
  ngOnInit() {}
}
