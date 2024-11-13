import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router  } from '@angular/router';

@Component({
  selector: 'app-collection-plus',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './collection-plus.component.html',
  styleUrl: './collection-plus.component.css'
})

export class CollectionPlusComponent {
  cards = [
    { country: 'Canada', backgroundImage: 'url(assets/3859.jpg)' },
    { country: 'USA', backgroundImage: 'url(assets/3859.jpg)' },
    { country: 'Europe', backgroundImage: 'url(assets/3859.jpg)' },
    { country: 'Australia', backgroundImage: 'url(assets/3859.jpg)' },
    { country: 'India', backgroundImage: 'url(assets/3859.jpg)' },
    { country: 'Japan', backgroundImage: 'url(assets/3859.jpg)' },
  ];

  constructor(private router: Router) {}

  navigateToDestination(country: string) {
    this.router.navigate(['/destination']);
  }
}
