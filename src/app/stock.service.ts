import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private http:HttpClient) { }

  getCompany(sym){
    return this.http.get('https://api.iextrading.com/1.0/stock/'+ sym +'/company');
  }

  getQuote(sym){
    return this.http.get('https://api.iextrading.com/1.0/stock/' + sym + '/quote');
  }


}