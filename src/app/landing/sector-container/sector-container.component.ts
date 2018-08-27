import { Component, OnInit } from '@angular/core';
import { StockService } from '../stock.service';

@Component({
  selector: 'app-sector-container',
  templateUrl: './sector-container.component.html',
  styleUrls: ['./sector-container.component.scss']
})
export class SectorContainerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.StockService.getSectorPerformance().subscribe((res)=>{
      console.log(res);
      
    });
  }

}