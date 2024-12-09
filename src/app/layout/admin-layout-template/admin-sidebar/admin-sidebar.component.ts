// admin-sidebar.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faDashboard,
  faUsers,
  faGolfBall,
  faCalendar,
  faCog,
  faChartBar,
  faBook
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  templateUrl: './admin-sidebar.component.html',
  styleUrl: './admin-sidebar.component.css'
})
export class AdminSidebarComponent {
  @Input() isToggled = true;
  @Input() isMobileView = false;

  menuItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: faDashboard },
    { path: '/users', label: 'Users', icon: faUsers },
    { path: '/golf-courses', label: 'Golf Courses', icon: faGolfBall },
    { path: '/bookings', label: 'Bookings', icon: faCalendar },
    { path: '/reports', label: 'Reports', icon: faChartBar },
    { path: '/courses', label: 'Courses', icon: faBook },
    { path: '/settings', label: 'Settings', icon: faCog }
  ];

  // Optional: Method to handle menu item click in mobile view
  onMenuItemClick() {
    // If you want to automatically close sidebar when a menu item is clicked in mobile view
    if (this.isMobileView) {
      this.isToggled = false;
    }
  }
}