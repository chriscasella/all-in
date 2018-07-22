import { Component, OnInit, OnChanges, Input, EventEmitter } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-results-window',
  templateUrl: './results-window.component.html',
  styleUrls: ['./results-window.component.scss']
})
export class ResultsWindowComponent implements OnInit {
  @Input() AllinResults;
  @Input() ReadableResults;
  
  display = false;
  public results;
  public readableResults;
  public barInfo = {
    earningsGrowth: null,
    eps: null,
    epsSurprise: null,
    pb: null,
    pegRation: null,
    roe: null
  };

  public test =[

  ];

  constructor(private Router:Router) {

   }

  ngOnInit() {
  }
  ngOnChanges(){
    // this.AllinResults.subscribe(res =>{
    // this.display = true;
    // this.results = res;
    // console.log('got it', res)
    // })
    this.ReadableResults.subscribe( res =>{
      this.display = true;
      this.readableResults = res;
      console.log('got it', res)
    })
  };
  wipeResults(){
    this.results = null;
    this.display = false;
  }

}
