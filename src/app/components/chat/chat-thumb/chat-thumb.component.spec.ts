import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatThumbComponent } from './chat-thumb.component';

describe('ChatThumbComponent', () => {
  let component: ChatThumbComponent;
  let fixture: ComponentFixture<ChatThumbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatThumbComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatThumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
