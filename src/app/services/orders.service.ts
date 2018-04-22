import { Injectable } from '@angular/core';
import { Constants } from '../utils/Constants';
import { Order } from '../utils/OrdersModels';

import { HttpClient } from '@angular/common/http';

@Injectable()
export class OrdersService {

  constructor(private http: HttpClient) { }

  getOrders(clientId:number){
    const url=Constants.ORDERS_URL;
    return this.http.get<Order[]>(url);
  }
}
