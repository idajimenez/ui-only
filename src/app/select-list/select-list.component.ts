import { Component, Input, OnInit, SimpleChanges, OnChanges } from '@angular/core';

@Component({
  selector: 'select-list',
  templateUrl: './select-list.component.html',
  styleUrls: ['./select-list.component.scss']
})
export class SelectListComponent implements OnInit, OnChanges {
  @Input() type: string = '';
  @Input() options: any[] = [];
  @Input() handleAdd: ((value: string, type: string) => void) | undefined;
  @Input() isDisabled: boolean = true;
  @Input() parent?: string = '';
  @Input() setSelectedLocation: ((value: string, type: string) => void) | undefined;
  @Input() selected?: string = '';

  public newEntry: string = '';
  public isExisting: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.disabled) {
      this.newEntry = ' ';
      this.isExisting = false;
    }
  }

  public handleChange = (e: any) => {
    this.isExisting = false;
    this.newEntry = e.target.value
  }

  sendNewEntry() {
    console.log(this.options);
    if (this.options.indexOf(this.newEntry) === -1) {
      this.handleAdd!(this.newEntry, this.type);
      this.newEntry = '';
    } else {
      this.isExisting = true;
    }
  }

  handleSelectItem(value: string) {
    this.setSelectedLocation!(value, this.type);
  }
}
