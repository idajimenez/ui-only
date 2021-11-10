import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'select-list',
  templateUrl: './select-list.component.html',
  styleUrls: ['./select-list.component.scss']
})
export class SelectListComponent implements OnInit {
  @Input() type: string = '';
  @Input() options: any[] = [];
  @Input() handleAdd: ((value: string, type: string) => void) | undefined;

  public newEntry: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  handleChange(e: any) {
    this.newEntry = e.target.value
  }

  sendNewEntry() {
    this.handleAdd!(this.newEntry, this.type);
  }
}
