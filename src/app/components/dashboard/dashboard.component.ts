import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { StoreService } from '../../services/store.service';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  displayedColumns: string[] = ['nome', 'entregues', 'saiuEntrega'];
  displayedColumnsInsucesso: string[] = ['nome', 'insucessos'];
  displayedColumnsbairros: string[] = ['bairro', 'entregues', 'saiuEntrega'];
  entregaMotoristas: MatTableDataSource<any> = new MatTableDataSource();
  entregaBairro: MatTableDataSource<any> = new MatTableDataSource();

  constructor(private storeService: StoreService) {}
  
  ngOnInit(): void {
    this.tabelaMotoristas();
    this.tabelaBairros();
  }
  
  private tabelaMotoristas(): void {
    this.storeService.tabelaMotorista$.subscribe({
      next: (deliveries: any) => {
        this.entregaMotoristas = new MatTableDataSource(deliveries);
      }
    })
  }

  private tabelaBairros(): void {
    this.storeService.tabelaBairrosBS$.subscribe({
      next: (deliveries: any) => {
        this.entregaBairro = new MatTableDataSource(deliveries);
      }
    })
  }
}
