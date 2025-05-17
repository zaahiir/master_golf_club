import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { RouterModule } from '@angular/router';
import { NewsService, BlogPost } from '../common-service/news/news.service';

interface NewsItem {
  id: number;
  title: string;
  date: string;
  description: string;
  imageUrl: string;
  category?: string;
  highlight?: string;
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
  allItemsLoaded: boolean = false;

  constructor(private newsService: NewsService) {}

  ngOnInit() {
    this.loadInitialNews();
  }

  loadInitialNews() {
    this.newsService.listBlog().subscribe({
      next: (response) => {
        if (response.code === 1 && response.data) {
          this.newsItems = this.transformBlogPosts(response.data);
          this.loadMoreNews();
        }
      },
      error: (error) => {
        console.error('Error fetching news:', error);
      }
    });
  }

  transformBlogPosts(posts: BlogPost[]): NewsItem[] {
    return posts.map(post => {
      // Sort posts by date descending (newest first)
      return {
        id: post.id,
        title: post.blogHighlight || post.blogTitle, // For the news title
        date: post.blogDate,
        description: this.truncateDescription(post.blogDescription),
        imageUrl: this.formatImageUrl(post.blogImage), // Format image URL from backend
        category: post.blogTitle, // For the category
        highlight: post.blogHighlight
      };
    }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }
  
  formatImageUrl(imageUrl: string | null): string {
    if (!imageUrl) {
      return 'assets/images/3872.jpg'; // Default image if none provided
    }
    
    // Check if the URL already includes the domain
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
      return imageUrl;
    }
    
    // Check if the URL starts with a slash
    if (!imageUrl.startsWith('/')) {
      imageUrl = '/' + imageUrl;
    }
    
    // Get the base API URL without the trailing API endpoint part
    const apiBase = this.getBaseUrl();
    return `${apiBase}/media${imageUrl}`;
  }
  
  getBaseUrl(): string {
    // Extract base URL from the API URL in the NewsService
    // This assumes the API URL is something like http://example.com/api/
    const apiUrl = this.newsService['apiUrl'] as string;
    const baseUrlMatch = apiUrl.match(/(https?:\/\/[^\/]+)/);
    return baseUrlMatch ? baseUrlMatch[1] : '';
  }

  truncateDescription(description: string): string {
    // First strip HTML tags
    const plainText = description.replace(/<[^>]*>/g, '');
    
    // Count words and truncate if needed
    const words = plainText.split(/\s+/);
    if (words.length > 100) {
      return words.slice(0, 100).join(' ') + '...';
    }
    return plainText;
  }

  loadMoreNews() {
    if (this.allItemsLoaded) {
      return;
    }

    const nextBatch = this.newsItems.slice(
      this.loadedItemsCount,
      this.loadedItemsCount + this.batchSize
    );
    
    this.displayedNews.push(...nextBatch);
    this.loadedItemsCount += nextBatch.length;
    
    if (this.loadedItemsCount >= this.newsItems.length) {
      this.allItemsLoaded = true;
    }
  }
  
  handleImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    if (imgElement) {
      imgElement.src = 'assets/images/3872.jpg';
    }
  }
}