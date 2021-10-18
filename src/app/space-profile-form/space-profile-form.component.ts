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
  public activeFunction: string = '';
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
    {value: 'Vacant', label: 'Vacant'},
    {value: 'Offline', label: 'Offline'},
  ];

  gradeLevel: any[] = [
    {value: 'As_Designed', label: 'As Designed'},
    {value: 'Compressed', label: 'Compressed'},
    {value: 'Partition_Loss', label: 'Partition Loss'},
  ];

  tenants: any[] = [
    {value: 'blank', label: 'Blank'},
    {value: 'bpo', label: 'BPO'},
    {value: 'tgp', label: 'TGP'},
    {value: 'gs', label: 'GS'},
  ];

  assignability: string[] = ['Fixed', 'Flexible', 'Blocked'];
  week: string[] = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

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

  public formData: any = {
    "spaceid": 0,
    "floorplanid": 0,
    "spacefunction": '',
    "spacetype": '',
    "spacenum": '',
    "spacetenant": '',
    "spacestatus": '',
    "spacegradelvl": '',
    "spaceassignability": '',
    "allowableweeklyschedule": '',
    "seatutilizationtime": '',
    "daysavailability": [],
    "shiftstart": '',
    "endstart": '',
    "numofallowableproj": 0,
    "numofallowableresource": 0,
    "gaphours": 0,
    "svgid": "svg1380"
  }


  constructor(public fb: FormBuilder) { }

  ngOnInit() {
   
  }

  onSubmit() {
    alert(JSON.stringify(this.spaceForm.value))
  }

  public handleFunctionChange(value: string) {
    this.formData.spacefunction = value;    
  }

  public handleSelectChange(e: any, key: string) {
    // this.spaceType.setValue(e.target.value, {
    //   test: true
    // })
    console.log(e.target.value)
    if (key === 'spacetype' && !this.formData[key]) {
      this.formData = {
        ...this.formData,
        spacetype: e.target.value,
        spacestatus: 'Vacant',
        spacetenant: 'Blank',
        spacegradelvl: 'As_Designed',
        spaceassignability: '',
        daysavailability: [0, 1, 2, 3, 4, 5, 6],
        shiftstart: '12:00 AM',
        endstart: '11:00 PM',
        numofallowableproj: 1,
        numofallowableresource: 1,
        gaphours: 0
      }
    } else {
      this.formData[key] = e.target.value
    }
  }

  public handleAssignability(value: string) {
    if (!this.formData.spacetype) return;

    this.formData.spaceassignability = value
  }

  public handleDaysAvailable(value: number) {
    if (!this.formData.spacetype) return;

    const index = this.formData.daysavailability.findIndex((v: any) => value === v);

    if (index !== -1) {
      const updated = this.formData.daysavailability;

      updated.splice(index, 1)

      this.formData.daysavailability = updated
    } else {
      this.formData.daysavailability.push(value);
    }
  }

  public handleChangeNumberInput(value: number, key: string) {
    if (isNaN(value)) {
      return;
    }
    this.formData[key] = value;

    console.log(this.formData)
  }
}

