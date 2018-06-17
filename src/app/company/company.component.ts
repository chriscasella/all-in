import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StockService } from '../stock.service';
import { element } from 'protractor';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit, OnChanges {
  @Input() company:null;
  
  companySym;
  quote;
  greenChart = { // grey
    backgroundColor: 'rgba(70, 255, 70, 0.664)',
    borderColor: 'rgba(53, 189, 53, 0.938)',
    pointBackgroundColor: 'rgba(87, 185, 74, 0.801)',
    pointBorderColor: 'rgba(67, 163, 55, 0.801)',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  };
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
      this.StockService.get1mChart(this.companySym).subscribe( res => {
        this.parseChartData('1m',res);
      })
      // this.StockService.get1dyChart(this.companySym).subscribe(res => {
      //   console.log('1dychart', res);
      //   this.parseChartData('1dy', res);
      // })
    })
  }

  parseChartData(type, data){
    if(type == '1dy'){
      this.parse1dyData(data);
    } else {
      this.parseElseChartData(data);
    }
  };
  parse1dyData(data){
    this.lineChartData.length > 0 ? this.lineChartData = [] : '';
    const chartLabels = data.map(element => {
      return element.label;
    });
    this.lineChartLabels = chartLabels;
    const chartData = data.map(element => {
      return element.marketAverage;
    });
    const chartPayLoad = {
      data: chartData,
      label: 'Average'
    };
    this.lineChartData.push(chartPayLoad);
    
        const lcd = this.lineChartData[0].data;
        console.log(lcd)
        const highMinusLow = lcd[lcd.length - 1] - lcd[0];
        ( highMinusLow > 0) ? this.lineChartColors.push(this.greenChart) : '';
        // console.log('chartPayLoad', chartPayLoad);

  };

  parseElseChartData(data){
    this.lineChartData.length > 0 ? this.lineChartData = [] : '';
    const chartLabels = data.map(element => {
      return element.date;
    });
    this.lineChartLabels = chartLabels;
    const chartData = data.map(element => {
      return element.high;
    });
    const chartPayLoad = {
      data: chartData,
      label: 'High'
    };
    this.lineChartData.push(chartPayLoad);

    const lcd = this.lineChartData[0].data;
    const highMinusLow = lcd[lcd.length - 1] - lcd[0];
    (highMinusLow > 0) ? this.lineChartColors.push(this.greenChart) : '';
    
  }
  public lineChartType: string = 'line';
  public lineChartLegend: boolean = true;
  public lineChartOptions: any = {
    responsive: true
  };
  public lineChartLabels: Array<any> = null;
  public lineChartData: Array<any> = [
    // { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    // { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
    // { data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C' }
  ];
  public lineChartColors: Array<any> = [
  ];

  ngOnChanges(){
    console.log(this.company);
  }

}
