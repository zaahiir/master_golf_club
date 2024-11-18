import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { 
  faClock, 
  faUsers, 
  faLocationDot, 
  faGlobe, 
  faPhone, 
  faDirections, 
  faShareAlt,
  faParking,
  faWifi,
  faUtensils,
  faShoppingBag
} from '@fortawesome/free-solid-svg-icons';

interface Course {
  id: number;
  name: string;
  lane: string;
  address: string;
  code: string;
  timing: string;
  phone: string;
  website: string;
  imageUrl: string;
  location: {
    lat: number;
    lng: number;
  };
  amenities: string[];
}

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
  // Icons
  locationIcon = faLocationDot;
  clockIcon = faClock;
  usersIcon = faUsers;
  globeIcon = faGlobe;
  phoneIcon = faPhone;
  directionsIcon = faDirections;
  shareIcon = faShareAlt;
  parkingIcon = faParking;
  wifiIcon = faWifi;
  restaurantIcon = faUtensils;
  shopIcon = faShoppingBag;

  // Map URL
  mapUrl: SafeResourceUrl;
  
  // Course Details
  course: Course = {
    id: 1,
    name: 'Aldenham - Church Course',
    lane: 'Church Ln',
    address: 'Aldenham, Radlett',
    code: 'WD25 8NN',
    timing: 'Weekends from 11am',
    phone: '01923 853929',
    website: '#',
    imageUrl: 'assets/images/course-hero.jpg',
    location: {
      lat: 51.6754,
      lng: -0.3169
    },
    amenities: ['WiFi', 'Parking', 'Restaurant', 'Pro Shop']
  };

  // Booking State
  guestCount: number = 1;
  maxGuests: number = 4;
  selectedDate: Date | null = null;
  selectedTime: string | null = null;
  availableDates: Date[] = [];
  timeSlots: TimeSlot[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {
    // Initialize mapUrl in constructor
    const baseMapUrl = 'https://www.google.com/maps/embed/v1/place';
    const apiKey = 'YOUR_API_KEY'; // Replace with your actual API key
    const query = encodeURIComponent(`${this.course.name} ${this.course.address}`);
    
    this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      `${baseMapUrl}?key=${apiKey}&q=${query}`
    );
  }

  ngOnInit(): void {
    this.generateAvailableDates();
    this.generateTimeSlots();
  }

  private generateAvailableDates(): void {
    const today = new Date();
    this.availableDates = Array.from({ length: 8 }, (_, i) => {
      const date = new Date();
      date.setDate(today.getDate() + i);
      return date;
    });
  }

  private generateTimeSlots(): void {
    this.timeSlots = [];
    // Generate slots from 7 AM to 7 PM
    for (let hour = 7; hour < 19; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        this.timeSlots.push({
          time: timeString,
          available: Math.random() > 0.3 // Simulate availability
        });
      }
    }
  }

  incrementGuests(): void {
    if (this.guestCount < this.maxGuests) {
      this.guestCount++;
    }
  }

  decrementGuests(): void {
    if (this.guestCount > 0) {
      this.guestCount--;
    }
  }

  selectDate(date: Date): void {
    this.selectedDate = date;
    this.selectedTime = null; // Reset time when date changes
    this.generateTimeSlots(); // Regenerate time slots for the new date
  }

  selectTime(time: string): void {
    this.selectedTime = time;
  }

  canBook(): boolean {
    return !!this.selectedDate && 
           !!this.selectedTime && 
           this.guestCount > 0 && 
           this.guestCount <= this.maxGuests;
  }

  async bookTeeTime(): Promise<void> {
    if (!this.canBook()) return;

    this.isLoading = true;
    this.errorMessage = '';

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const booking = {
        date: this.selectedDate,
        time: this.selectedTime,
        guests: this.guestCount,
        course: this.course.name,
        totalPrice: this.calculatePrice()
      };

      console.log('Booking details:', booking);
      // Here you would typically make an API call to save the booking
      
      // Show success message or redirect
      alert('Booking successful!');
      this.resetForm();
    } catch (error) {
      console.error('Booking failed:', error);
      this.errorMessage = 'Failed to book tee time. Please try again.';
    } finally {
      this.isLoading = false;
    }
  }

  private calculatePrice(): number {
    // Simple price calculation - can be made more complex
    const basePrice = 50; // Base price per person
    return this.guestCount * basePrice;
  }

  private resetForm(): void {
    this.selectedDate = null;
    this.selectedTime = null;
    this.guestCount = 1;
  }

  getDirections(): void {
    const query = encodeURIComponent(`${this.course.name} ${this.course.address}`);
    const url = `https://www.google.com/maps/dir/?api=1&destination=${query}`;
    window.open(url, '_blank');
  }

  async shareLocation(): Promise<void> {
    const shareData = {
      title: this.course.name,
      text: `Check out ${this.course.name} at ${this.course.address}`,
      url: window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback for browsers that don't support sharing
        this.copyToClipboard(`${shareData.title}\n${shareData.text}\n${shareData.url}`);
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  }

  private copyToClipboard(text: string): void {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      alert('Location details copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy:', err);
    }
    document.body.removeChild(textarea);
  }

  // Date formatting helpers
  formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  }

  // Time formatting helpers
  formatTime(time: string): string {
    const [hour, minute] = time.split(':');
    const hourNum = parseInt(hour);
    const ampm = hourNum >= 12 ? 'PM' : 'AM';
    const hour12 = hourNum % 12 || 12;
    return `${hour12}:${minute} ${ampm}`;
  }

  // Error handling
  handleMapError(event: ErrorEvent): void {
    console.error('Map loading error:', event);
    this.errorMessage = 'Failed to load map. Please try again later.';
  }
}