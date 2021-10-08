import { Component,Input, OnInit } from '@angular/core';

@Component({
  selector: 'aio-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: [('./buttons.component.scss')]
})
export class ButtonsComponent implements OnInit {
    @Input() titleData : string | undefined
    @Input() itemData: any[] | undefined
    // @Input() typeData : string | undefined

    public toggleHover: boolean=false;
    public title: string = "no file selected";
    public type: string = "button";
  constructor() { }

    items:any=['one','two','three']
  ngOnInit() {
    this.getInputType()
  }

  getInputType() {
    this.titleData = this.titleData ? this.titleData : this.title;
    this.itemData = this.itemData ? this.itemData : this.items;
    console.log(this.itemData)
  }



}
