import { Injectable } from '@angular/core';
import { BaseAPIUrl, baseURLType } from '../commom-api-url';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  private apiUrl: string;
  private lists: string;
  private processing: string;
  private deletion: string;
  private profileUrl: string;
  private updateProfileUrl: string;
  private gender: string;
  private nationality: string;
  private plan: string;
  private paymentStatus: string;
  private paymentMethod: string;

  constructor() {
    this.apiUrl = new BaseAPIUrl().getUrl(baseURLType);
    this.lists = this.apiUrl + "member/0/listing/";
    this.processing = this.apiUrl + "member/0/processing/";
    this.deletion = this.apiUrl + "member/0/deletion/";

    // New profile endpoints
    this.profileUrl = this.apiUrl + "member/profile/";
    this.updateProfileUrl = this.apiUrl + "member/update_profile/";

    this.gender = this.apiUrl + "gender/";
    this.nationality = this.apiUrl + "country/";
    this.plan = this.apiUrl + "plan/";
    this.paymentStatus = this.apiUrl + "paymentStatus/";
    this.paymentMethod = this.apiUrl + "paymentMethod/";
  }

  // Existing methods
  listMember(id: string = '0') {
    return axios.get(this.lists.replace('0', id));
  }

  processMember(data: any, id: string = '0') {
    return axios.post(this.processing.replace('0', id), data);
  }

  deleteMember(id: string) {
    return axios.get(this.deletion.replace('0', id));
  }

  // New profile methods
  getCurrentMemberProfile(userId?: string) {
    const config: any = {};

    // Add authorization headers if you have tokens
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers = {
        'Authorization': `Bearer ${token}`
      };
    }

    // Add user ID if provided
    if (userId) {
      config.params = { user_id: userId };
    }

    return axios.get(this.profileUrl, config);
  }

  updateCurrentMemberProfile(data: any, userId?: string) {
    const config: any = {};

    // Add authorization headers if you have tokens
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };
    }

    // Add user ID to data if provided
    if (userId) {
      data.user_id = userId;
    }

    return axios.put(this.updateProfileUrl, data, config);
  }

  // Helper method to get current user's profile with error handling
  async getCurrentProfile(): Promise<any> {
    try {
      const userId = localStorage.getItem('user_id');
      const response = await this.getCurrentMemberProfile(userId || undefined);

      if (response.data && response.data.code === 1) {
        return response.data.data;
      } else {
        throw new Error(response.data?.message || 'Failed to fetch profile');
      }
    } catch (error) {
      console.error('Error fetching current profile:', error);
      throw error;
    }
  }

  // Helper method to update current user's profile with error handling
  async updateProfile(profileData: any): Promise<any> {
    try {
      const userId = localStorage.getItem('user_id');
      const response = await this.updateCurrentMemberProfile(profileData, userId || undefined);

      if (response.data && response.data.code === 1) {
        return response.data.data;
      } else {
        throw new Error(response.data?.message || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  }

  // Existing methods
  getGender() {
    return axios.get(this.gender);
  }

  getNationality() {
    return axios.get(this.nationality);
  }

  getPlan() {
    return axios.get(this.plan);
  }

  getPaymentStatus() {
    return axios.get(this.paymentStatus);
  }

  getPaymentMethod() {
    return axios.get(this.paymentMethod);
  }

  async getLastMemberId(year: string, month: string): Promise<string | null> {
    try {
      const response = await axios.get(`${this.apiUrl}member/last-member-id/${year}/${month}/`);
      return response.data?.data?.memberId || null;
    } catch (error) {
      console.error('Error fetching last member ID:', error);
      return null;
    }
  }
}
