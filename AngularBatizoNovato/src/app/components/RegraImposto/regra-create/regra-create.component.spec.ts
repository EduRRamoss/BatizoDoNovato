import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegraCreateComponent } from './regra-create.component';

describe('RegraCreateComponent', () => {
  let component: RegraCreateComponent;
  let fixture: ComponentFixture<RegraCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegraCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegraCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
