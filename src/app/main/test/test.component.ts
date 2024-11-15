import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faClock, faUsers, faChartBar, faBox } from '@fortawesome/free-solid-svg-icons';
import { isPlatformBrowser } from '@angular/common'; // Import this

declare var bootstrap: any;

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
  styleUrls: ['./test.component.css'],
})
export class TestComponent implements AfterViewInit {
  clockIcon = faClock;
  usersIcon = faUsers;
  chartIcon = faChartBar;
  boxIcon = faBox;

  amenities: GolfAmenity[] = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    title: `Amenity ${i + 1}`,
    tooltip: `Tooltip for Amenity ${i + 1}`,
    icon: this.getRandomIcon(),
  }));

  private getRandomIcon() {
    const icons = [this.clockIcon, this.usersIcon, this.chartIcon, this.boxIcon];
    return icons[Math.floor(Math.random() * icons.length)];
  }

  ngAfterViewInit(): void {
    // Check if we are in the browser before trying to access the document
    if (isPlatformBrowser(this.platformId)) {
      const tooltipElements = document.querySelectorAll('[data-bs-toggle="tooltip"]');
      tooltipElements.forEach((element) => {
        new bootstrap.Tooltip(element);  // Initialize tooltips
      });
    }
  }

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}  // Inject PLATFORM_ID to check platform
}
