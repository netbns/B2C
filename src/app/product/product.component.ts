import { Component, OnInit, Inject } from '@angular/core';
import { Producto } from '../utils/ProductsModels';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { Router } from '@angular/router';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { ShoppingCart } from '../utils/ShoppingCartModels';
import { NotificationsService } from 'angular2-notifications';


@Component({
  selector: 'app-product',
  providers: [ShoppingCartService],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  product: Producto = this.storage.get("currentProduct");
  comeFrom = this.storage.get("comeFrom");
  goCart=false;
  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService, private router: Router, private shoppingCartService: ShoppingCartService, private notif: NotificationsService) { }

  ngOnInit() {

  }

  goBack() {
    this.router.navigateByUrl(this.comeFrom);
  }

  addToCart() {    
    var client=this.storage.get('user');    
    var shoppingCart: ShoppingCart = this.storage.get("currentCart");
    if (shoppingCart) {
      shoppingCart.client=client?client.id:null;
      var idx: number = -1;
      for (let i = 0; i < shoppingCart.items.length; i++) {
        const item = shoppingCart.items[i];
        if (item.productId === this.product.productoId) {
          idx = i;
        }
      }
      if (idx === -1) {
        shoppingCart.items.push({ id: null, productId: this.product.productoId, quantity: 1 });
        this.shoppingCartService.updateShoppingCart(shoppingCart).subscribe(data => {
          this.storage.set("currentCart", data['payload']);
          this.goCart=true;
          this.notif.success(
            'Éxito',
            'Producto agregado al carrito',
            {
              timeOut: 3000,
              showProgressBar: true,
              pauseOnHover: false,
              clickToClose: true,
              maxLength: 50,
              position:["top","middle"]
            }
          );
        });
      } else {
        this.notif.alert(
          'Advertencia',
          'Ya agregaste este producto al carrito',
          {
            timeOut: 3000,
            showProgressBar: true,
            pauseOnHover: false,
            clickToClose: true,
            maxLength: 50,
            position:["top","middle"]
          }
        );
      }

    } else {
      shoppingCart = {
        id: null,
        client: client?client.id:null,
        
        items: [{ id: null, productId: this.product.productoId, quantity: 1 }]
      };

      this.shoppingCartService.createShoppingCart(shoppingCart).subscribe(data => {
        this.storage.set("currentCart", data['payload']);
        this.goCart=true;
        this.notif.success(
          'Éxito',
          'Producto agregado al carrito',
          {
            timeOut: 3000,
            showProgressBar: true,
            pauseOnHover: false,
            clickToClose: true,
            maxLength: 50,
            position:["top","middle"]
          }
        );
      });
    }
  }
  goToCart(){
    this.storage.set("comeFrom","/product");
    this.router.navigateByUrl("/shoppingcart");
  }
}
