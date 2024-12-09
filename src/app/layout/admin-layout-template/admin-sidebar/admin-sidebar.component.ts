// admin-sidebar.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {  
  faTachometerAlt,     // Dashboard
  faUsers,             // Members
  faGolfBall,          // Plan (keep the existing icon)
  faCalendarAlt,       // Courses
  faChartLine,         // Tee (changed from faChartBar)
  faCalendarWeek ,    // Events
  faTrophy,            // Tournament (changed from faCog)
  faBlog,              
  faTicketAlt,         
  faChartPie  
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
    { path: '/admin/dashboard', label: 'Dashboard', icon: faTachometerAlt },
    { path: '/admin/members', label: 'Members', icon: faUsers },
    { path: '/admin/plan', label: 'Plan', icon: faGolfBall },
    { path: '/admin/courses', label: 'Courses', icon: faCalendarAlt },
    { path: '/admin/tee', label: 'Tee', icon: faChartLine },
    { path: '/admin/events', label: 'Events', icon: faCalendarWeek  },
    { path: '/admin/scoreBoard', label: 'Tournament', icon: faTrophy },
    { path: '/admin/blog', label: 'Blog', icon: faBlog },
    { path: '/admin/coupon', label: 'Coupon', icon: faTicketAlt },
    { path: '/admin/reports', label: 'Report', icon: faChartPie },
  ];

  // Optional: Method to handle menu item click in mobile view
  onMenuItemClick() {
    // If you want to automatically close sidebar when a menu item is clicked in mobile view
    if (this.isMobileView) {
      this.isToggled = false;
    }
  }
}