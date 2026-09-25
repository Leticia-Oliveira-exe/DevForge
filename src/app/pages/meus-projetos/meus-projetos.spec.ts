import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeusProjetos } from './meus-projetos';

describe('MeusProjetos', () => {
  let component: MeusProjetos;
  let fixture: ComponentFixture<MeusProjetos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeusProjetos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeusProjetos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
