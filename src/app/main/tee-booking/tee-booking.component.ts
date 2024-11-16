import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms'; 

interface GolfCourse {
  id: number;
  name: string;
  lane: string;
  address: string;
  code: string;
  timing: string;
  imageUrl: string;
}

@Component({
  selector: 'app-tee-booking',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tee-booking.component.html',
  styleUrls: ['./tee-booking.component.css'],
})
export class TeeBookingComponent implements OnInit {
  golfCourse: GolfCourse | undefined;
  guestCount: number = 1;
  minDate: string = '';
  maxDate: string = '';
  selectedDate: string = '';
  timeSlots: string[] = [];
  selectedTime: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Fetch golf course data from route parameters or service
    this.route.queryParams.subscribe((params) => {
      this.golfCourse = JSON.parse(params['courseDetails'] || '{}');
    });

    // Set date range for one week from today
    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);
    this.minDate = this.formatDate(today);
    this.maxDate = this.formatDate(nextWeek);
  }

  private formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  generateTimeSlots(): void {
    this.timeSlots = [];
    const start = 7 * 60; // 7:00 AM in minutes
    const end = 19 * 60; // 7:00 PM in minutes
    for (let mins = start; mins < end; mins += 15) {
      const hours = Math.floor(mins / 60);
      const minutes = mins % 60;
      const time = `${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
      this.timeSlots.push(time);
    }
  }

  selectTime(slot: string): void {
    this.selectedTime = slot;
  }

  bookTeeTime(): void {
    if (this.selectedDate && this.selectedTime && this.guestCount > 0) {
      console.log('Booking confirmed for:', {
        course: this.golfCourse,
        guests: this.guestCount,
        date: this.selectedDate,
        time: this.selectedTime,
      });
      alert('Booking successful!');
    } else {
      alert('Please select all booking details.');
    }
  }
}
