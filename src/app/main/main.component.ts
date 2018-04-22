import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { CampaignService } from '../services/campaign.service';
import { ProductService } from '../services/product.service';
import { Campaign } from '../utils/CampaignsModels';
import { Producto } from '../utils/ProductsModels';

import { Router } from '@angular/router';

import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';

@Component({
  selector: 'app-main',
  providers: [CampaignService, ProductService],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  public hiddenCarousel = true;
  public imageSources: string[];
  campaigns: Campaign[] = null;
  products: Producto[] = null;
  currentUser=this.storage.get("user");
  constructor(private http: HttpClient, private campaignService: CampaignService, private productService: ProductService, @Inject(LOCAL_STORAGE) private storage: WebStorageService, private router: Router) { }

  ngOnInit() {
    
    this.campaignService.getCampaigns().subscribe(data => {

      this.campaigns = data;
      console.log(this.campaigns);
      for (var _i = 0; _i < data.length; _i++) {
        var camp = data[_i];
        console.log(camp);

      }
      this.hiddenCarousel = false;
    });

    this.productService.getTopFive().subscribe(data => {

      this.products = data;


    });

  }

  viewProduct(product: Producto) {
    this.storage.set("currentProduct", product);
    this.storage.set("comeFrom", "/");
    this.router.navigateByUrl("/product");
  }
}

