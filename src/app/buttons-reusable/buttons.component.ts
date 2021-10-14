import { Component,Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'aio-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: [('./buttons.component.scss')]
})
export class ButtonsComponent implements OnInit {
  @Input() titleData : string | undefined
  @Input() itemData: any[] | undefined
  // @Input() handleClick!: ((args: any) => void) ;
  @Output() handleClick = new EventEmitter<string>();
  // @Input() typeData : string | undefined

  public toggleHover: boolean=false;
  public title: string = "Select";
  public type: string = "button";
  constructor() { }

  items:any=['one','two','three']

  ngOnInit() {
    this.getInputType()
  }

  getInputType() {
    this.titleData = this.titleData ? this.titleData : this.title;
    this.itemData = this.itemData ? this.itemData : this.items;
  }

  onClick(value: any) { 
    console.log('v')
    this.handleClick.emit(value.value)
  }

}
