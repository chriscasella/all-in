import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { StockService } from '../../stock.service';


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
  f;//financials object
  s;//stats object
  q; //quote object
  e; //earnings object

  results = {
    pb: {
      bool: false,
      pbRatio: 0
    },
    revenue: {
      bool: false,

    },
    eps: {
      bool: false,
      actualEpsDiff: 0
    }
  }
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
    this.StockService.getFinancials(this.companySym).subscribe(finRes => {
      console.log('finRes',finRes);
      this.f = finRes.financials;
      this.StockService.getStats(this.companySym).subscribe(statsRes => {
        this.s = statsRes;
        this.StockService.getQuote(this.companySym).subscribe(quoteRes => {
          this.q = quoteRes;
          this.calcPbRatio();
          this.StockService.getEarnings(this.companySym).subscribe(earnRes => {
            this.e = earnRes.earnings;
            this.calcEps();

          })
        });
      });
    });
  };

  calcPbRatio(){
    //more info https://www.investopedia.com/terms/p/price-to-bookratio.asp
    const tA = this.f[0].totalAssets;
    const tL = this.f[0].totalLiabilities;
    const sO = this.s.sharesOutstanding;
    const bvps = ((tA - tL) / sO) //book value per share
    const mpps = this.q.latestPrice;
    const pbRatioCalc = mpps / bvps;
    this.results.pb.pbRatio = pbRatioCalc;
    pbRatioCalc > 1 ? this.results.pb.bool = true : this.results.pb.bool = false;
    console.log(pbRatioCalc, this.results);
  };
  calcEps(){
    //more info https://www.nasdaq.com/investing/dozen/earnings-per-share.aspx
    const recentEps = this.e[0].actualEPS;
    const lastEPS = this.e[3].actualEPS;
    const epsCalc = recentEps - lastEPS;
    this.results.eps.actualEpsDiff = epsCalc;
    epsCalc > 0 ? this.results.eps.bool = true : this.results.eps.bool = false;
    console.log(this.e);
  };

}
