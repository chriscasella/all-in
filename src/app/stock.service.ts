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

  get1dyChart(sym){
    return this.http.get('https://api.iextrading.com/1.0/stock/' + sym + '/chart/1d');
  };
  getChartData(sym, type){
    return this.http.get('https://api.iextrading.com/1.0/stock/' + sym + '/chart/' + type);
  };

  //For All In Calculations
  getFinancials(sym){ 
    return this.http.get('https://api.iextrading.com/1.0/stock/' + sym +'/financials');
  }
  getStats(sym){
    return this.http.get('https://api.iextrading.com/1.0/stock/' + sym + '/stats');
  }
  getEarnings(sym){
    return this.http.get('https://api.iextrading.com/1.0/stock/' + sym + '/earnings');
  }
}
