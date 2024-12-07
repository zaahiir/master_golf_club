import { Component, Input, ElementRef, OnInit, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core'; 
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

declare var bootstrap: any;  
 
@Component({ 
  selector: 'app-admin-sidebar', 
  standalone: true, 
  imports: [CommonModule, RouterModule, FontAwesomeModule], 
  templateUrl: './admin-sidebar.component.html', 
  styleUrl: './admin-sidebar.component.css' 
}) 
export class AdminSidebarComponent implements OnInit, AfterViewInit, OnChanges { 
  @Input() isToggled = true; 
  @Input() isMobileView = false; 
 
  menuItems = [ 
    { path: '/dashboard', label: 'Dashboard', icon: faDashboard, tooltip: 'Dashboard Overview' }, 
    { path: '/users', label: 'Users', icon: faUsers, tooltip: 'Manage Users' }, 
    { path: '/golf-courses', label: 'Golf Courses', icon: faGolfBall, tooltip: 'Manage Golf Courses' }, 
    { path: '/bookings', label: 'Bookings', icon: faCalendar, tooltip: 'View Bookings' }, 
    { path: '/reports', label: 'Reports', icon: faChartBar, tooltip: 'View Reports' }, 
    { path: '/courses', label: 'Courses', icon: faBook, tooltip: 'Course Management' }, 
    { path: '/settings', label: 'Settings', icon: faCog, tooltip: 'Application Settings' } 
  ]; 

  private tooltips: any[] = [];

  constructor(private el: ElementRef) {}  

  ngOnInit() {}  

  ngAfterViewInit() {  
    this.initializeTooltips();
  }

  ngOnChanges(changes: SimpleChanges) {
    // Reinitialize tooltips when sidebar toggle changes
    if (changes['isToggled']) {
      this.destroyTooltips();
      this.initializeTooltips();
    }
  }

  private destroyTooltips() {
    this.tooltips.forEach(tooltip => tooltip.dispose());
    this.tooltips = [];
  }

  private initializeTooltips() {
    // Only create tooltips when sidebar is collapsed
    if (!this.isToggled) {
      const tooltipTriggerList = this.el.nativeElement.querySelectorAll('[data-bs-toggle="tooltip"]');
      this.tooltips = [...tooltipTriggerList].map(tooltipTriggerEl => 
        new bootstrap.Tooltip(tooltipTriggerEl, {
          trigger: 'hover',
          placement: 'right'
        })
      );
    }
  }
}