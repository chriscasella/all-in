import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StockService } from '../stock.service';
import { HttpResponse } from 'selenium-webdriver/http';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})

export class CompanyComponent implements OnInit, OnChanges {
  @Output() CompanyInfoCard: EventEmitter<any> = new EventEmitter();
  @Output() CompanySymbol: EventEmitter<any> = new EventEmitter();

  companySym;
  quote;
  activeButton = '1m';

  greenChart = { // grey
    backgroundColor: 'rgba(70, 255, 70, 0.664)',
    borderColor: 'rgba(53, 189, 53, 0.938)',
    pointBackgroundColor: 'rgba(87, 185, 74, 0.801)',
    pointBorderColor: 'rgba(67, 163, 55, 0.801)',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  };

  public chartButtons = [
    {
      type:'5y',
      desc:'5 year',
      click:'getChartData(5y)'
    },
    {
      type: '2y',
      desc: '2 year',
      click: 'getChartData(2y)'
    },
    {
      type: '1y',
      desc: '1 year',
      click: 'getChartData(1y)'
    },
    {
      type: 'ytd',
      desc: 'YTD',
      click: 'getChartData(ytd)'
    },
    {
      type: '6m',
      desc: '6 months',
      click: 'getChartData(6m)'
    },
    {
      type: '3m',
      desc: '3 months',
      click: 'getChartData(3m)'
    },
    {
      type: '1m',
      desc: '1 month',
      click: 'getChartData(1m)'
    },
    {
      type: '1d',
      desc: '1 day',
      click: 'getChartData(1d)'
    }
  ];
  public lineChartType: string = 'line';
  public lineChartLegend: boolean = false;
  public lineChartOptions: any = {
    responsive: true
  };
  public lineChartLabels: Array<any> = [];
  public lineChartData: Array<any> = [
    // { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    // { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
    // { data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C' }
  ];
  public lineChartColors: Array<any> = [];
  constructor(private route:ActivatedRoute,
              private StockService:StockService) { }

  ngOnInit() {
    this.route.params.subscribe( (res) => {
      this.companySym = res['companySymbol']
      console.log(this.companySym);
      this.StockService.getQuote(this.companySym).subscribe(res =>{
        console.log('quote', res);
        const r = res;
        const rawCompanyInfo = {
          title: r.companyName,
          text1: r.symbol,
          text2: r.sector
        }
        this.CompanyInfoCard.emit(rawCompanyInfo);
        this.CompanySymbol.emit(this.companySym);
        this.quote = r;
      });
      this.StockService.getChartData(this.companySym, '1m').subscribe( res => {
        this.parseChartData('1m',res);
      })
      // this.StockService.get1dyChart(this.companySym).subscribe(res => {
      //   console.log('1dychart', res);
      //   this.parseChartData('1dy', res);
      // })
    })
  }

  getChartData(type){
    this.StockService.getChartData(this.companySym, type).subscribe(res =>{
      this.parseChartData(type, res);
    });
  };


  parseChartData(type, data){
    if(type == '1dy'){
      this.parse1dyData(data);
    } else {
      this.parseElseChartData(data);
    }
  };
  parse1dyData(data){
    this.lineChartData.length > 0 ? this.lineChartData = [] : '';
    this.lineChartLabels.length > 0 ? this.lineChartLabels = [] : '';
    const chartLabels = data.map(element => {
       if (element.marketAverage > -1){
        return element.label;
      } ;
    });
    this.lineChartLabels = chartLabels;
    const chartData = data.map(element => {
      if (element.marketAverage > -1){
        return element.marketAverage;
      } ;
    });
    const chartPayLoad = {
      data: chartData,
      label: 'Average'
    };
    this.lineChartData.push(chartPayLoad);

    const lcd = this.lineChartData[0].data;
    console.log(lcd)
    const highMinusLow = lcd[lcd.length - 1] - lcd[0];
    (highMinusLow > 0) ? this.lineChartColors.push(this.greenChart) : '';
    // console.log('chartPayLoad', chartPayLoad);

  };

  parseElseChartData(data){
    this.lineChartData.length > 0 ? this.lineChartData = [] : '';
    this.lineChartLabels.length > 0 ? this.lineChartLabels = [] : '';
    this.lineChartColors.length > 0 ? this.lineChartColors = [] : '';
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
    // console.log('chartlabels', this.lineChartLabels)
  }

  setActiveChart(type){
    if(this.activeButton != type){
      this.activeButton = type;
    }
  };

  wipeCharts(){
    this.lineChartData = [];
    this.lineChartLabels = [];
  };

  ngOnChanges(){
  }

}
