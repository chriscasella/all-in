import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-rw-display-box',
  templateUrl: './rw-display-box.component.html',
  styleUrls: ['./rw-display-box.component.scss']
})
export class RwDisplayBoxComponent implements OnInit {
 @Input() display;
 @Input() bool;
 @Input() value;

  constructor() { }

  ngOnInit() {
  }
}
