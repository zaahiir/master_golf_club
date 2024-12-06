import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { AdminFooterComponent } from './admin-footer/admin-footer.component';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';

@Component({
  selector: 'app-admin-layout-template',
  standalone: true,
  imports: [RouterOutlet, AdminHeaderComponent, AdminFooterComponent, AdminSidebarComponent],
  templateUrl: './admin-layout-template.component.html',
  styleUrl: './admin-layout-template.component.css'
})
export class AdminLayoutTemplateComponent implements OnInit, OnDestroy {
  isSidebarToggled = true;
  isMobileView = false;
  private resizeListener: (() => void) | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.checkMobileView();
      this.resizeListener = this.checkMobileView.bind(this);
      window.addEventListener('resize', this.resizeListener);
    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId) && this.resizeListener) {
      window.removeEventListener('resize', this.resizeListener);
    }
  }

  checkMobileView = () => {
    if (isPlatformBrowser(this.platformId)) {
      this.isMobileView = window.innerWidth <= 768;
      if (this.isMobileView) {
        this.isSidebarToggled = false;
      }
    }
  }

  toggleSidebar() {
    this.isSidebarToggled = !this.isSidebarToggled;
  }
}