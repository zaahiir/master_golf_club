import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  cards = [
    {
      image: 'assets/card1.jpg',
      title: 'Golf Lessons',
      description: 'Improve your skills with our professional coaches.',
      buttonText: 'Learn More'
    },
    {
      image: 'assets/card2.jpg',
      title: 'Golf Events',
      description: 'Join our upcoming tournaments and events.',
      buttonText: 'View Events'
    },
    {
      image: 'assets/card3.jpg',
      title: 'Membership',
      description: 'Become a member and enjoy exclusive benefits.',
      buttonText: 'Join Now'
    }
  ];

  carouselImages = [
    'assets/carousel1.jpg',
    'assets/carousel2.jpg',
    'assets/carousel3.jpg'
  ];
}

