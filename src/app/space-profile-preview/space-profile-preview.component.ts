import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-space-profile-preview',
  templateUrl: './space-profile-preview.component.html',
  styleUrls: ['./space-profile-preview.component.scss']
})
export class SpaceProfilePreviewComponent implements OnInit {
  @Input() selectedSpace: any;

  constructor() { }

  ngOnInit(): void {
    console.log(this.selectedSpace)
  }

}
