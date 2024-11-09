import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookATeeComponent } from './book-atee.component';

describe('BookATeeComponent', () => {
  let component: BookATeeComponent;
  let fixture: ComponentFixture<BookATeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookATeeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookATeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
