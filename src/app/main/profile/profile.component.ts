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
import { MemberService } from '../common-service/member/member.service';

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

  constructor(
    private router: Router,
    private memberService: MemberService
  ) {}

  ngOnInit() {
    this.loadMemberProfile();
  }

  async loadMemberProfile() {
    try {
      // Get the current logged-in member ID from token or localStorage
      const memberId = this.getCurrentMemberId();

      if (!memberId) {
        console.error('No member ID found');
        this.router.navigate(['/login']);
        return;
      }

      const response = await this.memberService.listMember(memberId.toString());

      if (response.data && response.data.code === 1) {
        this.memberProfile = this.mapBackendDataToProfile(response.data.data);
        this.loadingError = false;
      } else {
        console.error('Failed to load member profile:', response.data?.message);
        this.loadingError = true;
      }
    } catch (error) {
      console.error('Error loading member profile:', error);
      this.loadingError = true;
    }
  }

  private getCurrentMemberId(): number | null {
    try {
      // Try to get member ID from JWT token
      const token = localStorage.getItem('access_token');
      if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.member_id || null;
      }

      // Fallback: try to get from localStorage if stored separately
      const memberId = localStorage.getItem('member_id');
      return memberId ? parseInt(memberId, 10) : null;
    } catch (error) {
      console.error('Error getting member ID from token:', error);
      return null;
    }
  }

  private mapBackendDataToProfile(data: any): MemberProfile {
    return {
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phoneNumber: data.phoneNumber,
      alternatePhoneNumber: data.alternatePhoneNumber,
      dateOfBirth: data.dateOfBirth,
      gender: data.gender,
      nationality: data.nationality,
      address: data.address,
      plan: data.plan,
      membershipStartDate: data.membershipStartDate,
      membershipEndDate: data.membershipEndDate,
      paymentStatus: data.paymentStatus,
      profilePhoto: data.profilePhoto,
      golfClubId: data.golfClubId,
      handicap: data.handicap || false,
      emergencyContactName: data.emergencyContactName,
      emergencyContactPhone: data.emergencyContactPhone,
      emergencyContactRelation: data.emergencyContactRelation,
      paymentMethod: data.paymentMethod,
      // These might need to be calculated or fetched separately
      lastVisit: data.lastVisit,
      totalVisits: data.totalVisits,
      membershipLevel: this.getMembershipLevel(data.plan),
      // Default preferences if not provided
      preferences: data.preferences || {
        newsletter: true,
        language: 'English',
        notifications: true
      }
    };
  }

  private getMembershipLevel(plan: string): string {
    // Map plan to membership level or return plan itself
    const levelMap: { [key: string]: string } = {
      'Basic': 'Bronze',
      'Standard': 'Silver',
      'Premium': 'Gold',
      'Platinum': 'Platinum'
    };
    return levelMap[plan] || plan || 'Standard';
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
    this.loadMemberProfile();
  }
}
