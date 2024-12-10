// admin-sidebar.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {  
  faTachometerAlt,     
  faUsers,            
  faGolfBall,          
  faCalendarAlt,       
  faChartLine,        
  faCalendarWeek ,    
  faTrophy,           
  faBlog,
  faFlag,           
  faTicketAlt,         
  faChartPie, faAward, faMedal, faRibbon
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
    { path: '/admin/plan', label: 'Plan', icon: faGolfBall },
    { path: '/admin/members', label: 'Members', icon: faUsers },
    { path: '/admin/courses', label: 'Courses', icon: faCalendarAlt },
    { path: '/admin/tee', label: 'Tee', icon: faChartLine },
    { path: '/admin/events', label: 'Events', icon: faCalendarWeek  },
    { path: '/admin/tournament', label: 'Tournament', icon: faFlag  },
    { path: '/admin/scoreBoard', label: 'ScoreBoard', icon: faTrophy },
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