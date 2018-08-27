import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Constants } from './constants';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private http:HttpClient, private Constants:Constants) { }
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

  getSectorPerformance(){
    
    return this.http.get('https://api.iextrading.com/1.0/stock/market/sector-performance').pipe(
      map((res:Response) => res)
      );
  }

  getBatch(){
    console.log(this.Constants)
    const randSym[] = [];
    const randNasdaqNum = Math.floor( Math.random() * this.Constants.NASDAQ.length);
    const randNyseNum = Math.floor( Math.random() * this.Constants.NYSE.lentgh);

    for(let i of 1..6){
      console.log(NASDAQ)
      const symbolChoser = Math.random();
      const NASDAQ = this.Constants.NASDAQ[randNasdaqNum].Symbol;
      const NYSE = this.Constants.NYSE[randNyseNum].Symbol;
      symbolChoser > 0 ? randSym.push(NASDAQ) : randSym.push(NYSE);
      console.log(NASDAQ, NYSE);
    };

    console.log(randSym);
  };
}
