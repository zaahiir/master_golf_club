import { Component, OnInit } from '@angular/core';
import { AdminAuthService } from '../admin-auth.service';

@Component({
  selector: 'app-admin-logout',
  standalone: true,
  imports: [],
templateUrl: './admin-logout.component.html',
  styleUrl: './admin-logout.component.css'
})
export class AdminLogoutComponent implements OnInit {
  constructor(private adminAuthService: AdminAuthService) {}

  ngOnInit(): void {
    // Perform admin logout when component initializes
    this.adminAuthService.logout();
  }
}