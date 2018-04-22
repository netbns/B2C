import { Injectable } from '@angular/core';
import { Constants } from '../utils/Constants';

import { HttpClient } from '@angular/common/http';

@Injectable()
export class CountriesService {

  constructor(private http: HttpClient) { }

  getCountries(){
    const url=Constants.COUNTRIES_URL;
    return this.http.get<any[]>(url);
  }
}
