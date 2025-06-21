import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Subscription } from 'rxjs';
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
  faSignOutAlt,
  faSpinner,
  faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons';

import { MemberService } from '../common-service/member/member.service';
import { AuthService } from '../../auth/auth.service';

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
  age?: number;
  daysUntilExpiry?: number;
  membershipStatus?: string;
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
export class ProfileComponent implements OnInit, OnDestroy {
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
  faSpinner = faSpinner;
  faExclamationTriangle = faExclamationTriangle;

  memberProfile: MemberProfile | null = null;
  isEditing = false;
  loadingError = false;
  isLoading = true;
  errorMessage = '';

  private subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private memberService: MemberService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadMemberProfile();
  }

  ngOnDestroy() {
    // Clean up subscriptions
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  async loadMemberProfile() {
    this.isLoading = true;
    this.loadingError = false;
    this.errorMessage = '';

    try {
      // Check if user is authenticated
      if (!this.authService.isAuthenticated()) {
        this.router.navigate(['/login']);
        return;
      }

      // Fetch current user's profile
      const profileData = await this.memberService.getCurrentProfile();
      this.memberProfile = profileData;

      console.log('Profile loaded successfully:', this.memberProfile);

    } catch (error: any) {
      console.error('Error loading profile:', error);
      this.loadingError = true;

      // Handle different types of errors
      if (error.response) {
        // Server responded with error status
        const status = error.response.status;
        const message = error.response.data?.message || 'Unknown server error';

        if (status === 401) {
          this.errorMessage = 'Session expired. Please log in again.';
          // Redirect to login after a short delay
          setTimeout(() => {
            this.authService.logout().subscribe();
          }, 2000);
        } else if (status === 404) {
          this.errorMessage = 'Profile not found. Please contact support.';
        } else {
          this.errorMessage = `Server error: ${message}`;
        }
      } else if (error.request) {
        // Network error
        this.errorMessage = 'Network error. Please check your internet connection.';
      } else {
        // Other error
        this.errorMessage = error.message || 'An unexpected error occurred.';
      }
    } finally {
      this.isLoading = false;
    }
  }

  getFullName(): string {
    if (!this.memberProfile) return '';
    return `${this.memberProfile.firstName} ${this.memberProfile.lastName}`;
  }

  getMembershipStatus(): string {
    return this.memberProfile?.membershipStatus || 'Active';
  }

  getMembershipStatusClass(): string {
    const status = this.getMembershipStatus();
    return status === 'Active' ? 'status-active' : 'status-expired';
  }

  getDaysUntilExpiry(): number {
    return this.memberProfile?.daysUntilExpiry || 0;
  }

  formatDate(dateString?: string): string {
    if (!dateString) return 'Not specified';

    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      return 'Invalid date';
    }
  }

  calculateAge(): number {
    return this.memberProfile?.age || 0;
  }

  onImageError(event: any) {
    event.target.src = 'assets/images/default-avatar.png';
  }

  getProfileImage(): string {
    // Return the profile photo if available, otherwise return default avatar
    return this.memberProfile?.profilePhoto || '../../../assets/images/team/team-1.jpg';
  }

  async retryLoading() {
    await this.loadMemberProfile();
  }

  redirectToAccount() {
    this.router.navigate(['/account']);
  }

  // Profile update methods
  async updateProfile() {
    if (!this.memberProfile) return;

    console.log('Update profile clicked - implement update logic here');
    // You can implement profile update logic here
    // For example, navigate to edit form or open modal
    this.isEditing = true;
  }

  async saveProfile(updatedData: Partial<MemberProfile>) {
    if (!this.memberProfile) return;

    try {
      this.isLoading = true;
      const updatedProfile = await this.memberService.updateProfile(updatedData);
      this.memberProfile = { ...this.memberProfile, ...updatedProfile };
      this.isEditing = false;
      console.log('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      // Handle update error - show toast or error message
    } finally {
      this.isLoading = false;
    }
  }

  cancelEdit() {
    this.isEditing = false;
  }

  viewBookings() {
    console.log('View bookings clicked');
    this.router.navigate(['/bookings']);
  }

  contactSupport() {
    console.log('Contact support clicked');
    // Implement contact support logic
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        console.log('Logged out successfully');
      },
      error: (error) => {
        console.error('Logout error:', error);
        // Even if logout request fails, user is still logged out locally
      }
    });
  }

  // Utility method to refresh profile data
  async refreshProfile() {
    await this.loadMemberProfile();
  }

  // Method to handle session extension on user activity
  onUserActivity() {
    if (this.authService.isAuthenticated()) {
      this.authService.extendSession();
    }
  }
}
