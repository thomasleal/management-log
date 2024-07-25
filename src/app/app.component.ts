import { Menu } from './interfaces/menu';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MenuComponent } from './components/menu/menu.component';
import { DeliveryService } from './services/delivery.service';
import { StoreService } from './services/store.service';
import { HeaderComponent } from './components/header/header.component';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatSidenavModule,
    MenuComponent,
    HeaderComponent,
    MatIconModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'management-log';

  menus: Menu[] = [
    {
      name: 'Dashboard',
      router: '/dashboard',
      icon: 'dashboard'
    },
    {
      name: 'Lista de entregas',
      router: '/deliveries',
      icon: 'local_shipping'
    }
  ]

  constructor(
    private deliveryService: DeliveryService,
    private storeService: StoreService) {}

  ngOnInit(): void {
    this.getDeliveries();
  }
  
  private getDeliveries(): void {
    this.deliveryService.getDelivery().subscribe({
      next: (response: any) => {
        this.storeService.updateTabelaEntregas(response);
        this.criaTabelasMotoristas(response);
        this.criaTabelasBairros(response);
      }
    })
  }

  private removeDuplicados(data: string[]): string[] {
    return data.filter((value: string, index: number) => data.indexOf(value) === index);
  }

  private criaTabelasMotoristas(response: any[]) {
    const nomesUnicos = this.removeDuplicados(response.map((x:any) => x.motorista.nome));
    const entregasMotorista: any[] = [];
    nomesUnicos.forEach((nome: string) => entregasMotorista.push(response.filter((delivery: any) => nome === delivery.motorista.nome)));
    const saiuEntrega: any = [];
    entregasMotorista.forEach((element: any[], index: number) => {
      saiuEntrega.push({
        nome: nomesUnicos[index],
        entregues: element.filter(q => q.status_entrega === 'ENTREGUE').length,
        saiuEntrega: element.filter(q => q.status_entrega === 'ENTREGUE' || q.status_entrega === 'INSUCESSO').length,
        insucessos: element.filter(q => q.status_entrega === 'INSUCESSO').length,
      })
    });
    this.storeService.updateTabelaMotorista(saiuEntrega);
  }

  private criaTabelasBairros(response: any[]) {
    const bairrosUnicos = this.removeDuplicados(response.map((x:any) => x.cliente_destino.bairro));
    const entregasBairros: any[] = [];
    bairrosUnicos.forEach((bairro: string) => entregasBairros.push(response.filter((delivery: any) => bairro === delivery.cliente_destino.bairro)));
    const entregasBairro: any = [];
    entregasBairros.forEach((element: any[], index: number) => {
      entregasBairro.push({
        bairro: bairrosUnicos[index],
        entregues: element.filter(q => q.status_entrega === 'ENTREGUE').length,
        saiuEntrega: element.filter(q => q.status_entrega === 'ENTREGUE' || q.status_entrega === 'INSUCESSO').length,
      })
    });
    this.storeService.updateTabelaBairros(entregasBairro);
  }
  
}
