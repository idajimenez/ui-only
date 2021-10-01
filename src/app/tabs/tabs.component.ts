import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'custom-tab',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {
  @Input() items: any[] = [];

  public activeIndex: number = 0;

  constructor() { }

  ngOnInit() {
  }

  private getTabClass(i: number) {
    const isActive = this.activeIndex === i;
    return 'nav-link projDetailsLink' + (isActive ? ' active' : '');
  }

  public onClickTab(index: number) {
    console.log('click', index);
    this.activeIndex = index;
    console.log(this.activeIndex);
  }

}
