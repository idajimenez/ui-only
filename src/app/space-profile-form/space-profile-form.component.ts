import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

interface Types {
  value: string;
  viewValue: string;
}

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-space-profile-form',
  templateUrl: './space-profile-form.component.html',
  styleUrls: ['./space-profile-form.component.scss']
})
export class SpaceProfileFormComponent implements OnInit {
  selectedValue: string = '';
  public activeFunctionIndex: any;
  public selectedSpaceType: any;

  public functions: any = [
    {
      label: 'Production',
      isActive: false,
    },
    {
      label: 'Room',
      isActive: false,
    },
  ];

  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];

  types: Types[] = [
    {value: 'typeA', viewValue: 'Room Type A'},
    {value: 'typeB', viewValue: 'Room Type B'},
    {value: 'typeC', viewValue: 'Room Type C'}
  ];

  spaceStatus: any[] = [
    {value: 'vacant', label: 'Vacant'},
    {value: 'offline', label: 'Offline'},
  ];

  gradeLevel: any[] = [
    {value: 'asdesigned', label: 'As Designed'},
    {value: 'compressed', label: 'Compressed'},
    {value: 'partitionloss', label: 'Partition Loss'},
  ];

  tenant: any[] = [
    {value: 'blank', label: 'Blank'},
    {value: 'bpo', label: 'BPO'},
    {value: 'tgp', label: 'TGP'},
    {value: 'gs', label: 'GS'},
  ];

  myForm: FormGroup | undefined;

  constructor() { }

  ngOnInit() {
   
  }

  public handleFunctionChange(index: number) {
    this.activeFunctionIndex = index;
  }


  public handleSpaceType($event:any){
    console.log($event); 
      // this.selectedSpaceType = param;
  }

}
