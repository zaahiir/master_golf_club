import { Component, OnInit, AfterViewInit, Inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import {
  faPhone,
  faGlobe,
  faMapMarkerAlt,
  faCalendarWeek,
  faSearch
} from '@fortawesome/free-solid-svg-icons';
import { isPlatformBrowser } from '@angular/common';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CollectionService } from '../common-service/collection/collection.service';
import { Subject } from 'rxjs';
import { takeUntil, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

declare var bootstrap: any;

interface GolfAmenity {
  id: number;
  title: string;
  tooltip: string;
  icon_svg?: string;
  icon_path?: string;
  viewbox?: string;
}

interface GolfCourse {
  id: number;
  name: string;
  address: string;
  timing: string;
  phone: string;
  website: string;
  imageUrl: string;
  amenities: number[];
  description?: string;
  location?: string;
  alternatePhone?: string;
  allContacts?: string[];
}

interface ApiResponse<T> {
  code: number;
  data: T;
  message: string;
  total?: number;
}

@Component({
  selector: 'app-collection',
  standalone: true,
  imports: [CommonModule, FormsModule, InfiniteScrollModule, FontAwesomeModule, RouterModule],
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit, AfterViewInit, OnDestroy {
  // Icons (only for UI elements, not amenities)
  faPhone = faPhone;
  faGlobe = faGlobe;
  faMapMarkerAlt = faMapMarkerAlt;
  faCalendarWeek = faCalendarWeek;
  faSearch = faSearch;

  currentDate: Date = new Date();
  selectedDate: Date | null = null;

  isModalOpen = false;
  selectedCourse: GolfCourse | null = null;

  // Data properties
  golfCourses: GolfCourse[] = [];
  displayedCourses: GolfCourse[] = [];
  amenities: GolfAmenity[] = [];

  // Loading and pagination
  isLoading = false;
  errorMessage = '';
  hasMoreCourses = true;
  currentPage = 1;
  coursesPerPage = 6;

  // Search functionality
  searchQuery = '';
  locationQuery = '';
  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();

  // Priority order for displaying amenities
  priorityAmenities: number[] = [1, 2, 3, 4, 5, 6];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private collectionService: CollectionService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.initializeSearchDebounce();
    this.loadInitialData();
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => this.initializeTooltips(), 100);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initializeSearchDebounce(): void {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.performSearch();
    });
  }

  private async loadInitialData(): Promise<void> {
    this.isLoading = true;
    this.errorMessage = '';

    try {
      // Load amenities and courses in parallel
      await Promise.all([
        this.loadAmenities(),
        this.loadCourses()
      ]);
    } catch (error) {
      console.error('Error loading initial data:', error);
      this.errorMessage = 'Failed to load data. Please try again later.';
    } finally {
      this.isLoading = false;
    }
  }

  private async loadAmenities(): Promise<void> {
    try {
      const response = await this.collectionService.getAmenities();
      if (response.data.code === 1) {
        this.amenities = response.data.data.map((amenity: any) => ({
          id: amenity.id,
          title: amenity.title || `Amenity ${amenity.id}`,
          tooltip: amenity.tooltip || amenity.title || `Amenity ${amenity.id}`,
          icon_svg: amenity.icon_svg,
          icon_path: amenity.icon_path,
          viewbox: amenity.viewbox || '0 0 448 512'
        }));
      }
    } catch (error) {
      console.error('Error loading amenities:', error);
      this.amenities = [];
    }
  }

  private async loadCourses(reset: boolean = true): Promise<void> {
    if (reset) {
      this.currentPage = 1;
      this.displayedCourses = [];
      this.hasMoreCourses = true;
    }

    if (!this.hasMoreCourses) return;

    this.isLoading = true;

    try {
      let response;

      if (this.searchQuery || this.locationQuery) {
        // Use search endpoint if there are search parameters
        response = await this.collectionService.searchCourses({
          q: this.searchQuery,
          location: this.locationQuery,
          legacy: false
        });
      } else {
        // Use list endpoint for regular listing
        response = await this.collectionService.listCourses({
          legacy: false
        });
      }

      if (response.data.code === 1) {
        const courses: GolfCourse[] = response.data.data.map((course: any) => ({
          id: course.id,
          name: course.name || 'Unnamed Course',
          address: course.address || '',
          timing: course.timing || '',
          phone: course.phone || '',
          website: course.website || '',
          imageUrl: course.imageUrl || 'assets/images/news/default-course.jpg',
          amenities: course.amenities || [],
          description: course.description,
          location: course.location,
          alternatePhone: course.alternatePhone,
          allContacts: course.allContacts
        }));

        if (reset) {
          this.displayedCourses = courses;
        } else {
          this.displayedCourses = [...this.displayedCourses, ...courses];
        }

        // Check if there are more courses to load
        this.hasMoreCourses = courses.length === this.coursesPerPage;
        if (this.hasMoreCourses) {
          this.currentPage++;
        }
      } else {
        this.errorMessage = response.data.message || 'Failed to load courses';
      }
    } catch (error) {
      console.error('Error loading courses:', error);
      this.errorMessage = 'Failed to load courses. Please try again later.';
    } finally {
      this.isLoading = false;
    }
  }

  onSearchInput(): void {
  this.searchSubject.next(this.searchQuery + '|' + this.locationQuery);
  }

  private performSearch(): void {
    this.loadCourses(true);
  }

  loadMoreCourses(): void {
    if (!this.isLoading && this.hasMoreCourses) {
      this.loadCourses(false);
    }
  }

  trackByCourseId(index: number, course: GolfCourse): number {
    return course.id;
  }

  onImageError(event: any): void {
    event.target.src = 'assets/images/news/default-course.jpg';
  }

  private initializeTooltips(): void {
    if (isPlatformBrowser(this.platformId)) {
      const tooltipElements = document.querySelectorAll('[data-bs-toggle="tooltip"]');
      tooltipElements.forEach((element) => {
        new bootstrap.Tooltip(element);
      });
    }
  }

  // Get only 6 amenities for display
  getDisplayedAmenityIds(course: GolfCourse): number[] {
    if (!course.amenities || course.amenities.length === 0) {
      return [];
    }

    // First, get amenities that the course has (matched with priority)
    const matchedAmenities = this.priorityAmenities.filter(id => course.amenities.includes(id));

    // Then, get remaining course amenities not in priority list
    const otherAmenities = course.amenities.filter(id => !this.priorityAmenities.includes(id));

    // Combine and limit to 6 items
    return [...matchedAmenities, ...otherAmenities].slice(0, 6);
  }

  getAmenityIcon(amenityId: number): SafeHtml {
  const amenity = this.amenities.find(a => a.id === amenityId);
  const svgContent = amenity?.icon_svg || '';
  return this.sanitizer.bypassSecurityTrustHtml(svgContent);
  }

  getAmenityIconPath(amenityId: number): string {
    const amenity = this.amenities.find(a => a.id === amenityId);
    return amenity?.icon_path || '';
  }

  getAmenityViewBox(amenityId: number): string {
    const amenity = this.amenities.find(a => a.id === amenityId);
    return amenity?.viewbox || '0 0 448 512';
  }

  getAmenityTitle(amenityId: number): string {
    const amenity = this.amenities.find(a => a.id === amenityId);
    return amenity ? amenity.title : `Amenity ${amenityId}`;
  }

  getAmenityTooltip(amenityId: number): string {
    const amenity = this.amenities.find(a => a.id === amenityId);
    return amenity ? amenity.tooltip : `Amenity ${amenityId}`;
  }

  getNextSevenDates(): Date[] {
    const dates: Date[] = [];
    for (let i = 0; i < 8; i++) {
      const nextDate = new Date();
      nextDate.setDate(this.currentDate.getDate() + i);
      dates.push(nextDate);
    }
    return dates;
  }

  openDateModal(selectedDate: Date, course: GolfCourse): void {
    this.selectedDate = selectedDate;
    this.selectedCourse = course;
    this.isModalOpen = true;

    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = 'hidden';
    }
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.selectedDate = null;
    this.selectedCourse = null;

    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = 'auto';
    }
  }

  goToWebsite(): void {
    if (this.selectedCourse?.website && isPlatformBrowser(this.platformId)) {
      window.open(this.selectedCourse.website, '_blank', 'noopener noreferrer');
    }
  }

  viewCourseDetails(courseId: number, event: Event): void {
    event.preventDefault();
    // Navigate to course details or open modal with detailed information
    console.log('Viewing course details for:', courseId);
    // You can implement navigation or detailed modal here
  }
}