const dummy = [
  {
    "spaceid": 0,
    "floorplanid": 0,
    "spacefunction": "Room",
    "spacetype": "A",
    "spacenum": "5.84H",
    "spacetenant": "GS",
    "spacestatus": "Vacant",
    "spacegradelvl": "Partition_Loss",
    "spaceassignability": "Blocked",
    "allowableweeklyschedule": "",
    "seatutilizationtime": "",
    "daysavailability": [
      5,
      6,
      1
    ],
    "shiftstart": "",
    "endstart": "",
    "numofallowableproj": 5,
    "numofallowableresource": 5,
    "gaphours": 0,
    "svgid": "svg1380"
  },
  {
    "spaceid": 1,
    "floorplanid": 1,
    "spacefunction": "Production",
    "spacetype": "D",
    "spacenum": "5.81A",
    "spacetenant": "TGP",
    "spacestatus": "Offline",
    "spacegradelvl": "Partition_Loss",
    "spaceassignability": "Fixed",
    "allowableweeklyschedule": "",
    "seatutilizationtime": "",
    "daysavailability": [
      1,
      4,
      5,
      0
    ],
    "shiftstart": "",
    "endstart": "",
    "numofallowableproj": 5,
    "numofallowableresource": 5,
    "gaphours": 0,
    "svgid": "svg1380"
  },
  {
    "spaceid": 2,
    "floorplanid": 2,
    "spacefunction": "Room",
    "spacetype": "C",
    "spacenum": "5.81D",
    "spacetenant": "BPO",
    "spacestatus": "Offline",
    "spacegradelvl": "Partition_Loss",
    "spaceassignability": "Fixed",
    "allowableweeklyschedule": "",
    "seatutilizationtime": "",
    "daysavailability": [
      4,
      3,
      5
    ],
    "shiftstart": "",
    "endstart": "",
    "numofallowableproj": 5,
    "numofallowableresource": 5,
    "gaphours": 0,
    "svgid": "svg1380"
  },
  {
    "spaceid": 3,
    "floorplanid": 3,
    "spacefunction": "Room",
    "spacetype": "D",
    "spacenum": "5.78A",
    "spacetenant": "BPO",
    "spacestatus": "Offline",
    "spacegradelvl": "Compressed",
    "spaceassignability": "Blocked",
    "allowableweeklyschedule": "",
    "seatutilizationtime": "",
    "daysavailability": [
      6,
      1,
      3,
      2,
      4
    ],
    "shiftstart": "",
    "endstart": "",
    "numofallowableproj": 5,
    "numofallowableresource": 5,
    "gaphours": 0,
    "svgid": "svg1380"
  },
  {
    "spaceid": 4,
    "floorplanid": 4,
    "spacefunction": "Production",
    "spacetype": "B",
    "spacenum": "5.76B",
    "spacetenant": "GS",
    "spacestatus": "Vacant",
    "spacegradelvl": "As_Designed",
    "spaceassignability": "Blocked",
    "allowableweeklyschedule": "",
    "seatutilizationtime": "",
    "daysavailability": [
      1,
      3,
      5
    ],
    "shiftstart": "",
    "endstart": "",
    "numofallowableproj": 5,
    "numofallowableresource": 5,
    "gaphours": 0,
    "svgid": "svg1380"
  },
  {
    "spaceid": 5,
    "floorplanid": 5,
    "spacefunction": "Production",
    "spacetype": "C",
    "spacenum": "5.74D",
    "spacetenant": "TGP",
    "spacestatus": "Offline",
    "spacegradelvl": "As_Designed",
    "spaceassignability": "Blocked",
    "allowableweeklyschedule": "",
    "seatutilizationtime": "",
    "daysavailability": [
      4,
      0,
      3,
      2,
      5
    ],
    "shiftstart": "",
    "endstart": "",
    "numofallowableproj": 5,
    "numofallowableresource": 5,
    "gaphours": 0,
    "svgid": "svg1380"
  },
  {
    "spaceid": 6,
    "floorplanid": 6,
    "spacefunction": "Production",
    "spacetype": "B",
    "spacenum": "5.72A",
    "spacetenant": "BPO",
    "spacestatus": "Offline",
    "spacegradelvl": "As_Designed",
    "spaceassignability": "Flexible",
    "allowableweeklyschedule": "",
    "seatutilizationtime": "",
    "daysavailability": [
      1,
      5,
      3,
      0
    ],
    "shiftstart": "",
    "endstart": "",
    "numofallowableproj": 5,
    "numofallowableresource": 5,
    "gaphours": 0,
    "svgid": "svg1380"
  },
  {
    "spaceid": 7,
    "floorplanid": 7,
    "spacefunction": "Room",
    "spacetype": "A",
    "spacenum": "5.68C",
    "spacetenant": "TGP",
    "spacestatus": "Offline",
    "spacegradelvl": "Partition_Loss",
    "spaceassignability": "Fixed",
    "allowableweeklyschedule": "",
    "seatutilizationtime": "",
    "daysavailability": [
      2,
      3,
      5,
      4,
      0
    ],
    "shiftstart": "",
    "endstart": "",
    "numofallowableproj": 5,
    "numofallowableresource": 5,
    "gaphours": 0,
    "svgid": "svg1380"
  },
  {
    "spaceid": 8,
    "floorplanid": 8,
    "spacefunction": "Room",
    "spacetype": "D",
    "spacenum": "5.68H",
    "spacetenant": "Blank",
    "spacestatus": "Offline",
    "spacegradelvl": "As_Designed",
    "spaceassignability": "Fixed",
    "allowableweeklyschedule": "",
    "seatutilizationtime": "",
    "daysavailability": [
      0,
      2,
      4
    ],
    "shiftstart": "",
    "endstart": "",
    "numofallowableproj": 5,
    "numofallowableresource": 5,
    "gaphours": 0,
    "svgid": "svg1380"
  },
  {
    "spaceid": 9,
    "floorplanid": 9,
    "spacefunction": "Production",
    "spacetype": "D",
    "spacenum": "5.65C",
    "spacetenant": "BPO",
    "spacestatus": "Offline",
    "spacegradelvl": "Partition_Loss",
    "spaceassignability": "Flexible",
    "allowableweeklyschedule": "",
    "seatutilizationtime": "",
    "daysavailability": [
      4,
      0,
      1,
      6
    ],
    "shiftstart": "",
    "endstart": "",
    "numofallowableproj": 5,
    "numofallowableresource": 5,
    "gaphours": 0,
    "svgid": "svg1380"
  },
  {
    "spaceid": 10,
    "floorplanid": 10,
    "spacefunction": "Production",
    "spacetype": "C",
    "spacenum": "5.91C",
    "spacetenant": "GS",
    "spacestatus": "Vacant",
    "spacegradelvl": "Compressed",
    "spaceassignability": "Flexible",
    "allowableweeklyschedule": "",
    "seatutilizationtime": "",
    "daysavailability": [
      5,
      0,
      4,
      6
    ],
    "shiftstart": "",
    "endstart": "",
    "numofallowableproj": 5,
    "numofallowableresource": 5,
    "gaphours": 0,
    "svgid": "svg1380"
  },
  {
    "spaceid": 11,
    "floorplanid": 11,
    "spacefunction": "Room",
    "spacetype": "D",
    "spacenum": "5.82D",
    "spacetenant": "GS",
    "spacestatus": "Offline",
    "spacegradelvl": "As_Designed",
    "spaceassignability": "Blocked",
    "allowableweeklyschedule": "",
    "seatutilizationtime": "",
    "daysavailability": [
      5,
      2,
      3
    ],
    "shiftstart": "",
    "endstart": "",
    "numofallowableproj": 5,
    "numofallowableresource": 5,
    "gaphours": 0,
    "svgid": "svg1380"
  },
  {
    "spaceid": 12,
    "floorplanid": 12,
    "spacefunction": "Room",
    "spacetype": "C",
    "spacenum": "5.79C",
    "spacetenant": "Blank",
    "spacestatus": "Vacant",
    "spacegradelvl": "Compressed",
    "spaceassignability": "Blocked",
    "allowableweeklyschedule": "",
    "seatutilizationtime": "",
    "daysavailability": [
      3,
      2,
      1
    ],
    "shiftstart": "",
    "endstart": "",
    "numofallowableproj": 5,
    "numofallowableresource": 5,
    "gaphours": 0,
    "svgid": "svg1380"
  },
  {
    "spaceid": 13,
    "floorplanid": 13,
    "spacefunction": "Production",
    "spacetype": "B",
    "spacenum":  "5.79E",
    "spacetenant": "TGP",
    "spacestatus": "Vacant",
    "spacegradelvl": "Partition_Loss",
    "spaceassignability": "Fixed",
    "allowableweeklyschedule": "",
    "seatutilizationtime": "",
    "daysavailability": [
      0,
      4,
      1,
      6,
      3
    ],
    "shiftstart": "",
    "endstart": "",
    "numofallowableproj": 5,
    "numofallowableresource": 5,
    "gaphours": 0,
    "svgid": "svg1380"
  },
  {
    "spaceid": 14,
    "floorplanid": 14,
    "spacefunction": "Room",
    "spacetype": "D",
    "spacenum":  "5.77A",
    "spacetenant": "Blank",
    "spacestatus": "Vacant",
    "spacegradelvl": "Partition_Loss",
    "spaceassignability": "Flexible",
    "allowableweeklyschedule": "",
    "seatutilizationtime": "",
    "daysavailability": [
      1,
      3,
      5
    ],
    "shiftstart": "",
    "endstart": "",
    "numofallowableproj": 5,
    "numofallowableresource": 5,
    "gaphours": 0,
    "svgid": "svg1380"
  },
  {
    "spaceid": 15,
    "floorplanid": 15,
    "spacefunction": "Room",
    "spacetype": "D",
    "spacenum":  "5.77B",
    "spacetenant": "GS",
    "spacestatus": "Offline",
    "spacegradelvl": "Compressed",
    "spaceassignability": "Blocked",
    "allowableweeklyschedule": "",
    "seatutilizationtime": "",
    "daysavailability": [
      2,
      6,
      1
    ],
    "shiftstart": "",
    "endstart": "",
    "numofallowableproj": 5,
    "numofallowableresource": 5,
    "gaphours": 0,
    "svgid": "svg1380"
  },
  {
    "spaceid": 16,
    "floorplanid": 16,
    "spacefunction": "Production",
    "spacetype": "B",
    "spacenum":  "5.77C",
    "spacetenant": "GS",
    "spacestatus": "Vacant",
    "spacegradelvl": "As_Designed",
    "spaceassignability": "Blocked",
    "allowableweeklyschedule": "",
    "seatutilizationtime": "",
    "daysavailability": [
      4,
      5,
      3
    ],
    "shiftstart": "",
    "endstart": "",
    "numofallowableproj": 5,
    "numofallowableresource": 5,
    "gaphours": 0,
    "svgid": "svg1380"
  },
  {
    "spaceid": 17,
    "floorplanid": 17,
    "spacefunction": "Production",
    "spacetype": "A",
    "spacenum":  "5.77D",
    "spacetenant": "TGP",
    "spacestatus": "Offline",
    "spacegradelvl": "Partition_Loss",
    "spaceassignability": "Fixed",
    "allowableweeklyschedule": "",
    "seatutilizationtime": "",
    "daysavailability": [
      3,
      5,
      6,
      2,
      1
    ],
    "shiftstart": "",
    "endstart": "",
    "numofallowableproj": 5,
    "numofallowableresource": 5,
    "gaphours": 0,
    "svgid": "svg1380"
  },
  {
    "spaceid": 18,
    "floorplanid": 18,
    "spacefunction": "Room",
    "spacetype": "B",
    "spacenum":  "5.77E",
    "spacetenant": "Blank",
    "spacestatus": "Offline",
    "spacegradelvl": "Partition_Loss",
    "spaceassignability": "Blocked",
    "allowableweeklyschedule": "",
    "seatutilizationtime": "",
    "daysavailability": [
      1,
      5,
      4,
      2
    ],
    "shiftstart": "",
    "endstart": "",
    "numofallowableproj": 5,
    "numofallowableresource": 5,
    "gaphours": 0,
    "svgid": "svg1380"
  },
  {
    "spaceid": 19,
    "floorplanid": 19,
    "spacefunction": "Production",
    "spacetype": "C",
    "spacenum":  "5.75A",
    "spacetenant": "Blank",
    "spacestatus": "Vacant",
    "spacegradelvl": "As_Designed",
    "spaceassignability": "Fixed",
    "allowableweeklyschedule": "",
    "seatutilizationtime": "",
    "daysavailability": [
      0,
      5,
      6,
      3
    ],
    "shiftstart": "",
    "endstart": "",
    "numofallowableproj": 5,
    "numofallowableresource": 5,
    "gaphours": 0,
    "svgid": "svg1380"
  },
  {
    "spaceid": 20,
    "floorplanid": 20,
    "spacefunction": "Production",
    "spacetype": "D",
    "spacenum":  "5.75B",
    "spacetenant": "BPO",
    "spacestatus": "Offline",
    "spacegradelvl": "Compressed",
    "spaceassignability": "Fixed",
    "allowableweeklyschedule": "",
    "seatutilizationtime": "",
    "daysavailability": [
      1,
      0
    ],
    "shiftstart": "",
    "endstart": "",
    "numofallowableproj": 5,
    "numofallowableresource": 5,
    "gaphours": 0,
    "svgid": "svg1380"
  },
  {
    "spaceid": 21,
    "floorplanid": 21,
    "spacefunction": "Room",
    "spacetype": "A",
    "spacenum":  "5.75C",
    "spacetenant": "Blank",
    "spacestatus": "Offline",
    "spacegradelvl": "Partition_Loss",
    "spaceassignability": "Flexible",
    "allowableweeklyschedule": "",
    "seatutilizationtime": "",
    "daysavailability": [
      3,
      5,
      2,
      4,
      0,
      1,
      6
    ],
    "shiftstart": "",
    "endstart": "",
    "numofallowableproj": 5,
    "numofallowableresource": 5,
    "gaphours": 0,
    "svgid": "svg1380"
  },
  {
    "spaceid": 22,
    "floorplanid": 22,
    "spacefunction": "Room",
    "spacetype": "C",
    "spacenum":  "5.75D",
    "spacetenant": "TGP",
    "spacestatus": "Vacant",
    "spacegradelvl": "Partition_Loss",
    "spaceassignability": "Blocked",
    "allowableweeklyschedule": "",
    "seatutilizationtime": "",
    "daysavailability": [
      1,
      0,
      3
    ],
    "shiftstart": "",
    "endstart": "",
    "numofallowableproj": 5,
    "numofallowableresource": 5,
    "gaphours": 0,
    "svgid": "svg1380"
  },
  {
    "spaceid": 23,
    "floorplanid": 23,
    "spacefunction": "Production",
    "spacetype": "D",
    "spacenum":  "5.73A",
    "spacetenant": "Blank",
    "spacestatus": "Vacant",
    "spacegradelvl": "Partition_Loss",
    "spaceassignability": "Blocked",
    "allowableweeklyschedule": "",
    "seatutilizationtime": "",
    "daysavailability": [
      5,
      1,
      2,
      1
    ],
    "shiftstart": "",
    "endstart": "",
    "numofallowableproj": 5,
    "numofallowableresource": 5,
    "gaphours": 0,
    "svgid": "svg1380"
  },
  {
    "spaceid": 24,
    "floorplanid": 24,
    "spacefunction": "Room",
    "spacetype": "B",
    "spacenum":  "5.73B",
    "spacetenant": "TGP",
    "spacestatus": "Offline",
    "spacegradelvl": "Compressed",
    "spaceassignability": "Flexible",
    "allowableweeklyschedule": "",
    "seatutilizationtime": "",
    "daysavailability": [
      2,
      4,
      3,
      0,
      1
    ],
    "shiftstart": "",
    "endstart": "",
    "numofallowableproj": 5,
    "numofallowableresource": 5,
    "gaphours": 0,
    "svgid": "svg1380"
  },
  {
    "spaceid": 25,
    "floorplanid": 25,
    "spacefunction": "Room",
    "spacetype": "B",
    "spacenum":  "5.73C",
    "spacetenant": "Blank",
    "spacestatus": "Vacant",
    "spacegradelvl": "Compressed",
    "spaceassignability": "Flexible",
    "allowableweeklyschedule": "",
    "seatutilizationtime": "",
    "daysavailability": [
      5,
      1
    ],
    "shiftstart": "",
    "endstart": "",
    "numofallowableproj": 5,
    "numofallowableresource": 5,
    "gaphours": 0,
    "svgid": "svg1380"
  },
  {
    "spaceid": 26,
    "floorplanid": 26,
    "spacefunction": "Room",
    "spacetype": "B",
    "spacenum":  "5.73D",
    "spacetenant": "Blank",
    "spacestatus": "Offline",
    "spacegradelvl": "As_Designed",
    "spaceassignability": "Fixed",
    "allowableweeklyschedule": "",
    "seatutilizationtime": "",
    "daysavailability": [
      0,
      4,
      2
    ],
    "shiftstart": "",
    "endstart": "",
    "numofallowableproj": 5,
    "numofallowableresource": 5,
    "gaphours": 0,
    "svgid": "svg1380"
  },
  {
    "spaceid": 27,
    "floorplanid": 27,
    "spacefunction": "Room",
    "spacetype": "B",
    "spacenum":  "5.73E",
    "spacetenant": "TGP",
    "spacestatus": "Offline",
    "spacegradelvl": "As_Designed",
    "spaceassignability": "Blocked",
    "allowableweeklyschedule": "",
    "seatutilizationtime": "",
    "daysavailability": [
      6,
      0,
      5,
      3
    ],
    "shiftstart": "",
    "endstart": "",
    "numofallowableproj": 5,
    "numofallowableresource": 5,
    "gaphours": 0,
    "svgid": "svg1380"
  },
  {
    "spaceid": 28,
    "floorplanid": 28,
    "spacefunction": "Production",
    "spacetype": "D",
    "spacenum":  "5.73F",
    "spacetenant": "Blank",
    "spacestatus": "Offline",
    "spacegradelvl": "Partition_Loss",
    "spaceassignability": "Fixed",
    "allowableweeklyschedule": "",
    "seatutilizationtime": "",
    "daysavailability": [
      1,
      6,
      0
    ],
    "shiftstart": "",
    "endstart": "",
    "numofallowableproj": 5,
    "numofallowableresource": 5,
    "gaphours": 0,
    "svgid": "svg1380"
  },
  {
    "spaceid": 29,
    "floorplanid": 29,
    "spacefunction": "Production",
    "spacetype": "B",
    "spacenum":  "5.71A",
    "spacetenant": "Blank",
    "spacestatus": "Offline",
    "spacegradelvl": "Partition_Loss",
    "spaceassignability": "Blocked",
    "allowableweeklyschedule": "",
    "seatutilizationtime": "",
    "daysavailability": [
      5,
      3
    ],
    "shiftstart": "",
    "endstart": "",
    "numofallowableproj": 5,
    "numofallowableresource": 5,
    "gaphours": 0,
    "svgid": "svg1380"
  }
]