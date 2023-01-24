import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DFSComponent } from './dfs.component';

describe('DFSComponent', () => {
  let component: DFSComponent;
  let fixture: ComponentFixture<DFSComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DFSComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DFSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
