import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface GolfCourse {
  id: number;
  name: string;
  address: string;
  timing: string;
  phone: string;
  website: string;
  imageUrl: string;
}

@Component({
  selector: 'app-collection',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './collection.component.html',
  styleUrl: './collection.component.css'
})
export class CollectionComponent implements OnInit {
  golfCourses: GolfCourse[] = [];

  constructor() {}

  ngOnInit() {
    this.golfCourses = [
      {
        id: 1,
        name: 'Aldenham - Church Course',
        address: 'Church Ln, Aldenham, Radlett WD25 8NN',
        timing: 'Weekends from 11am',
        phone: '01923 853929',
        website: '#',
        imageUrl: 'assets/images/gettyimages-171362434-612x612.jpg'  // Updated path
      },
      {
        id: 2,
        name: 'Richmond Park Golf Course',
        address: 'Roehampton Gate, Richmond TW10 5LD',
        timing: 'Daily from 9am',
        phone: '020 8876 3205',
        website: '#',
        imageUrl: 'assets/3859.jpg'  // Updated path
      },
      {
        id: 2,
        name: 'Richmond Park Golf Course',
        address: 'Roehampton Gate, Richmond TW10 5LD',
        timing: 'Daily from 9am',
        phone: '020 8876 3205',
        website: '#',
        imageUrl: 'assets/3859.jpg'  // Updated path
      },
      {
        id: 2,
        name: 'Richmond Park Golf Course',
        address: 'Roehampton Gate, Richmond TW10 5LD',
        timing: 'Daily from 9am',
        phone: '020 8876 3205',
        website: '#',
        imageUrl: 'assets/3859.jpg'  // Updated path
      },
      {
        id: 2,
        name: 'Richmond Park Golf Course',
        address: 'Roehampton Gate, Richmond TW10 5LD',
        timing: 'Daily from 9am',
        phone: '020 8876 3205',
        website: '#',
        imageUrl: 'assets/3859.jpg'  // Updated path
      },
      {
        id: 2,
        name: 'Richmond Park Golf Course',
        address: 'Roehampton Gate, Richmond TW10 5LD',
        timing: 'Daily from 9am',
        phone: '020 8876 3205',
        website: '#',
        imageUrl: 'assets/3859.jpg'  // Updated path
      },
      {
        id: 2,
        name: 'Richmond Park Golf Course',
        address: 'Roehampton Gate, Richmond TW10 5LD',
        timing: 'Daily from 9am',
        phone: '020 8876 3205',
        website: '#',
        imageUrl: 'assets/3859.jpg'  // Updated path
        },
        {
          id: 2,
          name: 'Richmond Park Golf Course',
          address: 'Roehampton Gate, Richmond TW10 5LD',
          timing: 'Daily from 9am',
          phone: '020 8876 3205',
          website: '#',
          imageUrl: 'assets/3859.jpg'  // Updated path
        },
    ];
  }

  showBookingCard(courseId: number) {
    console.log('Opening booking modal for course:', courseId);
  }
}
