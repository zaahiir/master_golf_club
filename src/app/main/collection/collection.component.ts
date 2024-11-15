import { Component, OnInit, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faClock, faUsers, faChartBar, faBox } from '@fortawesome/free-solid-svg-icons';
import { isPlatformBrowser } from '@angular/common'; // Import this
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
declare var bootstrap: any;

interface GolfAmenity {
  id: number;
  title: string;
  tooltip: string;
  icon: any;
}

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
  imports: [CommonModule, InfiniteScrollModule, FontAwesomeModule],
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit, AfterViewInit {
  clockIcon = faClock;
  usersIcon = faUsers;
  chartIcon = faChartBar;
  boxIcon = faBox;

  golfCourses: GolfCourse[] = [];
  displayedCourses: GolfCourse[] = [];
  courseBatchSize: number = 6; // Number of items to load per batch
  loadedItemsCount: number = 0;

  amenities: GolfAmenity[] = Array.from({ length: 18 }, (_, i) => ({
    id: i + 1,
    title: `Amenity ${i + 1}`,
    tooltip: `Tooltip for Amenity ${i + 1}`,
    icon: this.getRandomIcon(),
  }));

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
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

  ngAfterViewInit(): void {
    // Check if we are in the browser before trying to access the document
    if (isPlatformBrowser(this.platformId)) {
      const tooltipElements = document.querySelectorAll('[data-bs-toggle="tooltip"]');
      tooltipElements.forEach((element) => {
        new bootstrap.Tooltip(element);  // Initialize tooltips
      });
    }
  }

  private getRandomIcon() {
    const icons = [this.clockIcon, this.usersIcon, this.chartIcon, this.boxIcon];
    return icons[Math.floor(Math.random() * icons.length)];
  }
}
