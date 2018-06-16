import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit, OnChanges {
  @Input() company:null;
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(){
    console.log(this.company);
  }

}
