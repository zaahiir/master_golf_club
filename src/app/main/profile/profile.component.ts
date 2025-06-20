import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faUser,
  faEdit,
  faCalendarAlt,
  faPhone,
  faEnvelope,
  faMapMarkerAlt,
  faIdCard,
  faCrown,
  faUserCheck,
  faGlobe,
  faBell,
  faLanguage,
  faNewspaper,
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';

interface MemberProfile {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  alternatePhoneNumber?: string;
  dateOfBirth?: string;
  gender?: string;
  nationality?: string;
  address?: string;
  plan?: string;
  membershipStartDate?: string;
  membershipEndDate?: string;
  paymentStatus?: string;
  profilePhoto?: string;
  golfClubId?: string;
  handicap: boolean;
  lastVisit?: string;
  totalVisits?: number;
  membershipLevel?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  emergencyContactRelation?: string;
  paymentMethod?: string;
  preferences?: {
    newsletter: boolean;
    language: string;
    notifications: boolean;
  };
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  // Font Awesome icons
  faUser = faUser;
  faEdit = faEdit;
  faCalendarAlt = faCalendarAlt;
  faPhone = faPhone;
  faEnvelope = faEnvelope;
  faMapMarkerAlt = faMapMarkerAlt;
  faIdCard = faIdCard;
  faCrown = faCrown;
  faUserCheck = faUserCheck;
  faGlobe = faGlobe;
  faBell = faBell;
  faLanguage = faLanguage;
  faNewspaper = faNewspaper;
  faSignOutAlt = faSignOutAlt;

  memberProfile: MemberProfile | null = null;
  isEditing = false;
  loadingError = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadStaticMemberProfile();
  }

  loadStaticMemberProfile() {
    try {
      // Static member data - replace with your desired data
      this.memberProfile = {
        id: 12345,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@email.com',
        phoneNumber: '+1-555-123-4567',
        alternatePhoneNumber: '+1-555-987-6543',
        dateOfBirth: '1985-06-15',
        gender: 'Male',
        nationality: 'United States',
        address: '123 Golf Course Lane, Fairway City, GC 12345',
        plan: 'Premium',
        membershipStartDate: '2020-01-15',
        membershipEndDate: '2025-01-15',
        paymentStatus: 'Active',
        profilePhoto: 'assets/images/default-avatar.png',
        golfClubId: 'GC2020001',
        handicap: true,
        lastVisit: '2024-06-18',
        totalVisits: 156,
        membershipLevel: 'Gold',
        emergencyContactName: 'Jane Doe',
        emergencyContactPhone: '+1-555-111-2222',
        emergencyContactRelation: 'Spouse',
        paymentMethod: 'Credit Card',
        preferences: {
          newsletter: true,
          language: 'English',
          notifications: true
        }
      };

      this.loadingError = false;
      console.log('Static member profile loaded successfully');
    } catch (error) {
      console.error('Error loading static member profile:', error);
      this.loadingError = true;
    }
  }

  getFullName(): string {
    if (!this.memberProfile) return '';
    return `${this.memberProfile.firstName} ${this.memberProfile.lastName}`;
  }

  getMembershipStatus(): string {
    if (!this.memberProfile?.membershipEndDate) return 'Active';
    const endDate = new Date(this.memberProfile.membershipEndDate);
    const now = new Date();
    return endDate > now ? 'Active' : 'Expired';
  }

  getMembershipStatusClass(): string {
    return this.getMembershipStatus() === 'Active' ? 'status-active' : 'status-expired';
  }

  getDaysUntilExpiry(): number {
    if (!this.memberProfile?.membershipEndDate) return 0;
    const endDate = new Date(this.memberProfile.membershipEndDate);
    const now = new Date();
    const diffTime = endDate.getTime() - now.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  formatDate(dateString?: string): string {
    if (!dateString) return 'Not specified';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  calculateAge(): number {
    if (!this.memberProfile?.dateOfBirth) return 0;
    const today = new Date();
    const birthDate = new Date(this.memberProfile.dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  onImageError(event: any) {
    event.target.src = 'assets/images/default-avatar.png';
  }

  redirectToAccount() {
    this.router.navigate(['/account']);
  }

  retryLoading() {
    this.loadingError = false;
    this.loadStaticMemberProfile();
  }

  // Additional methods for demonstration
  updateProfile() {
    console.log('Update profile clicked - implement update logic here');
    // You can implement profile update logic here if needed
  }

  viewBookings() {
    console.log('View bookings clicked');
    this.router.navigate(['/bookings']);
  }

  contactSupport() {
    console.log('Contact support clicked');
    // Implement contact support logic
  }

getProfileImage(): string {
  // Return the profile photo if available, otherwise return default avatar
  return this.memberProfile?.profilePhoto || 'assets/images/default-avatar.png';
}
}
