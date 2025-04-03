import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DentistSidebarComponent } from './dentist-sidebar.component';

describe('DentistSidebarComponent', () => {
  let component: DentistSidebarComponent;
  let fixture: ComponentFixture<DentistSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DentistSidebarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DentistSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
