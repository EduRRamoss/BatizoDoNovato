import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegraSearchComponent } from './regra-search.component';

describe('RegraSearchComponent', () => {
  let component: RegraSearchComponent;
  let fixture: ComponentFixture<RegraSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegraSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegraSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
