import { Component, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { 
  faBars, 
  faBell,
  faUser,
  faCaretDown,
  faCaretUp
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-admin-header',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.css'
})
export class AdminHeaderComponent {
  @Output() toggleSidebar = new EventEmitter<void>();
  @Input() isSidebarToggled = false;

  faBars = faBars;
  faBell = faBell;
  faUser = faUser;
  faCaretDown = faCaretDown;
  faCaretUp = faCaretUp;

  isUserDropdownOpen = false;

  onToggleSidebar() {
    this.toggleSidebar.emit();
  }

  toggleUserDropdown() {
    this.isUserDropdownOpen = !this.isUserDropdownOpen;
  }
}