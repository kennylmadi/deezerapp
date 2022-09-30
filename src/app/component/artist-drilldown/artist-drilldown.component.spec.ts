import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistDrilldownComponent } from './artist-drilldown.component';

describe('ArtistDrilldownComponent', () => {
  let component: ArtistDrilldownComponent;
  let fixture: ComponentFixture<ArtistDrilldownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtistDrilldownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistDrilldownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
