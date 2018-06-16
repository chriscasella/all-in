import { Component, OnInit } from '@angular/core';
import { StockService } from '../../stock.service'
@Component({
  selector: 'app-company-select',
  templateUrl: './company-select.component.html',
  styleUrls: ['./company-select.component.scss']
})
export class CompanySelectComponent implements OnInit {

  constructor(private StockService:StockService) { }

  ngOnInit() {
  }

  getCompany(sym:string){
    this.StockService.getQuote(sym).subscribe((res)=>{
      console.log(res);
    })
  }

}
