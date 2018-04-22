import { Component,Inject } from '@angular/core';
import { Location } from '@angular/common';
import {Router} from '@angular/router';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  searchText = null;
  showSearch=true;
  currentUser=this.storage.get("user");
  
  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService,public router:Router, private location:Location) {
     
  }
  search(){
    this.storage.set("searchText",this.searchText);
    console.log(this.router.url);//window.location.reload();
    this.router.navigateByUrl('/search');
  }

  goToCart(){
    this.router.navigateByUrl("/shoppingcart");
  }
  
  goToLogin(){
    this.router.navigateByUrl("/login");
  }

  goToProfile(){
    this.router.navigateByUrl("/user");
  }

  goToOrders(){
    this.router.navigateByUrl("/orders");
  }

  signOut(){
    this.storage.remove("user");
    this.storage.remove("searchText");
    this.storage.remove("comeFrom");
    this.storage.remove("orders");
    this.storage.remove("order");
    this.storage.remove("currentProduct");
    window.location.reload();
    this.router.navigateByUrl("/");
  }
}
