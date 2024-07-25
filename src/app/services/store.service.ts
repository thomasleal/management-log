import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor() { }

  private tabelaEntregasBS = new BehaviorSubject<any[]>(new Array() as any[]);
  private tabelaMotoristaBS = new BehaviorSubject<any[]>(new Array() as any[]);
  private tabelaBairrosBS = new BehaviorSubject<any[]>(new Array() as any[]);
  
  tabelaEntregas$ = this.tabelaEntregasBS.asObservable();
  tabelaMotorista$ = this.tabelaMotoristaBS.asObservable();
  tabelaBairrosBS$ = this.tabelaBairrosBS.asObservable();

  updateTabelaMotorista(deliveries: any) {
    this.tabelaMotoristaBS.next(deliveries);
  }

  updateTabelaBairros(deliveries: any) {
    this.tabelaBairrosBS.next(deliveries);
  }

  updateTabelaEntregas(deliveries: any) {
    this.tabelaEntregasBS.next(deliveries);
  }
}
