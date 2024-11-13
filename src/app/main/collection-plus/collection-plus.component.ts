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
      image: 'assets/card1.jpg',
      title: 'Golf Lessons',
    },
    {
      image: 'assets/card2.jpg',
      title: 'Golf Events',
    },
    {
      image: 'assets/card3.jpg',
      title: 'Membership',
    }
  ];

}
