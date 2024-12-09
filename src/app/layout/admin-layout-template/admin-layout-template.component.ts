// admin-layout-template.component.ts
import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID, HostListener } from '@angular/core';
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

  // Host listener to handle clicks outside the sidebar
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (this.isMobileView && this.isSidebarToggled) {
      const sidebarElement = document.querySelector('app-admin-sidebar');
      const headerElement = document.querySelector('app-admin-header');
      
      // Check if the click is outside sidebar and header
      if (sidebarElement && headerElement &&
          !sidebarElement.contains(event.target as Node) &&
          !headerElement.contains(event.target as Node)) {
        this.isSidebarToggled = false;
      }
    }
  }
}