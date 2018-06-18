import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-info-card',
  templateUrl: './info-card.component.html',
  styleUrls: ['./info-card.component.scss']
})
export class InfoCardComponent implements OnInit, OnChanges {
@Input() data;
@Input() InfoCardClass;
title;
text1;
text2;

  constructor() { }

  ngOnInit() {
  }
  
  ngOnChanges(){
    this.data.subscribe(res =>{
      this.title = res.title;
      this.text1 = res.text1;
      this.text2 = res.text2;
      console.log(res);
    })
  }
}
