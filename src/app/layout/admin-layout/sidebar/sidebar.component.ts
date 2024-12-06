import { Component } from '@angular/core';
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
  menuItems = [
    { 
      label: 'Dashboard', 
      icon: 'fa-home', 
      route: '/admin/dashboard' 
    },
    { 
      label: 'Users', 
      icon: 'fa-users', 
      route: '/admin/users' 
    },
    { 
      label: 'Settings', 
      icon: 'fa-cog', 
      route: '/admin/settings' 
    }
  ];
}
