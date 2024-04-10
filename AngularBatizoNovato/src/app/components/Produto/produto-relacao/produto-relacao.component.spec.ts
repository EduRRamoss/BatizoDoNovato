import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutoRelacaoComponent } from './produto-relacao.component';

describe('ProdutoRelacaoComponent', () => {
  let component: ProdutoRelacaoComponent;
  let fixture: ComponentFixture<ProdutoRelacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProdutoRelacaoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProdutoRelacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
