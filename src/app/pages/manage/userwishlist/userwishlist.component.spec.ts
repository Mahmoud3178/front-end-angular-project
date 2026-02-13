import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserwishlistComponent } from './userwishlist.component';

describe('UserwishlistComponent', () => {
  let component: UserwishlistComponent;
  let fixture: ComponentFixture<UserwishlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserwishlistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserwishlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
