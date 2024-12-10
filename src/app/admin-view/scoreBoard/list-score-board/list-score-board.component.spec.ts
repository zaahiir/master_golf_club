import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListScoreBoardComponent } from './list-score-board.component';

describe('ListScoreBoardComponent', () => {
  let component: ListScoreBoardComponent;
  let fixture: ComponentFixture<ListScoreBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListScoreBoardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListScoreBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
