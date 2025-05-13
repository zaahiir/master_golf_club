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
  // Icons
  faPhone = faPhone;
  faGlobe = faGlobe;
  faMapMarkerAlt = faMapMarkerAlt;
  faCalendarWeek = faCalendarWeek;
  
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
      icon: faGolfBallTee
    },
    { 
      id: 2, 
      title: 'Guest Restrictions', 
      tooltip: 'Guests Allowed', 
      icon: faUserFriends
    },
    { 
      id: 3, 
      title: 'Minimum Handicap', 
      tooltip: 'HDP 24 and Under Only', 
      icon: faChartSimple
    },
    { 
      id: 4, 
      title: 'Time Restrictions', 
      tooltip: 'Time Restrictions Apply', 
      icon: faStopwatch
    },
    { 
      id: 5, 
      title: 'Gap Between Booking', 
      tooltip: 'Min 2 Weeks Between Play', 
      icon: faCalendarWeek
    },
    { 
      id: 6, 
      title: 'Advance Booking (up to)', 
      tooltip: 'Book up to 7 days in advance', 
      icon: faBookOpen
    },
    { 
      id: 7, 
      title: 'Call MCG to Book', 
      tooltip: 'DO NOT CALL COURSE - CALL MGC', 
      icon: faPhone
    },
    { 
      id: 8, 
      title: '9 Hole Course', 
      tooltip: '9 Hole Course', 
      icon: faFlag
    },
    { 
      id: 9, 
      title: 'Two Courses Available', 
      tooltip: 'Two Courses', 
      icon: faMapMarkerAlt
    },
    { 
      id: 10, 
      title: 'Virtual Golf Simulator', 
      tooltip: 'Virtual Golf Simulator', 
      icon: faGamepad
    },
    { 
      id: 11, 
      title: 'Marriott Group', 
      tooltip: 'Marriott Hotel Group', 
      icon: faBuildingColumns
    },
    { 
      id: 12, 
      title: 'Discounted Overnight Stays', 
      tooltip: 'Discounted Overnight Stays', 
      icon: faBed
    },
    { 
      id: 13, 
      title: 'Food & Drink Discounts', 
      tooltip: 'Food & Drink Discount', 
      icon: faMugHot
    },
    { 
      id: 14, 
      title: 'Buggy Discounts', 
      tooltip: 'Discounted Buggies', 
      icon: faTruckPickup
    },
    { 
      id: 15, 
      title: 'Putting Lesson Included', 
      tooltip: 'Inc. 20min Putting Lesson', 
      icon: faChalkboardTeacher
    },
    { 
      id: 16, 
      title: 'Additional Restrictions', 
      tooltip: 'Additional Restrictions See Course Details', 
      icon: faExclamationTriangle
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
        imageUrl: 'assets/images/news/news-12.jpg',
        amenities: [1, 2, 4]
      },
      { 
        id: 2, 
        name: 'Berkshire Golf Club', 
        lane: 'Swinley Road', 
        address: 'Ascot, Berkshire',
        code: 'SL5 8AY', 
        timing: 'All week from 8am', 
        phone: '01344 623795', 
        website: 'https://www.theberkshire.co.uk',
        imageUrl: 'assets/images/news/news-11.jpg',
        amenities: [1, 3, 5, 6]
      },
      { 
        id: 3, 
        name: 'Sunningdale Golf Club', 
        lane: 'Ridgemount Road', 
        address: 'Sunningdale, Ascot',
        code: 'SL5 9RR', 
        timing: 'Weekdays only', 
        phone: '01344 621681', 
        website: 'https://www.sunningdalegolfclub.co.uk',
        imageUrl: 'assets/images/news/news-10.jpg',
        amenities: [2, 3, 4, 13]
      },
      { 
        id: 4, 
        name: 'Wentworth Club', 
        lane: 'Wentworth Drive', 
        address: 'Virginia Water, Surrey',
        code: 'GU25 4LS', 
        timing: 'Members only weekends', 
        phone: '01344 842201', 
        website: 'https://www.wentworthclub.com',
        imageUrl: 'assets/images/news/news-9.jpg',
        amenities: [1, 2, 5, 11, 12]
      },
      { 
        id: 5, 
        name: 'Royal St George\'s', 
        lane: 'Sandwich Bay', 
        address: 'Sandwich, Kent',
        code: 'CT13 9PB', 
        timing: 'Tues & Thurs only', 
        phone: '01304 613090', 
        website: 'https://www.royalstgeorges.com',
        imageUrl: 'assets/images/news/news-8.jpg',
        amenities: [3, 4, 6, 16]
      },
      { 
        id: 6, 
        name: 'St Andrews Links', 
        lane: 'Golf Place', 
        address: 'St Andrews, Fife',
        code: 'KY16 9JG', 
        timing: 'All week bookings', 
        phone: '01334 466666', 
        website: 'https://www.standrews.com',
        imageUrl: 'assets/images/news/news-7.jpg',
        amenities: [1, 2, 4, 7, 13]
      },
      { 
        id: 7, 
        name: 'Royal Birkdale', 
        lane: 'Waterloo Road', 
        address: 'Southport, Merseyside',
        code: 'PR8 2LX', 
        timing: 'Weekend afternoons', 
        phone: '01704 552020', 
        website: 'https://www.royalbirkdale.com',
        imageUrl: 'assets/images/news/news-6.jpg',
        amenities: [2, 5, 6, 15]
      },
      { 
        id: 8, 
        name: 'Carnoustie Golf Links', 
        lane: 'Links Parade', 
        address: 'Carnoustie, Angus',
        code: 'DD7 7JE', 
        timing: 'Weekdays from 10am', 
        phone: '01241 802270', 
        website: 'https://www.carnoustiegolflinks.com',
        imageUrl: 'assets/images/news/news-5.jpg',
        amenities: [1, 3, 8, 14]
      },
      { 
        id: 9, 
        name: 'Royal Portrush', 
        lane: 'Dunluce Road', 
        address: 'Portrush, County Antrim',
        code: 'BT56 8JQ', 
        timing: 'All week except holidays', 
        phone: '028 7082 2311', 
        website: 'https://www.royalportrushgolfclub.com',
        imageUrl: 'assets/images/news/news-4.jpg',
        amenities: [2, 4, 9, 13]
      },
      { 
        id: 10, 
        name: 'Muirfield', 
        lane: 'Duncur Road', 
        address: 'Gullane, East Lothian',
        code: 'EH31 2EG', 
        timing: 'Tuesday & Thursday only', 
        phone: '01620 842123', 
        website: 'https://www.muirfield.org.uk',
        imageUrl: 'assets/images/news/news-3.jpg',
        amenities: [3, 6, 16]
      },
      { 
        id: 11, 
        name: 'Royal Lytham & St Annes', 
        lane: 'Links Gate', 
        address: 'Lytham St Annes, Lancashire',
        code: 'FY8 3LQ', 
        timing: 'Weekends by arrangement', 
        phone: '01253 724206', 
        website: 'https://www.royallytham.org',
        imageUrl: 'assets/images/news/news-2.jpg',
        amenities: [1, 5, 10, 12]
      },
      { 
        id: 12, 
        name: 'Royal Troon', 
        lane: 'Craigend Road', 
        address: 'Troon, Ayrshire',
        code: 'KA10 6EP', 
        timing: 'Monday & Wednesday only', 
        phone: '01292 311555', 
        website: 'https://www.royaltroon.co.uk',
        imageUrl: 'assets/images/news/news-1.jpg',
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