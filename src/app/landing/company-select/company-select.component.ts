import { Component, OnInit, Output } from '@angular/core';
import { StockService } from '../../stock.service'
import { EventEmitter } from 'events';
@Component({
  selector: 'app-company-select',
  templateUrl: './company-select.component.html',
  styleUrls: ['./company-select.component.scss']
})
export class CompanySelectComponent implements OnInit {
  @Output() company = new EventEmitter();

  constructor(private StockService:StockService) { }

  ngOnInit() {
  }

  getCompany(sym:string){
    this.StockService.getQuote(sym).subscribe((res)=>{
      console.log(res);
      let resp:any = res;
      this.company.emit(resp);
    })
  }

}
