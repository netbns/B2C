import { Component, OnInit, Inject } from '@angular/core';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { Router } from '@angular/router';
import { Order } from '../utils/OrdersModels';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
  order: Order = null;
  index: number = -1;
  productsMap;
  constructor(private notif: NotificationsService, private router: Router, @Inject(LOCAL_STORAGE) private storage: WebStorageService) { }

  ngOnInit() {
    var orderStored = this.storage.get("order");
    this.order = orderStored['order'];
    this.productsMap = orderStored['productsMap'];
    this.index = orderStored['index'];
  }

  goToOrders() {
    this.storage.remove("order");
    this.router.navigateByUrl("/orders")
  }

  cancelOrder() {
    if (confirm("¿Está seguro de cancelar esta orden?")) {
      var orders = this.storage.get("orders");
      orders.splice(this.index, 1);
      this.storage.set("orders", orders);
      this.notif.success(
        'Éxito',
        'Orden Cancelada exitosamente',
        {
          timeOut: 3000,
          showProgressBar: true,
          pauseOnHover: false,
          clickToClose: true,
          maxLength: 50,
          position: ["top", "middle"]
        }
      );
      this.goToOrders();
    }

  }
}
