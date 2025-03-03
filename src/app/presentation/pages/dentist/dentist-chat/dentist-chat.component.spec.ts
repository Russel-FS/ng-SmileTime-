import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DentistChatComponent } from './dentist-chat.component';

describe('DentistChatComponent', () => {
  let component: DentistChatComponent;
  let fixture: ComponentFixture<DentistChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DentistChatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DentistChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
