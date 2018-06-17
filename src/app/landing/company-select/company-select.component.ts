import { Component, OnInit, Output } from '@angular/core';
import { StockService } from '../../stock.service'
import { EventEmitter } from 'events';
import { Constants } from '../../constants';
import { element } from 'protractor';
import { Router } from '@angular/router';
@Component({
  selector: 'app-company-select',
  templateUrl: './company-select.component.html',
  styleUrls: ['./company-select.component.scss']
})
export class CompanySelectComponent implements OnInit {
  @Output() company = new EventEmitter();
  
  NASDAQ = this.Constants.NASDAQ;
  NYSE = this.Constants.NYSE;
  filteredSymbols = null;

  constructor(private StockService:StockService, 
              private Constants:Constants,
              private Router:Router) { }

  ngOnInit() {
  }

  findSymbol(sym:string){
    if(sym != ""){
      this.filteredSymbols = this.NASDAQ.filter(element => {
        return element.Symbol.includes(sym.toUpperCase());
      });
      const filteredNYSESymbols = this.NYSE.filter(element =>{
        return element.Symbol.includes(sym.toUpperCase());
      });
      this.filteredSymbols.concat(filteredNYSESymbols);
    } else {
      this.filteredSymbols = null;
    }
     
  }

  getCompany(sym:string){
    this.StockService.getQuote(sym).subscribe((res)=>{
      // console.log(res);
      let resp:any = res;
      this.company.emit(resp);
      this.Router.navigate(['/company/'+ resp.symbol]);
      this.filteredSymbols = null;
    })
  }

}
