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

  carouselSlides = [
    {
      image: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
      title: 'Explore Our Destination ',
      description: 'Discover the beauty and tranquility of our resort Discover the beauty and tranquility of our resort .',
      buttonText: 'Learn More',
      link: '#'
    },
    {
      image: 'https://images.unsplash.com/photo-1552083375-1447ce886485?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
      title: 'Upcoming Events',
      description: 'Join us for our exciting golf tournaments and activities.',
      buttonText: 'View Events',
      link: '#'
    },
    {
      image: 'https://images.unsplash.com/photo-1502759683299-cdcd6974244f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
      title: 'Become a Member',
      description: 'Enjoy exclusive benefits and privileges as a member.',
      buttonText: 'Join Now',
      link: '#'
    }
  ];

  currentSlide = 0;

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.carouselSlides.length;
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.carouselSlides.length) % this.carouselSlides.length;
  }
}