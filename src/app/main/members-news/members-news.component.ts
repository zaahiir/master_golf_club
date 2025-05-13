import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { RouterModule } from '@angular/router';

interface NewsItem {
  id: number;
  title: string;
  date: string;
  description: string;
  imageUrl: string;
  category?: string;
}

@Component({
  selector: 'app-members-news',
  standalone: true,
  imports: [CommonModule, InfiniteScrollModule, RouterModule, DatePipe],
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
    // Sample news data with categories
    this.newsItems = [
      {
        id: 1,
        title: 'Annual Golf Tournament Announcement',
        date: '2024-03-15', // ISO format for proper date pipe formatting
        description: 'Join us for our prestigious annual golf tournament featuring top players from across the region. Early bird registration now open.',
        imageUrl: 'assets/images/3872.jpg',
        category: 'Tournament'
      },
      {
        id: 2,
        title: 'New Golf Course Facilities Opening',
        date: '2024-03-12',
        description: 'We are excited to announce the opening of our new state-of-the-art practice facilities, including a driving range and putting green.',
        imageUrl: 'assets/images/3859.jpg',
        category: 'Facilities'
      },
      {
        id: 3,
        title: 'Spring Golf Clinic Series',
        date: '2024-03-10',
        description: 'Improve your game with our professional instructors in our upcoming spring clinic series. Perfect for all skill levels.',
        imageUrl: 'assets/images/man-golfer-taking-out-golf-club-from-bag.jpg',
        category: 'Coaching'
      },
      {
        id: 4,
        title: 'Key Golf Gadgets for the Determined Golfer',
        date: '2024-04-08',
        description: 'Discover the latest golf gadgets that can help improve your game and make your time on the course more enjoyable.',
        imageUrl: 'assets/images/man-golfer-taking-out-golf-club-from-bag.jpg',
        category: 'Equipment'
      },
      {
        id: 5,
        title: 'Spring Championship Highlights and Winners',
        date: '2024-04-15',
        description: 'Catch up on all the action from our recent Spring Championship tournament and congratulate the winners.',
        imageUrl: 'assets/images/man-golfer-taking-out-golf-club-from-bag.jpg',
        category: 'Tournament'
      },
      {
        id: 6,
        title: 'How to Perfect Your Swing Technique',
        date: '2024-04-22',
        description: 'Professional tips and tricks to help you perfect your swing and take your golf game to the next level.',
        imageUrl: 'assets/images/man-golfer-taking-out-golf-club-from-bag.jpg',
        category: 'Coaching'
      }
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