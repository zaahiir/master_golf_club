// sidebar.component.ts
import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  @Input() isToggled = false;
  @Input() isMobileView = false;

  menuItems = [
    {
      label: 'Dashboard',
      icon: 'fa-solid fa-chart-line',
      route: '/admin/dashboard'
    },
    {
      label: 'Users',
      icon: 'fa-solid fa-users',
      route: '/admin/users'
    },
    {
      label: 'Settings',
      icon: 'fa-solid fa-gear',
      route: '/admin/settings'
    }
  ];
}