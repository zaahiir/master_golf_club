import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faClock, faUsers, faChartBar, faBox } from '@fortawesome/free-solid-svg-icons';

interface GolfAmenity {
  id: number;
  title: string;
  tooltip: string;
  icon: any; // Font Awesome icon type
}

interface Course {
  id: number;
  description: string;
}

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
})
export class TestComponent {
  // Define icons
  clockIcon = faClock;
  usersIcon = faUsers;
  chartIcon = faChartBar;
  boxIcon = faBox;

  // Amenities data
  amenities: GolfAmenity[] = Array.from({ length: 18 }, (_, i) => ({
    id: i + 1,
    title: `Amenity ${i + 1}`,
    tooltip: `Tooltip for Amenity ${i + 1}`,
    icon: this.getRandomIcon(),
  }));

  // Courses data
  courses: Course[] = Array.from({ length: 15 }, (_, i) => ({
    id: i + 1,
    description: `This is the description for Course ${i + 1}.`,
  }));

  // Return a random icon
  private getRandomIcon() {
    const icons = [this.clockIcon, this.usersIcon, this.chartIcon, this.boxIcon];
    return icons[Math.floor(Math.random() * icons.length)];
  }
}
