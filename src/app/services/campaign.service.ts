import { Injectable } from '@angular/core';
import { Constants } from '../utils/Constants';
import { Campaign } from '../utils/CampaignsModels';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class CampaignService {

  constructor(private http: HttpClient) {}

  getCampaigns(){    
    const requestUrl=Constants.CAMPAIGNS_URL;
    return this.http.get<Campaign[]>(requestUrl); 
  }

}
