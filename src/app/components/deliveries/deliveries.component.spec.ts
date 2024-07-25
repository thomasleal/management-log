import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveriesComponent } from './deliveries.component';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('DeliveriesComponent', () => {
  let component: DeliveriesComponent;
  let fixture: ComponentFixture<DeliveriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeliveriesComponent],
      providers: [
        provideAnimations()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliveriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should filter dataSource after call method applyFilter()`, () => {
    component.status = 'ENTREGUE'
    component.dataSource.data = [
      {
        id: '40',
        documento: '01060',
        motorista: { nome: 'João Silva' },
        cliente_origem: {
          nome: 'Empresa XYZ',
          endereco: 'Rua das Flores, 123',
          bairro: 'Bela Vista',
          cidade: 'São Paulo'
        },
        cliente_destino: {
          nome: 'Carlos Lima',
          endereco: 'Rua Paulista, 101',
          bairro: 'Moema',
          cidade: 'São Paulo'
        },
        status_entrega: 'ENTREGUE'
      },
      {
        id: '39',
        documento: '01059',
        motorista: { nome: 'Maria Oliveira' },
        cliente_origem: {
          nome: 'Empresa GHI',
          endereco: 'Avenida Ibirapuera, 890',
          bairro: 'Liberdade',
          cidade: 'São Paulo'
        },
        cliente_destino: {
          nome: 'Paula Silva',
          endereco: 'Rua da Consolação, 123',
          bairro: 'Centro',
          cidade: 'São Paulo'
        },
        status_entrega: 'PENDENTE'
      }
    ]
    component['applyFilter']();
    expect(component.dataSource.filteredData.length).toEqual(1);
  });

  it(`should format address after call method formatarEndereco()`, () => {
    component.status = 'ENTREGUE'
    const endereco = {
      nome: 'Carlos Lima',
      endereco: 'Rua Paulista, 101',
      bairro: 'Moema',
      cidade: 'São Paulo'
    }
    expect(component['formatarEndereco'](endereco)).toBe('Rua Paulista, 101 - Moema, São Paulo');
  });
});
