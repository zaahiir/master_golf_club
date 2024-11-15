import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faClock, faUsers, faChartBar, faBox } from '@fortawesome/free-solid-svg-icons';

interface GolfAmenity {
  id: number;
  title: string;
  value: string;
  tooltip: string;
  icon: any;  // Changed to accept FA icon
}

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent {
  description: string = 'Your One Golf Club membership entitles you to free access to the OGC Collection of golf courses listed below (subject to tee time availability, handicap restrictions, time restrictions and our fair use policy on premium courses).';

  // Define icons
  clockIcon = faClock;
  usersIcon = faUsers;
  chartIcon = faChartBar;
  boxIcon = faBox;

  amenities: GolfAmenity[] = [
    {
      id: 1,
      title: 'No. of Tees per Day',
      value: 'Unlimited access',
      tooltip: 'Number of tee times available per day',
      icon: this.clockIcon
    },
    {
      id: 2,
      title: 'Guest Restrictions',
      value: 'Check policy details',
      tooltip: 'Guest policy information',
      icon: this.usersIcon
    },
    {
      id: 3,
      title: 'Minimum Handicap',
      value: '24',
      tooltip: 'Required minimum handicap',
      icon: this.chartIcon
    },
    {
      id: 18,
      title: 'Club Storage',
      value: 'Available',
      tooltip: 'Equipment storage service',
      icon: this.boxIcon
    }
  ];
}