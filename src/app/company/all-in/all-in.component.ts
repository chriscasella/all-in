import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
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
  @Output() AllinResults = new EventEmitter();
  @Output() ReadableResults = new EventEmitter();

  companySym;
  f:any;//financials object
  s:any;//stats object
  q:any; //quote object
  e:any; //earnings object

  results = {
    pb: {
      bool: false,
      value: 0,
      display: 'PB Ratio',
      longDisplay: 'Price-to-Book Ratio'
    },
    eps: {
      bool: false,
      value: 0,
      display:'EPS',
      longDisplay:'Earnings Per Share'
    },
    roe:{
      bool:false,
      value: 0,
      display: 'RoE',
      longDisplay: 'Return on Equity'
    },
    epsSurprise:{
      bool:false,
      value: 0,
      display: 'Earnings Surprise',
      longDisplay: 'Earnings Surprise'
    },
    earningsGrowth:{
      bool: false,
      value: 0,
      display: 'Earnings Growth',
      longDisplay: 'Earnings Growth'
    },
    pegRatio:{
      bool: false,
      value: 0,
      display: 'PEG Ratio',
      longDisplay: 'Price/Earnings to Growth'
    }
  }

  readableResults = [];

  constructor(public StockService:StockService) { 
  }

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
    //waterfall all http calls then check to makesure the responses arent empty then do checks.
    //otherwise you have to let user know if calc is available.
    this.StockService.getFinancials(this.companySym).subscribe((finRes: any) => {
      this.f = finRes.financials;
      console.log('finRes', this.f);
      this.StockService.getStats(this.companySym).subscribe((statsRes: any) => {
        this.s = statsRes;
        this.StockService.getQuote(this.companySym).subscribe((quoteRes: any) => {
          this.q = quoteRes;
          this.StockService.getEarnings(this.companySym).subscribe((earnRes: any) => {
            this.e = earnRes.earnings;
            console.log(this.e)
            this.initCallStack();
          })
        });
      });
    });
  };

  initCallStack(){
    this.calcRoe();
    this.calcPbRatio();
    this.calcPegRatio();
    this.calcEps();
    this.calcEpsSurprise();
    this.calcEarningsGrowth();
    this.emitResults();
    this.initReadableResults();
  };
  emitResults(){
    this.AllinResults.emit(this.results);
  };

  initReadableResults(){
    this.makeReadableResults();
  };

  makeReadableResults(){
    const res = this.results;
    Object.keys(res).forEach((key)=> {
      const ele = res[key];
      const newObj = {
        bool : ele.bool,
        value: ele.value,
        display: ele.display,
        longDisplay: ele.longDisplay
      };
      this.readableResults.push(newObj);
    });
    Object.keys(res).length == this.readableResults.length ? this.emitReadableResults() : '';
  };

  emitReadableResults(){
    this.ReadableResults.emit(this.readableResults);
  };

  calcPbRatio(){
    //more info https://www.investopedia.com/terms/p/price-to-bookratio.asp
    const tA = this.f[0].totalAssets;
    const tL = this.f[0].totalLiabilities;
    const sO = this.s.sharesOutstanding;
    const bvps = ((tA - tL) / sO) //book value per share
    const mpps = this.q.latestPrice;
    const pbRatioCalc = mpps / bvps;
    this.results.pb.value = pbRatioCalc;
    pbRatioCalc > 1 ? this.results.pb.bool = true : this.results.pb.bool = false;
  };
  
  calcEps(){
    //more info https://www.nasdaq.com/investing/dozen/earnings-per-share.aspx
    const recentEps = this.e[0].actualEPS;
    const lastEPS = this.e[3].actualEPS;
    const epsCalc = recentEps - lastEPS;
    this.results.eps.value = epsCalc;
    epsCalc > 0 ? this.results.eps.bool = true : this.results.eps.bool = false;
  };

  calcRoe(){
    //more info https://www.investopedia.com/terms/r/returnonequity.asp
    const netIncome = this.f.map(element => element.netIncome).reduce((acc, val)=>{
      return acc + val;
    })/(this.f.length);
    const she = this.f.map(element => element.shareholderEquity).reduce((acc, val)=>{
      return acc + val;
    })/(this.f.length); //shareholder equity
    let roe = (netIncome / she) * 1000;
    roe >= 60 ? this.results.roe.bool = true : this.results.roe.bool = false;
    this.results.roe.value = roe;
  };
  calcEpsSurprise(){
    const epsSurprise = this.e.map(element => element.EPSSurpriseDollar).reduce((acc, val) =>{
      return acc + val;
    });
    this.results.epsSurprise.value = epsSurprise;
    epsSurprise > 0 ? this.results.epsSurprise.bool = true : this.results.epsSurprise.bool = false; 
  };

  calcEarningsGrowth(){
    const ecp = this.e[0].estimatedChangePercent;
    const yap = this.e[0].yearAgoChangePercent;
    const res = this.results.earningsGrowth;
    (ecp > 0 && yap > 0) ? res.bool = true : res.bool = false;
    res.value = yap;
  };

  calcPegRatio(){
    const growth = this.e[0].yearAgoChangePercent;
    const eps = this.e.map(element => element.actualEPS).reduce((acc, val) =>{
      return acc + val;
    })/ (this.e.length);
    const price = this.q.latestPrice;
    const pe = price/eps;
    const peg = pe/growth;
    const res = this.results.pegRatio;
    res.value = peg;
    peg < 1 ? res.bool = true : res.bool = false;
  };
}
