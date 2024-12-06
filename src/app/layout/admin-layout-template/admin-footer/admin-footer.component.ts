import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faHeart,
  faShieldAlt,
  faFileContract
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-admin-footer',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './admin-footer.component.html',
  styleUrl: './admin-footer.component.css'
})
export class AdminFooterComponent {
  currentYear = new Date().getFullYear();
  faHeart = faHeart;
  faShieldAlt = faShieldAlt;
  faFileContract = faFileContract;
}