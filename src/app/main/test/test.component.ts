import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faClock, faUsers, faChartBar, faBox } from '@fortawesome/free-solid-svg-icons';

interface GolfAmenity {
  id: number;
  title: string;
  tooltip: string;
  icon: any; 
}

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent {
  // Define icons 
  clockIcon = faClock;
  usersIcon = faUsers;
  chartIcon = faChartBar;
  boxIcon = faBox;

  amenities: GolfAmenity[] = [
    {
      id: 1,
      title: 'No. of Tees per Day',
      tooltip: 'Number of tee times available per day',
      icon: this.clockIcon
    },
    {
      id: 2,
      title: 'Guest Restrictions',
      tooltip: 'Guest policy information',
      icon: this.usersIcon
    },
    {
      id: 3,
      title: 'Minimum Handicap',
      tooltip: 'Required minimum handicap',
      icon: this.chartIcon
    },
    {
      id: 18,
      title: 'Club Storage',
      tooltip: 'Equipment storage service',
      icon: this.boxIcon
    },
    {
      id: 3,
      title: 'Minimum Handicap',
      tooltip: 'Required minimum handicap',
      icon: this.chartIcon
    },
    {
      id: 18,
      title: 'Club Storage',
      tooltip: 'Equipment storage service',
      icon: this.boxIcon
    }
  ];
}