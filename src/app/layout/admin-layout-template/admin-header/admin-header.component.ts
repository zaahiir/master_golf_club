import { Component, Output, EventEmitter, Input, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  faBars,
  faBell,
  faUser
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-admin-header',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, RouterModule],
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.css'
})
export class AdminHeaderComponent {
  @Output() toggleSidebar = new EventEmitter<void>();
  @Input() isSidebarToggled = false;

  // Explicitly type the icons
  faBars: IconDefinition = faBars;
  faBell: IconDefinition = faBell;
  faUser: IconDefinition = faUser;

  isUserDropdownOpen = false;

  onToggleSidebar() {
    this.toggleSidebar.emit();
  }

  toggleUserDropdown() {
    this.isUserDropdownOpen = !this.isUserDropdownOpen;
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: MouseEvent) {
    const profileSection = document.querySelector('.profile-section');
    if (profileSection && !profileSection.contains(event.target as Node)) {
      this.isUserDropdownOpen = false;
    }
  }
}