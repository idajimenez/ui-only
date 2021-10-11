import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
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
  public spaceForm = this.fb.group({
    spaceType: ['']
  })

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

  tenants: any[] = [
    {value: 'blank', label: 'Blank'},
    {value: 'bpo', label: 'BPO'},
    {value: 'tgp', label: 'TGP'},
    {value: 'gs', label: 'GS'},
  ];

  shifts: any[] = [
    {value: '12:00 AM', label: '12:00 AM'},
    {value: '1:00 AM', label: '1:00 AM'},
    {value: '2:00 AM', label: '2:00 AM'},
    {value: '3:00 AM', label: '3:00 AM'},
    {value: '4:00 AM', label: '4:00 AM'},
    {value: '5:00 AM', label: '5:00 AM'},
    {value: '6:00 AM', label: '6:00 AM'},
    {value: '7:00 AM', label: '7:00 AM'},
    {value: '8:00 AM', label: '8:00 AM'},
    {value: '9:00 AM', label: '9:00 AM'},
    {value: '10:00 AM', label: '10:00 AM'},
    {value: '11:00 AM', label: '11:00 AM'},
    {value: '12:00 PM', label: '12:00 PM'},
    {value: '1:00 PM', label: '1:00 PM'},
    {value: '2:00 PM', label: '2:00 PM'},
    {value: '3:00 PM', label: '3:00 PM'},
    {value: '4:00 PM', label: '4:00 PM'},
    {value: '5:00 PM', label: '5:00 PM'},
    {value: '6:00 PM', label: '6:00 PM'},
    {value: '7:00 PM', label: '7:00 PM'},
    {value: '8:00 PM', label: '8:00 PM'},
    {value: '9:00 PM', label: '9:00 PM'},
    {value: '10:00 PM', label: '10:00 PM'},
    {value: '11:00 PM', label: '11:00 PM'},
  ];


  constructor(public fb: FormBuilder) { }

  ngOnInit() {
   
  }

  onSubmit() {
    alert(JSON.stringify(this.spaceForm.value))
  }

  public handleFunctionChange(index: number) {
    this.activeFunctionIndex = index;
  }

  public changeSpace(e: any) {
    // this.spaceType.setValue(e.target.value, {
    //   test: true
    // })
    console.log(e.target.value)
  }


  public handleSpaceType($event:any){
    console.log($event); 
      // this.selectedSpaceType = param;
  }

}
