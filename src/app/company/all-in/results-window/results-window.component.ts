import { Component, OnInit, OnChanges, Input, EventEmitter } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { mdbIcon } from 'angular-bootstrap-md';

@Component({
  selector: 'app-results-window',
  templateUrl: './results-window.component.html',
  styleUrls: ['./results-window.component.scss']
})
export class ResultsWindowComponent implements OnInit {
  @Input() AllinResults;
  display = false;
  public results;

  public barInfo = {
    earningsGrowth: null,
    eps: null,
    epsSurprise: null,
    pb: null,
    pegRation: null,
    roe: null
  };

  constructor(private Router:Router) {

   }

  ngOnInit() {
  }
  ngOnChanges(){
    this.AllinResults.subscribe(res =>{
    this.display = true;
    this.results = res;
    console.log('got it', res)
    })
    this.Router.events.subscribe( (res) =>{
      console.log('HEYO!')
      this.wipeResults();
    });
  };
  wipeResults(){
    this.results = null;
    this.display = false;
  }

}
