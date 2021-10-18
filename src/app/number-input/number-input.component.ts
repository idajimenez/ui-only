import { Component, Input, OnInit, Directive, HostListener } from '@angular/core';

@Component({
  selector: 'app-number-input',
  templateUrl: './number-input.component.html',
  styleUrls: ['./number-input.component.scss']
})

export class NumberInputComponent implements OnInit {
  @Input() value: number = 0;
  @Input() handleInputChange: ((value: number, key: string) => void) | undefined;
  @Input() dataKey: string = '';
  @Input() isDisabled: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  handleUpdateCount(type: string) {
    if (this.isDisabled || (this.value === 0 && type === 'dec')) {
      return;
    }

    if (type === 'inc') {
      this.value += 1;
    } else {
      this.value -= 1;
    }

    this.handleInputChange!(this.value, this.dataKey!);
  }

  handleChange(e: any) {
    if (isNaN(e.target.value)) {
      console.log('number only')
      return;
    }

    this.value = e.target.value
  }
}
