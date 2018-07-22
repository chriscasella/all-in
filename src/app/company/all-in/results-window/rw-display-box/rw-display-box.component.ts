import { Component, OnInit, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'app-rw-display-box',
  templateUrl: './rw-display-box.component.html',
  styleUrls: ['./rw-display-box.component.scss']
})
export class RwDisplayBoxComponent implements OnInit, OnChanges {
  public @Input() display:string;
  public @Input() bool:boolean;
  public @Input() value:any;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(){

  }
}
