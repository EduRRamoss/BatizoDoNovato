import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutoSearchComponent } from './produto-search.component';

describe('ProdutoSearchComponent', () => {
  let component: ProdutoSearchComponent;
  let fixture: ComponentFixture<ProdutoSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProdutoSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProdutoSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
