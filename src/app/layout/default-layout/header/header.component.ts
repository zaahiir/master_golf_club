import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    // Bootstrap dropdowns and toggler
    document.addEventListener('DOMContentLoaded', () => {
      const mobileToggler = document.querySelector('.mobile-nav-toggler');
      const navbarCollapse = document.querySelector('.navbar-collapse');
  
      if (mobileToggler && navbarCollapse) {
        mobileToggler.addEventListener('click', () => {
          navbarCollapse.classList.toggle('show');
        });
      }
    });
  
    // Sticky effect on scroll
    window.addEventListener('scroll', () => {
      const header = document.querySelector('.main-header');
      if (window.scrollY > 50) {
        header?.classList.add('scrolled');
      } else {
        header?.classList.remove('scrolled');
      }
    });
  }
  
}