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
  currentPage: number = 1;
  itemsPerPage: number = 5;

  get totalPages(): number {
    return Math.ceil(this.golfCourses.length / this.itemsPerPage);
  }  

  get visiblePages(): number[] {
    const pages: number[] = [];
    let beforePage = this.currentPage - 1;
    let afterPage = this.currentPage + 1;

    // Adjust visible pages for edge cases
    if (this.currentPage === this.totalPages) {
      beforePage = beforePage - 2;
    } else if (this.currentPage === this.totalPages - 1) {
      beforePage = beforePage - 1;
    }

    if (this.currentPage === 1) {
      afterPage = afterPage + 2;
    } else if (this.currentPage === 2) {
      afterPage = afterPage + 1;
    }

    // Generate visible page numbers
    for (let i = beforePage; i <= afterPage; i++) {
      if (i > 0 && i <= this.totalPages) {
        pages.push(i);
      }
    }

    return pages;
  }

  get paginatedCourses(): GolfCourse[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.golfCourses.slice(startIndex, startIndex + this.itemsPerPage);
  }

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
        imageUrl: 'assets/images/gettyimages-171362434-612x612.jpg'
      },
      {
        id: 2,
        name: 'Richmond Park Golf Course',
        address: 'Roehampton Gate, Richmond TW10 5LD',
        timing: 'Daily from 9am',
        phone: '020 8876 3205',
        website: '#',
        imageUrl: 'assets/3859.jpg'
      },
      {
        id: 3,
        name: 'Richmond Park Golf Course',
        address: 'Roehampton Gate, Richmond TW10 5LD',
        timing: 'Daily from 9am',
        phone: '020 8876 3205',
        website: '#',
        imageUrl: 'assets/3859.jpg'
      },
      {
        id: 4,
        name: 'Aldenham - Park Course',
        address: 'Church Ln, Aldenham, Radlett WD25 8NN',
        timing: 'Weekends from 11am',
        phone: '01923 853929',
        website: '#',
        imageUrl: 'assets/images/gettyimages-171362434-612x612.jpg'
      },
      {
        id: 5,
        name: 'Richmond Park Golf Course',
        address: 'Roehampton Gate, Richmond TW10 5LD',
        timing: 'Daily from 9am',
        phone: '020 8876 3205',
        website: '#',
        imageUrl: 'assets/3859.jpg'
      },
      {
        id: 6,
        name: 'Richmond Park Golf Course',
        address: 'Roehampton Gate, Richmond TW10 5LD',
        timing: 'Daily from 9am',
        phone: '020 8876 3205',
        website: '#',
        imageUrl: 'assets/3859.jpg'
      },
      {
        id: 7,
        name: 'Richmond Park Golf Course',
        address: 'Roehampton Gate, Richmond TW10 5LD',
        timing: 'Daily from 9am',
        phone: '020 8876 3205',
        website: '#',
        imageUrl: 'assets/3859.jpg'
      },
      {
        id: 8,
        name: 'Richmond Park Golf Course',
        address: 'Roehampton Gate, Richmond TW10 5LD',
        timing: 'Daily from 9am',
        phone: '020 8876 3205',
        website: '#',
        imageUrl: 'assets/3859.jpg'
      },
      {
        id: 9,
        name: 'Richmond Park Golf Course',
        address: 'Roehampton Gate, Richmond TW10 5LD',
        timing: 'Daily from 9am',
        phone: '020 8876 3205',
        website: '#',
        imageUrl: 'assets/3859.jpg'
      },
      {
        id: 10,
        name: 'Richmond Park Golf Course',
        address: 'Roehampton Gate, Richmond TW10 5LD',
        timing: 'Daily from 9am',
        phone: '020 8876 3205',
        website: '#',
        imageUrl: 'assets/3859.jpg'
      },
      {
        id: 11,
        name: 'Richmond Park Golf Course',
        address: 'Roehampton Gate, Richmond TW10 5LD',
        timing: 'Daily from 9am',
        phone: '020 8876 3205',
        website: '#',
        imageUrl: 'assets/3859.jpg'
      },
      {
        id: 12,
        name: 'Richmond Park Golf Course',
        address: 'Roehampton Gate, Richmond TW10 5LD',
        timing: 'Daily from 9am',
        phone: '020 8876 3205',
        website: '#',
        imageUrl: 'assets/3859.jpg'
      },
      {
        id: 13,
        name: 'Richmond Park Golf Course',
        address: 'Roehampton Gate, Richmond TW10 5LD',
        timing: 'Daily from 9am',
        phone: '020 8876 3205',
        website: '#',
        imageUrl: 'assets/3859.jpg'
      },
      {
        id: 14,
        name: 'Richmond Park Golf Course',
        address: 'Roehampton Gate, Richmond TW10 5LD',
        timing: 'Daily from 9am',
        phone: '020 8876 3205',
        website: '#',
        imageUrl: 'assets/3859.jpg'
      },
      {
        id: 15,
        name: 'Richmond Park Golf Course',
        address: 'Roehampton Gate, Richmond TW10 5LD',
        timing: 'Daily from 9am',
        phone: '020 8876 3205',
        website: '#',
        imageUrl: 'assets/3859.jpg'
      },
      {
        id: 16,
        name: 'Richmond Park Golf Course',
        address: 'Roehampton Gate, Richmond TW10 5LD',
        timing: 'Daily from 9am',
        phone: '020 8876 3205',
        website: '#',
        imageUrl: 'assets/3859.jpg'
      },
      {
        id: 17,
        name: 'Richmond Park Golf Course',
        address: 'Roehampton Gate, Richmond TW10 5LD',
        timing: 'Daily from 9am',
        phone: '020 8876 3205',
        website: '#',
        imageUrl: 'assets/3859.jpg'
      },
      {
        id: 18,
        name: 'Richmond Park Golf Course',
        address: 'Roehampton Gate, Richmond TW10 5LD',
        timing: 'Daily from 9am',
        phone: '020 8876 3205',
        website: '#',
        imageUrl: 'assets/3859.jpg'
      },
      {
        id: 19,
        name: 'Richmond Park Golf Course',
        address: 'Roehampton Gate, Richmond TW10 5LD',
        timing: 'Daily from 9am',
        phone: '020 8876 3205',
        website: '#',
        imageUrl: 'assets/3859.jpg'
      },
      {
        id: 20,
        name: 'Richmond Park Golf Course',
        address: 'Roehampton Gate, Richmond TW10 5LD',
        timing: 'Daily from 9am',
        phone: '020 8876 3205',
        website: '#',
        imageUrl: 'assets/3859.jpg'
      },
      {
        id: 21,
        name: 'Richmond Park Golf Course',
        address: 'Roehampton Gate, Richmond TW10 5LD',
        timing: 'Daily from 9am',
        phone: '020 8876 3205',
        website: '#',
        imageUrl: 'assets/3859.jpg'
      },
      {
        id: 22,
        name: 'Richmond Park Golf Course',
        address: 'Roehampton Gate, Richmond TW10 5LD',
        timing: 'Daily from 9am',
        phone: '020 8876 3205',
        website: '#',
        imageUrl: 'assets/3859.jpg'
      },
      {
        id: 23,
        name: 'Richmond Park Golf Course',
        address: 'Roehampton Gate, Richmond TW10 5LD',
        timing: 'Daily from 9am',
        phone: '020 8876 3205',
        website: '#',
        imageUrl: 'assets/3859.jpg'
      },
      {
        id: 24,
        name: 'Richmond Park Golf Course',
        address: 'Roehampton Gate, Richmond TW10 5LD',
        timing: 'Daily from 9am',
        phone: '020 8876 3205',
        website: '#',
        imageUrl: 'assets/3859.jpg'
      },
      {
        id: 25,
        name: 'Richmond Park Golf Course',
        address: 'Roehampton Gate, Richmond TW10 5LD',
        timing: 'Daily from 9am',
        phone: '020 8876 3205',
        website: '#',
        imageUrl: 'assets/3859.jpg'
      },
      {
        id: 26,
        name: 'Richmond Park Golf Course',
        address: 'Roehampton Gate, Richmond TW10 5LD',
        timing: 'Daily from 9am',
        phone: '020 8876 3205',
        website: '#',
        imageUrl: 'assets/3859.jpg'
      },
      {
        id: 27,
        name: 'Richmond Park Golf Course',
        address: 'Roehampton Gate, Richmond TW10 5LD',
        timing: 'Daily from 9am',
        phone: '020 8876 3205',
        website: '#',
        imageUrl: 'assets/3859.jpg'
      },
      {
        id: 28,
        name: 'Richmond Park Golf Course',
        address: 'Roehampton Gate, Richmond TW10 5LD',
        timing: 'Daily from 9am',
        phone: '020 8876 3205',
        website: '#',
        imageUrl: 'assets/3859.jpg'
      },
      {
        id: 29,
        name: 'Richmond Park Golf Course',
        address: 'Roehampton Gate, Richmond TW10 5LD',
        timing: 'Daily from 9am',
        phone: '020 8876 3205',
        website: '#',
        imageUrl: 'assets/3859.jpg'
      },
      {
        id: 30,
        name: 'Richmond Park Golf Course',
        address: 'Roehampton Gate, Richmond TW10 5LD',
        timing: 'Daily from 9am',
        phone: '020 8876 3205',
        website: '#',
        imageUrl: 'assets/3859.jpg'
      },
      {
        id: 31,
        name: 'Richmond Park Golf Course',
        address: 'Roehampton Gate, Richmond TW10 5LD',
        timing: 'Daily from 9am',
        phone: '020 8876 3205',
        website: '#',
        imageUrl: 'assets/3859.jpg'
      },
    ];
  }

  changePage(page: number): void {
    if (page !== this.currentPage) {
      this.currentPage = page;
      // Update the content of the existing cards without reloading the page
      this.updateCards();
    }
  }

  private updateCards() {
    const cardElements = document.querySelectorAll('.booking-card');
    const paginatedCourses = this.paginatedCourses;

    cardElements.forEach((card, index) => {
      const courseData = paginatedCourses[index];
      if (courseData) {
        (card.querySelector('.course-name') as HTMLElement).textContent = courseData.name;
        (card.querySelector('.course-address') as HTMLElement).textContent = courseData.address;
        (card.querySelector('.course-timing') as HTMLElement).textContent = courseData.timing;
        (card.querySelector('.course-image') as HTMLElement).style.backgroundImage = `url(${courseData.imageUrl})`;
      }
    });
  }

  onPageChange(page: number): void {
    this.changePage(page);
  }

  showBookingCard(courseId: number) {
    console.log('Opening booking modal for course:', courseId);
  }
}
