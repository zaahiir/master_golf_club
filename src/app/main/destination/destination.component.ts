import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-destination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './destination.component.html',
  styleUrl: './destination.component.css'
})

export class DestinationComponent {
  isModalOpen = false;

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  goToWebsite() {
    window.open('https://example.com', '_blank'); // Replace with the actual website URL
  }
}
