import { Component, OnInit, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { 
  faPhone,
  faGlobe,
  faChartSimple,
  faMapMarkerAlt,
  faGamepad,
  faChalkboardTeacher,
  faExclamationTriangle,
  faUserFriends,
  faGolfBallTee,
  faStopwatch,
  faCalendarWeek,
  faBookOpen,
  faBuildingColumns,
  faBed,
  faMugHot,
  faFlag,
  faTruckPickup
} from '@fortawesome/free-solid-svg-icons';
import { isPlatformBrowser } from '@angular/common';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
declare var bootstrap: any;

interface GolfAmenity {
  id: number;
  title: string;
  tooltip: string;
  icon: any;
  isActive?: boolean;
}

interface GolfCourse {
  id: number;
  name: string;
  lane: string;
  address: string;
  code: string;
  timing: string;
  phone: string;
  website: string;
  imageUrl: string;
  amenities: number[];
}

@Component({
  selector: 'app-collection',
  standalone: true,
  imports: [CommonModule, InfiniteScrollModule, FontAwesomeModule, RouterModule],
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit, AfterViewInit {
  faPhone = faPhone;
  faGlobe = faGlobe;

  currentDate: Date = new Date();
  selectedDate: Date | null = null;

  isModalOpen = false;
  selectedCourse: GolfCourse | null = null;

  golfCourses: GolfCourse[] = [];
  displayedCourses: GolfCourse[] = [];
  courseBatchSize: number = 6;
  loadedItemsCount: number = 0;

  // Priority order for displaying amenities
  priorityAmenities: number[] = [1, 2, 3, 4, 5, 6];

  amenities: GolfAmenity[] = [
    { 
      id: 1, 
      title: 'No. of Tees per Day', 
      tooltip: '2 Tees Per Day', 
      icon: faGolfBallTee  // Golf tee specific icon
    },
    { 
      id: 2, 
      title: 'Guest Restrictions', 
      tooltip: 'Guests Allowed', 
      icon: faUserFriends  // Multiple users icon
    },
    { 
      id: 3, 
      title: 'Minimum Handicap', 
      tooltip: 'HDP 24 and Under Only', 
      icon: faChartSimple      // Golf ball for handicap 
    },
    { 
      id: 4, 
      title: 'Time Restrictions', 
      tooltip: 'Time Restrictions Apply', 
      icon: faStopwatch  // Stopwatch for time restrictions
    },
    { 
      id: 5, 
      title: 'Gap Between Booking', 
      tooltip: 'Min 2 Weeks Between Play', 
      icon: faCalendarWeek  // Calendar week for booking gaps
    },
    { 
      id: 6, 
      title: 'Advance Booking (up to)', 
      tooltip: 'Book up to 7 days in advance', 
      icon: faBookOpen  // Book for advance booking
    },
    { 
      id: 7, 
      title: 'Call MCG to Book', 
      tooltip: 'DO NOT CALL COURSE - CALL MGC', 
      icon: faPhone  // Phone for booking calls
    },
    { 
      id: 8, 
      title: '9 Hole Course', 
      tooltip: '9 Hole Course', 
      icon: faFlag  // Flag for course holes
    },
    { 
      id: 9, 
      title: 'Two Courses Available', 
      tooltip: 'Two Courses', 
      icon: faMapMarkerAlt  // Map marker for multiple courses
    },
    { 
      id: 10, 
      title: 'Virtual Golf Simulator', 
      tooltip: 'Virtual Golf Simulator', 
      icon: faGamepad  // Gamepad for simulator
    },
    { 
      id: 11, 
      title: 'Marriott Group', 
      tooltip: 'Marriott Hotel Group', 
      icon: faBuildingColumns  // Building for hotel group
    },
    { 
      id: 12, 
      title: 'Discounted Overnight Stays', 
      tooltip: 'Discounted Overnight Stays', 
      icon: faBed  // Bed for overnight stays
    },
    { 
      id: 13, 
      title: 'Food & Drink Discounts', 
      tooltip: 'Food & Drink Discount', 
      icon: faMugHot  // Mug for food & drink
    },
    { 
      id: 14, 
      title: 'Buggy Discounts', 
      tooltip: 'Discounted Buggies', 
      icon: faTruckPickup    // Cart for buggy
    },
    { 
      id: 15, 
      title: 'Putting Lesson Included', 
      tooltip: 'Inc. 20min Putting Lesson', 
      icon: faChalkboardTeacher  // Teacher for lessons
    },
    { 
      id: 16, 
      title: 'Additional Restrictions', 
      tooltip: 'Additional Restrictions See Course Details', 
      icon: faExclamationTriangle  // Triangle for restrictions
    },
  ];

  

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    this.golfCourses = [
      { 
        id: 1, 
        name: 'Aldenham - Church Course', 
        lane: 'Church Ln', 
        address: 'Aldenham, Radlett',
        code: 'WD25 8NN', 
        timing: 'Weekends from 11am', 
        phone: '01923 853929', 
        website: 'https://www.aldenhamgolfclub.co.uk',
        imageUrl: 'assets/images/gettyimages-171362434-612x612.webp',
        amenities: [1, 2, 4]
      },
      { 
        id: 1, 
        name: 'Aldenham - Church Course', 
        lane: 'Church Ln', 
        address: 'Aldenham, Radlett',
        code: 'WD25 8NN', 
        timing: 'Weekends from 11am', 
        phone: '01923 853929', 
        website: 'https://www.aldenhamgolfclub.co.uk',
        imageUrl: 'assets/images/gettyimages-171362434-612x612.webp',
        amenities: [1, 2, 4]
      },
      { 
        id: 1, 
        name: 'Aldenham - Church Course', 
        lane: 'Church Ln', 
        address: 'Aldenham, Radlett',
        code: 'WD25 8NN', 
        timing: 'Weekends from 11am', 
        phone: '01923 853929', 
        website: 'https://www.aldenhamgolfclub.co.uk',
        imageUrl: 'assets/images/gettyimages-171362434-612x612.webp',
        amenities: [1, 2, 4]
      },
      { 
        id: 1, 
        name: 'Aldenham - Church Course', 
        lane: 'Church Ln', 
        address: 'Aldenham, Radlett',
        code: 'WD25 8NN', 
        timing: 'Weekends from 11am', 
        phone: '01923 853929', 
        website: 'https://www.aldenhamgolfclub.co.uk',
        imageUrl: 'assets/images/gettyimages-171362434-612x612.webp',
        amenities: [1, 2, 4]
      },
      { 
        id: 1, 
        name: 'Aldenham - Church Course', 
        lane: 'Church Ln', 
        address: 'Aldenham, Radlett',
        code: 'WD25 8NN', 
        timing: 'Weekends from 11am', 
        phone: '01923 853929', 
        website: 'https://www.aldenhamgolfclub.co.uk',
        imageUrl: 'assets/images/gettyimages-171362434-612x612.webp',
        amenities: [1, 2, 4]
      },
      { 
        id: 1, 
        name: 'Aldenham - Church Course', 
        lane: 'Church Ln', 
        address: 'Aldenham, Radlett',
        code: 'WD25 8NN', 
        timing: 'Weekends from 11am', 
        phone: '01923 853929', 
        website: 'https://www.aldenhamgolfclub.co.uk',
        imageUrl: 'assets/images/gettyimages-171362434-612x612.webp',
        amenities: [1, 2, 4]
      },
      { 
        id: 1, 
        name: 'Aldenham - Church Course', 
        lane: 'Church Ln', 
        address: 'Aldenham, Radlett',
        code: 'WD25 8NN', 
        timing: 'Weekends from 11am', 
        phone: '01923 853929', 
        website: 'https://www.aldenhamgolfclub.co.uk',
        imageUrl: 'assets/images/gettyimages-171362434-612x612.webp',
        amenities: [1, 2, 4]
      },
      { 
        id: 1, 
        name: 'Aldenham - Church Course', 
        lane: 'Church Ln', 
        address: 'Aldenham, Radlett',
        code: 'WD25 8NN', 
        timing: 'Weekends from 11am', 
        phone: '01923 853929', 
        website: 'https://www.aldenhamgolfclub.co.uk',
        imageUrl: 'assets/images/gettyimages-171362434-612x612.webp',
        amenities: [1, 2, 4]
      },
      { 
        id: 1, 
        name: 'Aldenham - Church Course', 
        lane: 'Church Ln', 
        address: 'Aldenham, Radlett',
        code: 'WD25 8NN', 
        timing: 'Weekends from 11am', 
        phone: '01923 853929', 
        website: 'https://www.aldenhamgolfclub.co.uk',
        imageUrl: 'assets/images/gettyimages-171362434-612x612.webp',
        amenities: [1, 2, 4]
      },
      { 
        id: 1, 
        name: 'Aldenham - Church Course', 
        lane: 'Church Ln', 
        address: 'Aldenham, Radlett',
        code: 'WD25 8NN', 
        timing: 'Weekends from 11am', 
        phone: '01923 853929', 
        website: 'https://www.aldenhamgolfclub.co.uk',
        imageUrl: 'assets/images/gettyimages-171362434-612x612.webp',
        amenities: [1, 2, 4]
      },
      { 
        id: 1, 
        name: 'Aldenham - Church Course', 
        lane: 'Church Ln', 
        address: 'Aldenham, Radlett',
        code: 'WD25 8NN', 
        timing: 'Weekends from 11am', 
        phone: '01923 853929', 
        website: 'https://www.aldenhamgolfclub.co.uk',
        imageUrl: 'assets/images/gettyimages-171362434-612x612.webp',
        amenities: [1, 2, 4]
      },
      { 
        id: 1, 
        name: 'Aldenham - Church Course', 
        lane: 'Church Ln', 
        address: 'Aldenham, Radlett',
        code: 'WD25 8NN', 
        timing: 'Weekends from 11am', 
        phone: '01923 853929', 
        website: 'https://www.aldenhamgolfclub.co.uk',
        imageUrl: 'assets/images/gettyimages-171362434-612x612.webp',
        amenities: [1, 2, 4]
      },
      { 
        id: 1, 
        name: 'Aldenham - Church Course', 
        lane: 'Church Ln', 
        address: 'Aldenham, Radlett',
        code: 'WD25 8NN', 
        timing: 'Weekends from 11am', 
        phone: '01923 853929', 
        website: 'https://www.aldenhamgolfclub.co.uk',
        imageUrl: 'assets/images/gettyimages-171362434-612x612.webp',
        amenities: [1, 2, 4]
      },
    ];
    this.loadMoreCourses();
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeTooltips();
    }
  }

  private initializeTooltips(): void {
    const tooltipElements = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltipElements.forEach((element) => {
      new bootstrap.Tooltip(element);
    });
  }

  // New method to get only 6 amenities for display
  getDisplayedAmenities(course: GolfCourse): GolfAmenity[] {
    // First, get amenities that the course has (matched with priority)
    const matchedAmenities = this.priorityAmenities
      .filter(id => course.amenities.includes(id))
      .map(id => this.amenities.find(a => a.id === id))
      .filter((amenity): amenity is GolfAmenity => amenity !== undefined);

    // Then, get remaining priority amenities not in the course
    const remainingAmenities = this.priorityAmenities
      .filter(id => !course.amenities.includes(id))
      .map(id => this.amenities.find(a => a.id === id))
      .filter((amenity): amenity is GolfAmenity => amenity !== undefined);

    // Combine and limit to 6 items
    return [...matchedAmenities, ...remainingAmenities].slice(0, 6);
  }

  loadMoreCourses(): void {
    const startIndex = this.loadedItemsCount;
    const endIndex = startIndex + this.courseBatchSize;
    const nextBatch = this.golfCourses.slice(startIndex, endIndex);
    
    if (nextBatch.length > 0) {
      this.displayedCourses.push(...nextBatch);
      this.loadedItemsCount += nextBatch.length;
    }
  }

  hasAmenity(course: GolfCourse, amenityId: number): boolean {
    return course.amenities.includes(amenityId);
  }

  openGuestModal(event: Event, course: GolfCourse): void {
    event.preventDefault();
    event.stopPropagation();
    this.selectedCourse = course;
    this.isModalOpen = true;
    
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = 'hidden';
    }
  }

  getNextSevenDates(): Date[] {
    const dates: Date[] = [];
    for (let i = 0; i < 8; i++) {
      const nextDate = new Date();
      nextDate.setDate(this.currentDate.getDate() + i);
      dates.push(nextDate);
    }
    return dates;
  }

  openDateModal(selectedDate: Date, course: GolfCourse): void {
    this.selectedDate = selectedDate;
    this.selectedCourse = course;
    this.isModalOpen = true;

    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = 'hidden';
    }
  }

  // Close modal
  closeModal(): void {
    this.isModalOpen = false;
    this.selectedDate = null;
    this.selectedCourse = null;

    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = 'auto';
    }
  }

  goToWebsite(): void {
    if (this.selectedCourse?.website && isPlatformBrowser(this.platformId)) {
      window.open(this.selectedCourse.website, '_blank', 'noopener noreferrer');
    }
  }

  getAmenityTooltip(amenityId: number): string {
    const amenity = this.amenities.find(a => a.id === amenityId);
    return amenity ? amenity.tooltip : '';
  }

  showBookingCard(courseId: number): void {
    console.log('Opening booking modal for course:', courseId);
  }
}