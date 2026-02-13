import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserdashbordComponent } from './userdashbord.component';

describe('UserdashbordComponent', () => {
  let component: UserdashbordComponent;
  let fixture: ComponentFixture<UserdashbordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserdashbordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserdashbordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
