import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AStarComponent } from './astar.component';

describe('AStarComponent', () => {
  let component: AStarComponent;
  let fixture: ComponentFixture<AStarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AStarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AStarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
