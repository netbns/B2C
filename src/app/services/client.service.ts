import { Injectable } from '@angular/core';
import { Constants } from '../utils/Constants';
import { Client, ClientResponse } from '../utils/ClientModels';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ClientService {

  constructor(private http: HttpClient) { }

  createClient(client: Client) {
    const url = Constants.CLIENTS_URL;

    return this.http.post<ClientResponse>(url, client);
  }

  getClientById(id: number) {
    const url = Constants.CLIENTS_URL + id;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),withCredentials: true
    };
    return this.http.get<ClientResponse>(url, httpOptions);
  }

  updateClient(client: Client) {
    const url = Constants.CLIENTS_URL;
    const httpOptions = {
      withCredentials: true
    };
    return this.http.put<ClientResponse>(url, client,httpOptions);
  }
}
