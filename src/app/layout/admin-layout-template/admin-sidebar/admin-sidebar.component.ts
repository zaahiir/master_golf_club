import { Component, Input, ElementRef, OnInit, AfterViewInit, OnChanges, SimpleChanges, NgZone, Inject, PLATFORM_ID } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
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
export class AdminSidebarComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() isToggled = true;
  @Input() isMobileView = false;

  menuItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: faDashboard, tooltip: 'Dashboard Overview' },
    { path: '/users', label: 'Users', icon: faUsers, tooltip: 'Manage Users' },
    { path: '/golf-courses', label: 'Golf Courses', icon: faGolfBall, tooltip: 'Manage Golf Courses' },
    { path: '/bookings', label: 'Bookings', icon: faCalendar, tooltip: 'View Bookings' },
    { path: '/reports', label: 'Reports', icon: faChartBar, tooltip: 'View Reports' },
    { path: '/courses', label: 'Courses', icon: faBook, tooltip: 'Course Management' },
    { path: '/settings', label: 'Settings', icon: faCog, tooltip: 'Application Settings' }
  ];

  private tooltips: any[] = [];
  private isBrowser: boolean;

  constructor(
    private el: ElementRef,
    private ngZone: NgZone,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    if (this.isBrowser) {
      this.loadBootstrapScripts();
    }
  }

  private loadBootstrapScripts(): void {
    // Load Popper.js first
    const popperScript = document.createElement('script');
    popperScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/popper.js/2.11.8/umd/popper.min.js';
    popperScript.async = true;

    // Load Bootstrap after Popper.js
    popperScript.onload = () => {
      const bootstrapScript = document.createElement('script');
      bootstrapScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.3/js/bootstrap.min.js';
      bootstrapScript.async = true;
      bootstrapScript.onload = () => {
        this.initializeTooltips();
      };
      document.body.appendChild(bootstrapScript);
    };

    document.body.appendChild(popperScript);
  }

  ngAfterViewInit() {
    if (this.isBrowser) {
      // Check if Bootstrap is already available
      if ((window as any).bootstrap) {
        this.initializeTooltips();
      }
    }
  }

  private destroyTooltips() {
    if (this.tooltips.length > 0) {
      this.tooltips.forEach(tooltip => {
        if (tooltip && typeof tooltip.dispose === 'function') {
          tooltip.dispose();
        }
      });
      this.tooltips = [];
    }
  }

  getTooltipPlacement(): 'top' | 'right' {
    if (this.isMobileView || !this.isToggled) {
      return 'right';
    }
    return 'top';
  }

  private initializeTooltips() {
    this.ngZone.runOutsideAngular(() => {
      try {
        const bootstrap = (window as any).bootstrap;
        if (!bootstrap) {
          console.warn('Bootstrap not available for tooltips');
          return;
        }

        const tooltipTriggerList = this.el.nativeElement.querySelectorAll('[data-bs-toggle="tooltip"]');
        this.tooltips = Array.from(tooltipTriggerList).map(tooltipTriggerEl => 
          new bootstrap.Tooltip(tooltipTriggerEl, {
            trigger: 'hover',
            placement: this.getTooltipPlacement()
          })
        );
      } catch (error) {
        console.error('Error initializing tooltips:', error);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.isBrowser && (
      (changes['isToggled'] && !changes['isToggled'].firstChange) ||
      (changes['isMobileView'] && !changes['isMobileView'].firstChange)
    )) {
      this.destroyTooltips();
      if ((window as any).bootstrap) {
        this.initializeTooltips();
      }
    }
  }

  ngOnDestroy() {
    this.destroyTooltips();
  }
}