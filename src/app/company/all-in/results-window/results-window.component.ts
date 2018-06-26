import { Component, OnInit, OnChanges, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-results-window',
  templateUrl: './results-window.component.html',
  styleUrls: ['./results-window.component.scss']
})
export class ResultsWindowComponent implements OnInit {
  @Input() AllinResults;
  display = false;
  public results;
  constructor() { }

  ngOnInit() {
  }
  ngOnChanges(){
    this.AllinResults.subscribe(res =>{
    this.display = true;
    this.results = res;
    console.log('got it', res)
    })
  };


}
