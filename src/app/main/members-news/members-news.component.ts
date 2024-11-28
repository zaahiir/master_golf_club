import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { RouterModule } from '@angular/router';

interface NewsItem {
  id: number;
  title: string;
  date: string;
  description: string;
  imageUrl: string;
}

@Component({
  selector: 'app-members-news',
  standalone: true,
  imports: [CommonModule, InfiniteScrollModule, RouterModule],
  templateUrl: './members-news.component.html',
  styleUrl: './members-news.component.css'
})
export class MembersNewsComponent implements OnInit {
  newsItems: NewsItem[] = [];
  displayedNews: NewsItem[] = [];
  batchSize: number = 6;
  loadedItemsCount: number = 0;

  constructor() {}

  ngOnInit() {
    // Sample news data
    this.newsItems = [
      {
        id: 1,
        title: 'Annual Golf Tournament Announcement',
        date: 'March 15, 2024',
        description: 'Join us for our prestigious annual golf tournament featuring top players from across the region. Early bird registration now open.',
        imageUrl: 'assets/images/3872.jpg'
      },
      {
        id: 2,
        title: 'New Golf Course Facilities Opening',
        date: 'March 12, 2024',
        description: 'We are excited to announce the opening of our new state-of-the-art practice facilities, including a driving range and putting green.',
        imageUrl: 'assets/images/3859.jpg'
      },
      {
        id: 3,
        title: 'Spring Golf Clinic Series',
        date: 'March 10, 2024',
        description: 'Improve your game with our professional instructors in our upcoming spring clinic series. Perfect for all skill levels.',
        imageUrl: 'assets/images/man-golfer-taking-out-golf-club-from-bag.jpg'
      },
    ];

    this.loadMoreNews();
  }

  loadMoreNews() {
    const nextBatch = this.newsItems.slice(
      this.loadedItemsCount,
      this.loadedItemsCount + this.batchSize
    );
    this.displayedNews.push(...nextBatch);
    this.loadedItemsCount += nextBatch.length;
  }
}