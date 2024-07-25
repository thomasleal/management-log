import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Delivery } from '../interfaces/delivery';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {

  url = 'https://raw.githubusercontent.com/brunochikuji/example/main/entregas.json'

  constructor(private httpClient: HttpClient) {}

  getDelivery(): Observable<Delivery[]> {
    return this.httpClient.get<Delivery[]>(this.url)
  }
}
