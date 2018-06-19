import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { StockService, StockService } from '../../stock.service';


interface AllInInterface {
  pb:{
    bool:boolean,
    pbRatio:number
  },
  revenue:{
    bool:boolean,

  },
  eps:{
    bool:boolean,
    actualEpsDiff:number
  }
}


// P / B Ratio = Market Price per Share / Book Value per Share

// where Book Value per Share = (Total Assets - Total Liabilities) / Number of shares outstanding


@Component({
  selector: 'app-all-in',
  templateUrl: './all-in.component.html',
  styleUrls: ['./all-in.component.scss'],
  providers:[StockService]
})
export class AllInComponent implements OnInit, OnChanges {
  @Input() CompanySymbol;
  companySym;
  financials;
  // results = {
  //   pb:{
  //     bool:
  //   },
  //   revenue : {
  //     bool:'',


  //   },
  //   eps: {

  //   }

  // }
  constructor(public StockService:StockService) { }

  ngOnInit() {
  }
  
  ngOnChanges(){
    this.CompanySymbol.subscribe( sym => {
      console.log(sym)
      this.companySym = sym;
    })
    //this.goAllIn();
  }
  goAllIn(){
    this.getFinancials();
  }

  getFinancials(){
    this.StockService.getFinancials(this.companySym).subscribe(res =>{
      console.log(res);
      this.financials = res.financials;
    });
  };

}
