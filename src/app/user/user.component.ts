import { Component, OnInit, Inject } from '@angular/core';
import { ClientService } from '../services/client.service';
import { CountriesService } from '../services/countries.service';
import { Client, ClientResponse } from '../utils/ClientModels';
import { NotificationsService } from 'angular2-notifications';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-User',
  providers: [ClientService, CountriesService],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  client: Client = this.storage.get("user");
  countries: any[] = [];
  country: any[] = [];
  state: any[] = [];
  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService, private countriesService: CountriesService, private clientService: ClientService, private notif: NotificationsService, private router: Router) { }
  registerForm: FormGroup;
  ngOnInit() {
    this.countriesService.getCountries().subscribe(data => {

      this.countries = data['Countries'];
      if(this.client){
        if(this.client.addresses){
          for(let i=0;i<this.client.addresses.length;i++){
            var element=this.client.addresses[i];
            this.countries.forEach(country => {
              if(element.country===country['CountryName']){
                this.country[i]=country;
                this.country[i].States.forEach(state => {
                  if(state.StateName===element.state){
                    this.state[i]=state;
                  }
                });
              }
            });
          };              
        }
      }
      
      console.log(this.countries);
    })
    this.registerForm = new FormGroup({
      'names': new FormControl(this.client.names, [
        Validators.required
      ]),
      'lastNames': new FormControl(this.client.lastNames, Validators.required),
      'phoneNumber': new FormControl(this.client.phoneNumber),

    });
  }

  register() {
    this.client['status'] = 'ACTIVE';
    for (let i = 0; i < this.client.addresses.length; i++) {
      this.client.addresses[i].country = this.country[i].CountryName;
      this.client.addresses[i].state = this.state[i].StateName;

    }
    this.clientService.updateClient(this.client).subscribe(data => {
      this.notif.success(
        'Éxito',
        'Actualización exitosa',
        {
          timeOut: 3000,
          showProgressBar: true,
          pauseOnHover: false,
          clickToClose: true,
          maxLength: 50,
          position: ["top", "middle"]
        }
      );
      this.storage.set("user",data['payload']);
      this.router.navigateByUrl("/")
    },
      error => {
        this.notif.error(
          'Error',
          error.error['message'],
          {
            timeOut: 3000,
            showProgressBar: true,
            pauseOnHover: false,
            clickToClose: true,
            maxLength: 50,
            position: ["top", "middle"]
          }
        );
      });
  }

  goToLogin() {
    this.router.navigateByUrl("/");
  }

  addAddress() {
    this.client.addresses.push({
      id: null,
      street: null,
      state: null,
      zipCode: null,
      country: null,
      addresType: null,
      city: null
    })
  }

}
