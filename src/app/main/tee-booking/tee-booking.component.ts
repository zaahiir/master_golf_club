import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faClock, faUsers, faLocationDot, faGlobe } from '@fortawesome/free-solid-svg-icons';

interface TimeSlot {
  time: string;
  available: boolean;
}

@Component({
  selector: 'app-tee-booking',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  templateUrl: './tee-booking.component.html',
  styleUrls: ['./tee-booking.component.css'],
})
export class TeeBookingComponent implements OnInit {
  locationIcon = faLocationDot;
  clockIcon = faClock;
  usersIcon = faUsers;
  globeIcon = faGlobe;

  course = {
    id: 1,
    name: 'Aldenham - Church Course',
    lane: 'Church Ln',
    address: 'Aldenham, Radlett',
    code: 'WD25 8NN',
    timing: 'Weekends from 11am',
    phone: '01923 853929',
    website: '#',
    imageUrl: 'assets/images/gettyimages-171362434-612x612.jpg'
  };

  guestCount = 1;
  selectedDate: Date | null = null;
  selectedTime: string | null = null;
  availableDates: Date[] = [];
  timeSlots: TimeSlot[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // Generate available dates (next 7 days)
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(today.getDate() + i);
      this.availableDates.push(date);
    }

    // Generate time slots (7 AM to 7 PM, 15-minute intervals)
    for (let hour = 7; hour < 19; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        this.timeSlots.push({
          time: timeString,
          available: Math.random() > 0.3 // Randomly set availability (70% available)
        });
      }
    }
  }

  incrementGuests() {
    if (this.guestCount < 4) {
      this.guestCount++;
    }
  }

  decrementGuests() {
    if (this.guestCount > 1) {
      this.guestCount--;
    }
  }

  selectDate(date: Date) {
    this.selectedDate = date;
    this.selectedTime = null; // Reset time selection when date changes
  }

  selectTime(time: string) {
    this.selectedTime = time;
  }

  canBook(): boolean {
    return !!this.selectedDate && !!this.selectedTime;
  }

  bookTeeTime() {
    if (this.canBook()) {
      const booking = {
        date: this.selectedDate,
        time: this.selectedTime,
        guests: this.guestCount,
        course: this.course.name
      };
      console.log('Booking details:', booking);
      // Here you would typically make an API call to save the booking
      alert('Booking successful!');
    }
  }
}