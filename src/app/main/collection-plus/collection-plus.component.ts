import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-collection-plus',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './collection-plus.component.html',
  styleUrl: './collection-plus.component.css'
})
export class CollectionPlusComponent {
  cards = [
    {
      country: 'Canada',
    },
    {
      country: 'USA',
    },
    {
      country: 'Europe',
    }
  ];

}
