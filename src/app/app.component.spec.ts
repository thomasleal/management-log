import { DeliveryService } from './services/delivery.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideAnimations } from '@angular/platform-browser/animations';
import { StoreService } from './services/store.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let deliveryService: DeliveryService;
  let storeService: StoreService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, HttpClientTestingModule],
      providers: [DeliveryService, DeliveryService, provideAnimations()]
    }).compileComponents();
    deliveryService = TestBed.inject(DeliveryService);
    storeService = TestBed.inject(StoreService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have the 'management-log' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('management-log');
  });

  it(`should have call updateTabelaMotorista() after call method criaTabelasMotoristas()`, () => {
    const response = {
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
    }
    const spyUpdateTabelaMotorista = jest.spyOn(storeService, 'updateTabelaMotorista');
    component['criaTabelasMotoristas']([response]);
    expect(spyUpdateTabelaMotorista).toHaveBeenCalled();
  });
  
  it(`should have call updateTabelaBairros() after call method criaTabelasBairros()`, () => {
    const response = {
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
    }
    const spyUpdateTabelaBairros = jest.spyOn(storeService, 'updateTabelaBairros');
    component['criaTabelasBairros']([response]);
    expect(spyUpdateTabelaBairros).toHaveBeenCalled();
  });

  it(`should have call getDeliveries()`, () => {
    const getDeliveries = jest.spyOn(AppComponent.prototype as any, 'getDeliveries');
    component['getDeliveries']();
    expect(getDeliveries).toHaveBeenCalled();
  });
});
