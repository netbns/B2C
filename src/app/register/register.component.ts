import { Component, OnInit } from '@angular/core';
import { ClientService } from '../services/client.service';
import { CountriesService } from '../services/countries.service';
import { Client, ClientResponse } from '../utils/ClientModels';
import { NotificationsService } from 'angular2-notifications';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-register',
  providers: [ClientService, CountriesService],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  client: Client = { id: null, creditCardNumber: null, email: null, creditCardType: null, names: null, lastNames: null, password: null, phoneNumber: null, status: null, addresses: [] };
  countries:any[]=[];
  country:any[]=[];
  state:any[]=[];
  constructor(private countriesService:CountriesService,private clientService: ClientService, private notif: NotificationsService, private router: Router) { }
  registerForm: FormGroup;
  ngOnInit() {
    this.countriesService.getCountries().subscribe(data=>{
      
      this.countries=data['Countries'];
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
      this.client.addresses[i].country=this.country [i].CountryName;
      this.client.addresses[i].state=this.state [i].StateName;
      
    }
    this.clientService.createClient(this.client).subscribe(data => {
      this.notif.success(
        'Éxito',
        'Registro exitoso',
        {
          timeOut: 3000,
          showProgressBar: true,
          pauseOnHover: false,
          clickToClose: true,
          maxLength: 50,
          position: ["top", "middle"]
        }
      );
      this.router.navigateByUrl("/login")
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
    this.router.navigateByUrl("/login");
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
