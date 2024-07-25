import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { StoreService } from '../../services/store.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-deliveries',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatPaginatorModule, MatSelectModule, FormsModule, ReactiveFormsModule],
  templateUrl: './deliveries.component.html',
  styleUrl: './deliveries.component.scss'
})
export class DeliveriesComponent implements OnInit, AfterViewInit {

  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  displayedColumns: string[] = ['id','nome', 'documento', 'status', 'origem', 'destino'];

  status: string = '';
  motorista: string = '';

  statusList: string[] = ['ENTREGUE', 'PENDENTE', 'INSUCESSO'];
  statusControl = new FormControl('');

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  constructor(private storeService: StoreService) {}
  
  ngOnInit(): void {
    this.getDeliveries();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  private getDeliveries(): void {
    this.storeService.tabelaEntregas$.subscribe({
      next: (deliveries: any) => {
        this.dataSource = new MatTableDataSource(deliveries);
        this.dataSource.paginator = this.paginator;
      }
    })
  }

  public applyFilter(): void {
    this.dataSource.filterPredicate = (data, filter) => {
      return data.motorista.nome.toLocaleLowerCase().includes(this.motorista.trim().toLowerCase()) && data.status_entrega.includes(this.status);
    }
    this.motorista ? this.dataSource.filter = this.motorista.trim().toLowerCase() : this.dataSource.filter = this.status;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public formatarEndereco(endereco: any): string {
    return `${endereco.endereco} - ${endereco.bairro}, ${endereco.cidade}`;
  }
}
