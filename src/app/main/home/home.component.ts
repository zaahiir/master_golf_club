import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  cards = [
    {
      title: 'Golf Collection',
      description: 'Explore our exclusive golf course collection',
      route: '/collection',
      imageSrc: 'assets/images/service/service-1.jpg'
    },
    {
      title: 'Golf Events',
      description: 'Join our professional golf training programs',
      route: '/events',
      imageSrc: 'assets/images/service/service-2.jpg'
    },
    {
      title: 'collection Plus',
      description: 'Professional golf equipment for enthusiasts',
      route: '/collectionPlus',
      imageSrc: 'assets/images/service/service-4.jpg'
    }
  ];
  
  // Feature news article
  featuredNews = {
    title: 'Key Golf Gadgets for the Determined Golfer',
    description: 'Lorem ipsum dolor sit amet consectetur. Aliquet amet elementum. Nulla facilisi. Maecenas et feugiat purus.',
    category: 'Featured',
    date: '31 DEC',
    imageSrc: 'assets/images/news/news-1.jpg',
    route: '/news'
  };
  
  // Small news articles for the grid
  smallNewsArticles = [
    {
      title: 'Spring Championship',
      category: 'Tournaments',
      date: '28 OCT',
      imageSrc: 'assets/images/female-professional-golfer-playing-golf-course-zlati-gric-slovenia.webp',
      route: '/news'
    },
    {
      title: 'Perfect Your Swing',
      category: 'Coaching',
      date: '28 OCT',
      imageSrc: 'assets/images/female-professional-golfer-playing-golf-course-zlati-gric-slovenia.webp',
      route: '/news'
    },
    {
      title: 'New Pro Clubs',
      category: 'Equipment',
      date: '28 OCT',
      imageSrc: 'assets/images/female-professional-golfer-playing-golf-course-zlati-gric-slovenia.webp',
      route: '/news'
    },
    {
      title: 'Charity Golf Day',
      category: 'Events',
      date: '28 OCT',
      imageSrc: 'assets/images/female-professional-golfer-playing-golf-course-zlati-gric-slovenia.webp',
      route: '/news'
    }
  ];
}