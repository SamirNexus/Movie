import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-mediaitem',
  templateUrl: './mediaitem.component.html',
  styleUrls: ['./mediaitem.component.css']
})
export class MediaitemComponent implements OnInit {

  @Input() item:any;
  constructor() { }

  ngOnInit(): void {
  }

}
