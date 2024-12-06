import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLayoutTemplateComponent } from './admin-layout-template.component';

describe('AdminLayoutTemplateComponent', () => {
  let component: AdminLayoutTemplateComponent;
  let fixture: ComponentFixture<AdminLayoutTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminLayoutTemplateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminLayoutTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
