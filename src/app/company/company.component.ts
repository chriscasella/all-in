import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StockService } from '../stock.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit, OnChanges {
  @Input() company:null;
  
  companySym;
  quote;
  constructor(private route:ActivatedRoute,
              private StockService:StockService) { }

  ngOnInit() {
    this.route.params.subscribe( res => {
      this.companySym = res['companySymbol']
      console.log(this.companySym);
      this.StockService.getQuote(this.companySym).subscribe(res =>{
        console.log('quote', res);
        this.quote = res;
      });
      this.StockService.get1dyChart(this.companySym).subscribe(res => {
        console.log('1dychart', res);
      })
    })
  }

  ngOnChanges(){
    console.log(this.company);
  }

}
