import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

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
  imports: [CommonModule, InfiniteScrollModule],
  templateUrl: './collection.component.html',
  styleUrl: './collection.component.css'
})
export class CollectionComponent implements OnInit {
  golfCourses: GolfCourse[] = [];
  displayedCourses: GolfCourse[] = [];
  courseBatchSize: number = 6; // Number of items to load per batch
  loadedItemsCount: number = 0;

  constructor() {}

  ngOnInit() {
    // Full list of courses
    this.golfCourses = [
      { id: 1, name: 'Aldenham - Church Course', address: 'Church Ln, Aldenham, Radlett WD25 8NN', timing: 'Weekends from 11am', phone: '01923 853929', website: '#', imageUrl: 'assets/images/gettyimages-171362434-612x612.jpg' },
      { id: 2, name: 'Richmond Park Golf Course', address: 'Roehampton Gate, Richmond TW10 5LD', timing: 'Daily from 9am', phone: '020 8876 3205', website: '#', imageUrl: 'assets/3859.jpg' },
      { id: 3, name: 'Another Course', address: 'Example Address', timing: 'Daily from 9am', phone: '020 8876 3205', website: '#', imageUrl: 'assets/3859.jpg' },
      { id: 4, name: 'Aldenham - Church Course', address: 'Church Ln, Aldenham, Radlett WD25 8NN', timing: 'Weekends from 11am', phone: '01923 853929', website: '#', imageUrl: 'assets/images/gettyimages-171362434-612x612.jpg' },
      { id: 5, name: 'Another Course', address: 'Example Address', timing: 'Daily from 9am', phone: '020 8876 3205', website: '#', imageUrl: 'assets/3859.jpg' },
      { id: 6, name: 'Aldenham - Church Course', address: 'Church Ln, Aldenham, Radlett WD25 8NN', timing: 'Weekends from 11am', phone: '01923 853929', website: '#', imageUrl: 'assets/images/gettyimages-171362434-612x612.jpg' },
      { id: 7, name: 'Another Course', address: 'Example Address', timing: 'Daily from 9am', phone: '020 8876 3205', website: '#', imageUrl: 'assets/3859.jpg' },
      { id: 8, name: 'Aldenham - Church Course', address: 'Church Ln, Aldenham, Radlett WD25 8NN', timing: 'Weekends from 11am', phone: '01923 853929', website: '#', imageUrl: 'assets/images/gettyimages-171362434-612x612.jpg' },
      { id: 9, name: 'Another Course', address: 'Example Address', timing: 'Daily from 9am', phone: '020 8876 3205', website: '#', imageUrl: 'assets/3859.jpg' },
      { id: 10, name: 'Aldenham - Church Course', address: 'Church Ln, Aldenham, Radlett WD25 8NN', timing: 'Weekends from 11am', phone: '01923 853929', website: '#', imageUrl: 'assets/images/gettyimages-171362434-612x612.jpg' },
      { id: 11, name: 'Another Course', address: 'Example Address', timing: 'Daily from 9am', phone: '020 8876 3205', website: '#', imageUrl: 'assets/3859.jpg' },
      { id: 12, name: 'Aldenham - Church Course', address: 'Church Ln, Aldenham, Radlett WD25 8NN', timing: 'Weekends from 11am', phone: '01923 853929', website: '#', imageUrl: 'assets/images/gettyimages-171362434-612x612.jpg' },
      { id: 13, name: 'Another Course', address: 'Example Address', timing: 'Daily from 9am', phone: '020 8876 3205', website: '#', imageUrl: 'assets/3859.jpg' },
      { id: 4, name: 'Aldenham - Church Course', address: 'Church Ln, Aldenham, Radlett WD25 8NN', timing: 'Weekends from 11am', phone: '01923 853929', website: '#', imageUrl: 'assets/images/gettyimages-171362434-612x612.jpg' },
      { id: 5, name: 'Another Course', address: 'Example Address', timing: 'Daily from 9am', phone: '020 8876 3205', website: '#', imageUrl: 'assets/3859.jpg' },
      { id: 6, name: 'Aldenham - Church Course', address: 'Church Ln, Aldenham, Radlett WD25 8NN', timing: 'Weekends from 11am', phone: '01923 853929', website: '#', imageUrl: 'assets/images/gettyimages-171362434-612x612.jpg' },
      { id: 7, name: 'Another Course', address: 'Example Address', timing: 'Daily from 9am', phone: '020 8876 3205', website: '#', imageUrl: 'assets/3859.jpg' },
      { id: 8, name: 'Aldenham - Church Course', address: 'Church Ln, Aldenham, Radlett WD25 8NN', timing: 'Weekends from 11am', phone: '01923 853929', website: '#', imageUrl: 'assets/images/gettyimages-171362434-612x612.jpg' },
      { id: 9, name: 'Another Course', address: 'Example Address', timing: 'Daily from 9am', phone: '020 8876 3205', website: '#', imageUrl: 'assets/3859.jpg' },
      { id: 10, name: 'Aldenham - Church Course', address: 'Church Ln, Aldenham, Radlett WD25 8NN', timing: 'Weekends from 11am', phone: '01923 853929', website: '#', imageUrl: 'assets/images/gettyimages-171362434-612x612.jpg' },
      { id: 11, name: 'Another Course', address: 'Example Address', timing: 'Daily from 9am', phone: '020 8876 3205', website: '#', imageUrl: 'assets/3859.jpg' },
      { id: 12, name: 'Aldenham - Church Course', address: 'Church Ln, Aldenham, Radlett WD25 8NN', timing: 'Weekends from 11am', phone: '01923 853929', website: '#', imageUrl: 'assets/images/gettyimages-171362434-612x612.jpg' },
      { id: 13, name: 'Another Course', address: 'Example Address', timing: 'Daily from 9am', phone: '020 8876 3205', website: '#', imageUrl: 'assets/3859.jpg' },
      { id: 12, name: 'Aldenham - Church Course', address: 'Church Ln, Aldenham, Radlett WD25 8NN', timing: 'Weekends from 11am', phone: '01923 853929', website: '#', imageUrl: 'assets/images/gettyimages-171362434-612x612.jpg' },
      { id: 13, name: 'Another Course', address: 'Example Address', timing: 'Daily from 9am', phone: '020 8876 3205', website: '#', imageUrl: 'assets/3859.jpg' },
      { id: 4, name: 'Aldenham - Church Course', address: 'Church Ln, Aldenham, Radlett WD25 8NN', timing: 'Weekends from 11am', phone: '01923 853929', website: '#', imageUrl: 'assets/images/gettyimages-171362434-612x612.jpg' },
      { id: 5, name: 'Another Course', address: 'Example Address', timing: 'Daily from 9am', phone: '020 8876 3205', website: '#', imageUrl: 'assets/3859.jpg' },
      { id: 6, name: 'Aldenham - Church Course', address: 'Church Ln, Aldenham, Radlett WD25 8NN', timing: 'Weekends from 11am', phone: '01923 853929', website: '#', imageUrl: 'assets/images/gettyimages-171362434-612x612.jpg' },
      { id: 7, name: 'Another Course', address: 'Example Address', timing: 'Daily from 9am', phone: '020 8876 3205', website: '#', imageUrl: 'assets/3859.jpg' },
      { id: 8, name: 'Aldenham - Church Course', address: 'Church Ln, Aldenham, Radlett WD25 8NN', timing: 'Weekends from 11am', phone: '01923 853929', website: '#', imageUrl: 'assets/images/gettyimages-171362434-612x612.jpg' },
      { id: 9, name: 'Another Course', address: 'Example Address', timing: 'Daily from 9am', phone: '020 8876 3205', website: '#', imageUrl: 'assets/3859.jpg' },
      { id: 10, name: 'Aldenham - Church Course', address: 'Church Ln, Aldenham, Radlett WD25 8NN', timing: 'Weekends from 11am', phone: '01923 853929', website: '#', imageUrl: 'assets/images/gettyimages-171362434-612x612.jpg' },
      { id: 11, name: 'Another Course', address: 'Example Address', timing: 'Daily from 9am', phone: '020 8876 3205', website: '#', imageUrl: 'assets/3859.jpg' },
      { id: 12, name: 'Aldenham - Church Course', address: 'Church Ln, Aldenham, Radlett WD25 8NN', timing: 'Weekends from 11am', phone: '01923 853929', website: '#', imageUrl: 'assets/images/gettyimages-171362434-612x612.jpg' },
      { id: 13, name: 'Another Course', address: 'Example Address', timing: 'Daily from 9am', phone: '020 8876 3205', website: '#', imageUrl: 'assets/3859.jpg' },
      { id: 12, name: 'Aldenham - Church Course', address: 'Church Ln, Aldenham, Radlett WD25 8NN', timing: 'Weekends from 11am', phone: '01923 853929', website: '#', imageUrl: 'assets/images/gettyimages-171362434-612x612.jpg' },
      { id: 13, name: 'Another Course', address: 'Example Address', timing: 'Daily from 9am', phone: '020 8876 3205', website: '#', imageUrl: 'assets/3859.jpg' },
      { id: 4, name: 'Aldenham - Church Course', address: 'Church Ln, Aldenham, Radlett WD25 8NN', timing: 'Weekends from 11am', phone: '01923 853929', website: '#', imageUrl: 'assets/images/gettyimages-171362434-612x612.jpg' },
      { id: 5, name: 'Another Course', address: 'Example Address', timing: 'Daily from 9am', phone: '020 8876 3205', website: '#', imageUrl: 'assets/3859.jpg' },
      { id: 6, name: 'Aldenham - Church Course', address: 'Church Ln, Aldenham, Radlett WD25 8NN', timing: 'Weekends from 11am', phone: '01923 853929', website: '#', imageUrl: 'assets/images/gettyimages-171362434-612x612.jpg' },
      { id: 7, name: 'Another Course', address: 'Example Address', timing: 'Daily from 9am', phone: '020 8876 3205', website: '#', imageUrl: 'assets/3859.jpg' },
      { id: 8, name: 'Aldenham - Church Course', address: 'Church Ln, Aldenham, Radlett WD25 8NN', timing: 'Weekends from 11am', phone: '01923 853929', website: '#', imageUrl: 'assets/images/gettyimages-171362434-612x612.jpg' },
      { id: 9, name: 'Another Course', address: 'Example Address', timing: 'Daily from 9am', phone: '020 8876 3205', website: '#', imageUrl: 'assets/3859.jpg' },
      { id: 10, name: 'Aldenham - Church Course', address: 'Church Ln, Aldenham, Radlett WD25 8NN', timing: 'Weekends from 11am', phone: '01923 853929', website: '#', imageUrl: 'assets/images/gettyimages-171362434-612x612.jpg' },
      { id: 11, name: 'Another Course', address: 'Example Address', timing: 'Daily from 9am', phone: '020 8876 3205', website: '#', imageUrl: 'assets/3859.jpg' },
      { id: 12, name: 'Aldenham - Church Course', address: 'Church Ln, Aldenham, Radlett WD25 8NN', timing: 'Weekends from 11am', phone: '01923 853929', website: '#', imageUrl: 'assets/images/gettyimages-171362434-612x612.jpg' },
      { id: 13, name: 'Another Course', address: 'Example Address', timing: 'Daily from 9am', phone: '020 8876 3205', website: '#', imageUrl: 'assets/3859.jpg' },
      { id: 12, name: 'Aldenham - Church Course', address: 'Church Ln, Aldenham, Radlett WD25 8NN', timing: 'Weekends from 11am', phone: '01923 853929', website: '#', imageUrl: 'assets/images/gettyimages-171362434-612x612.jpg' },
      { id: 13, name: 'Another Course', address: 'Example Address', timing: 'Daily from 9am', phone: '020 8876 3205', website: '#', imageUrl: 'assets/3859.jpg' },
      { id: 4, name: 'Aldenham - Church Course', address: 'Church Ln, Aldenham, Radlett WD25 8NN', timing: 'Weekends from 11am', phone: '01923 853929', website: '#', imageUrl: 'assets/images/gettyimages-171362434-612x612.jpg' },
      { id: 5, name: 'Another Course', address: 'Example Address', timing: 'Daily from 9am', phone: '020 8876 3205', website: '#', imageUrl: 'assets/3859.jpg' },
      { id: 6, name: 'Aldenham - Church Course', address: 'Church Ln, Aldenham, Radlett WD25 8NN', timing: 'Weekends from 11am', phone: '01923 853929', website: '#', imageUrl: 'assets/images/gettyimages-171362434-612x612.jpg' },
      { id: 7, name: 'Another Course', address: 'Example Address', timing: 'Daily from 9am', phone: '020 8876 3205', website: '#', imageUrl: 'assets/3859.jpg' },
      { id: 8, name: 'Aldenham - Church Course', address: 'Church Ln, Aldenham, Radlett WD25 8NN', timing: 'Weekends from 11am', phone: '01923 853929', website: '#', imageUrl: 'assets/images/gettyimages-171362434-612x612.jpg' },
      { id: 9, name: 'Another Course', address: 'Example Address', timing: 'Daily from 9am', phone: '020 8876 3205', website: '#', imageUrl: 'assets/3859.jpg' },
      { id: 10, name: 'Aldenham - Church Course', address: 'Church Ln, Aldenham, Radlett WD25 8NN', timing: 'Weekends from 11am', phone: '01923 853929', website: '#', imageUrl: 'assets/images/gettyimages-171362434-612x612.jpg' },
      { id: 11, name: 'Another Course', address: 'Example Address', timing: 'Daily from 9am', phone: '020 8876 3205', website: '#', imageUrl: 'assets/3859.jpg' },
      { id: 12, name: 'Aldenham - Church Course', address: 'Church Ln, Aldenham, Radlett WD25 8NN', timing: 'Weekends from 11am', phone: '01923 853929', website: '#', imageUrl: 'assets/images/gettyimages-171362434-612x612.jpg' },
      { id: 13, name: 'Another Course', address: 'Example Address', timing: 'Daily from 9am', phone: '020 8876 3205', website: '#', imageUrl: 'assets/3859.jpg' },
      { id: 12, name: 'Aldenham - Church Course', address: 'Church Ln, Aldenham, Radlett WD25 8NN', timing: 'Weekends from 11am', phone: '01923 853929', website: '#', imageUrl: 'assets/images/gettyimages-171362434-612x612.jpg' },
      { id: 13, name: 'Another Course', address: 'Example Address', timing: 'Daily from 9am', phone: '020 8876 3205', website: '#', imageUrl: 'assets/3859.jpg' },
      { id: 4, name: 'Aldenham - Church Course', address: 'Church Ln, Aldenham, Radlett WD25 8NN', timing: 'Weekends from 11am', phone: '01923 853929', website: '#', imageUrl: 'assets/images/gettyimages-171362434-612x612.jpg' },
      { id: 5, name: 'Another Course', address: 'Example Address', timing: 'Daily from 9am', phone: '020 8876 3205', website: '#', imageUrl: 'assets/3859.jpg' },
      { id: 6, name: 'Aldenham - Church Course', address: 'Church Ln, Aldenham, Radlett WD25 8NN', timing: 'Weekends from 11am', phone: '01923 853929', website: '#', imageUrl: 'assets/images/gettyimages-171362434-612x612.jpg' },
      { id: 7, name: 'Another Course', address: 'Example Address', timing: 'Daily from 9am', phone: '020 8876 3205', website: '#', imageUrl: 'assets/3859.jpg' },
      { id: 8, name: 'Aldenham - Church Course', address: 'Church Ln, Aldenham, Radlett WD25 8NN', timing: 'Weekends from 11am', phone: '01923 853929', website: '#', imageUrl: 'assets/images/gettyimages-171362434-612x612.jpg' },
      { id: 9, name: 'Another Course', address: 'Example Address', timing: 'Daily from 9am', phone: '020 8876 3205', website: '#', imageUrl: 'assets/3859.jpg' },
      { id: 10, name: 'Aldenham - Church Course', address: 'Church Ln, Aldenham, Radlett WD25 8NN', timing: 'Weekends from 11am', phone: '01923 853929', website: '#', imageUrl: 'assets/images/gettyimages-171362434-612x612.jpg' },
      { id: 11, name: 'Another Course', address: 'Example Address', timing: 'Daily from 9am', phone: '020 8876 3205', website: '#', imageUrl: 'assets/3859.jpg' },
      { id: 12, name: 'Aldenham - Church Course', address: 'Church Ln, Aldenham, Radlett WD25 8NN', timing: 'Weekends from 11am', phone: '01923 853929', website: '#', imageUrl: 'assets/images/gettyimages-171362434-612x612.jpg' },
      { id: 13, name: 'Another Course', address: 'Example Address', timing: 'Daily from 9am', phone: '020 8876 3205', website: '#', imageUrl: 'assets/3859.jpg' },
      { id: 12, name: 'Aldenham - Church Course', address: 'Church Ln, Aldenham, Radlett WD25 8NN', timing: 'Weekends from 11am', phone: '01923 853929', website: '#', imageUrl: 'assets/images/gettyimages-171362434-612x612.jpg' },
      { id: 13, name: 'Another Course', address: 'Example Address', timing: 'Daily from 9am', phone: '020 8876 3205', website: '#', imageUrl: 'assets/3859.jpg' },
      { id: 4, name: 'Aldenham - Church Course', address: 'Church Ln, Aldenham, Radlett WD25 8NN', timing: 'Weekends from 11am', phone: '01923 853929', website: '#', imageUrl: 'assets/images/gettyimages-171362434-612x612.jpg' },
      { id: 5, name: 'Another Course', address: 'Example Address', timing: 'Daily from 9am', phone: '020 8876 3205', website: '#', imageUrl: 'assets/3859.jpg' },
      { id: 6, name: 'Aldenham - Church Course', address: 'Church Ln, Aldenham, Radlett WD25 8NN', timing: 'Weekends from 11am', phone: '01923 853929', website: '#', imageUrl: 'assets/images/gettyimages-171362434-612x612.jpg' },
      { id: 7, name: 'Another Course', address: 'Example Address', timing: 'Daily from 9am', phone: '020 8876 3205', website: '#', imageUrl: 'assets/3859.jpg' },
      { id: 8, name: 'Aldenham - Church Course', address: 'Church Ln, Aldenham, Radlett WD25 8NN', timing: 'Weekends from 11am', phone: '01923 853929', website: '#', imageUrl: 'assets/images/gettyimages-171362434-612x612.jpg' },
      { id: 9, name: 'Another Course', address: 'Example Address', timing: 'Daily from 9am', phone: '020 8876 3205', website: '#', imageUrl: 'assets/3859.jpg' },
      { id: 10, name: 'Aldenham - Church Course', address: 'Church Ln, Aldenham, Radlett WD25 8NN', timing: 'Weekends from 11am', phone: '01923 853929', website: '#', imageUrl: 'assets/images/gettyimages-171362434-612x612.jpg' },
      { id: 11, name: 'Another Course', address: 'Example Address', timing: 'Daily from 9am', phone: '020 8876 3205', website: '#', imageUrl: 'assets/3859.jpg' },
      { id: 12, name: 'Aldenham - Church Course', address: 'Church Ln, Aldenham, Radlett WD25 8NN', timing: 'Weekends from 11am', phone: '01923 853929', website: '#', imageUrl: 'assets/images/gettyimages-171362434-612x612.jpg' },
      { id: 13, name: 'Another Course', address: 'Example Address', timing: 'Daily from 9am', phone: '020 8876 3205', website: '#', imageUrl: 'assets/3859.jpg' },
      { id: 12, name: 'Aldenham - Church Course', address: 'Church Ln, Aldenham, Radlett WD25 8NN', timing: 'Weekends from 11am', phone: '01923 853929', website: '#', imageUrl: 'assets/images/gettyimages-171362434-612x612.jpg' },
    ];

    // Load the initial set of courses
    this.loadMoreCourses();
  }

  loadMoreCourses() {
    const nextBatch = this.golfCourses.slice(this.loadedItemsCount, this.loadedItemsCount + this.courseBatchSize);
    this.displayedCourses.push(...nextBatch);
    this.loadedItemsCount += nextBatch.length;
  }

  showBookingCard(courseId: number) {
    console.log('Opening booking modal for course:', courseId);
  }
}
