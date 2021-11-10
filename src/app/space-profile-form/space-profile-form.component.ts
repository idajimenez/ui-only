import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { SpaceService } from '../services/space-services.service';

interface Types {
  value: string;
  viewValue: string;
}

const defaultValues = {
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
  "svgid": ""
}
@Component({
  selector: 'app-space-profile-form',
  templateUrl: './space-profile-form.component.html',
  styleUrls: ['./space-profile-form.component.scss']
})
export class SpaceProfileFormComponent implements OnInit {
  @Input() currentSpaces: any[] = [];

  selectedValue: string = '';
  public activeFunction: string = '';
  public selectedSpaceType: any;
  public selectedSpaceIndex: number | undefined;

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
    {value: 'Blank', label: 'Blank'},
    {value: 'BPO', label: 'BPO'},
    {value: 'TGP', label: 'TGP'},
    {value: 'GS', label: 'GS'},
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
  
  public newSpaces: any[] = [];
  public formData: any = defaultValues;
  public shouldClearForm: boolean = false;
  public adjacentSpaceData: any = {
    isAdjacentEnabled: false,
    spaces: []
  };
  public allAdjacentSpaces: any = [];

  constructor(public spaceService: SpaceService) { }

  ngOnInit() {
    this.spaceService.liveAutoRefresh().subscribe(() => {
      this.getData();
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.currentSpaces) {
        this.shouldClearForm = true;

        console.log(changes.currentSpaces.currentValue)

        // Dito dapat makuha niya lahat ng selected
        const currentSelectedSpaces = changes.currentSpaces.currentValue;
        const existingSpaces = this.newSpaces.filter((value: any) => currentSelectedSpaces.indexOf(value.spacenum) !== -1);

        if (existingSpaces.length) {
            this.formData = this.newSpaces[0];
        } else {
            const selected = currentSelectedSpaces.map((num: string) => ({
                ...defaultValues,
                spacenum: num
            }))
            console.log('selected', selected);

            this.newSpaces = [
                ...this.newSpaces,
                ...selected
            ];
            this.formData = selected[0];
        }
        console.log(this.newSpaces, this.formData)
        
        setTimeout(() => {
            this.shouldClearForm = false;
        }, 300);
    }
  }

  async getData() {
    let data = await this.spaceService.tempData;
    console.log(data);
    this.adjacentSpaceData = data;
  }

  enableAdjacentSpace(isAdjacentEnabled: boolean) {
    if (this.currentSpaces.length > 1) {
      return;
    }

    if (!isAdjacentEnabled) {

    }
    this.spaceService.passData({ isAdjacentEnabled });
  }

  updateNewSpaces = () => {
    const selected = this.currentSpaces.map((num: string) => ({
        ...this.formData,
        spacenum: num
    }))

    this.newSpaces = this.newSpaces.map((newSpace) => {
        if (this.currentSpaces.indexOf(newSpace.spacenum) !== -1) {
            return ({...this.formData, spacenum: newSpace.spacenum });
        } else {
            return newSpace;
        }
    })
  }

  public handleFunctionChange(value: string) {
    this.formData.spacefunction = value;

    this.updateNewSpaces();
  }

  public handleSelectChange = (e: any, key: string) => {
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

    this.updateNewSpaces();
  }

  public handleAssignability = (value: string) => {
    if (!this.formData.spacetype) return;

    this.formData.spaceassignability = value;

    this.updateNewSpaces()
  }

  public handleDaysAvailable = (value: number) => {
    if (!this.formData.spacetype) return;

    const index = this.formData.daysavailability.findIndex((v: any) => value === v);

    if (index !== -1) {
      const updated = this.formData.daysavailability;

      updated.splice(index, 1)

      this.formData.daysavailability = updated
    } else {
      this.formData.daysavailability.push(value);
    }

    this.updateNewSpaces();
  }

  public handleChangeNumberInput = (value: number, key: string) => {
    if (isNaN(value)) {
      return;
    }
    this.formData[key] = value;

    this.updateNewSpaces();
  }
}
