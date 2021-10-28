import { TestServicesService } from './../services/test-services.service';
import { Component, OnInit, ViewChild, Pipe } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CustomModalComponent } from '../custom-modal/custom-modal.component';
import { SpaceProfileFormComponent } from '../space-profile-form/space-profile-form.component';
import { Observable } from 'rxjs';

interface ILegend {
    [key: string]: {
        legend: { background: string, border?: string },
        count: number,
        isDefault?: boolean
    }
 }

@Component({
    selector: 'app-space-setup',
    templateUrl: './space-setup.component.html',
    styleUrls: ['./space-setup.component.scss']
})
export class SpaceSetupComponent implements OnInit {
    @ViewChild(SpaceProfileFormComponent) SpaceForm: any;

    public activeTabIndex: number = 0;
    public floorPlans: any[] = [{
        fileName: 'FacilityA_FL1_09-01-2021',
        isUploaded: true,
        spaceCount: 500,
        legends: [],
        changes: [{
            fileName: 'FacilityA_FL1_09-01-2021',
            removedCount: 50,
            addedCount: 3
        }],
        file: 'https://svg-storage-smtv2.s3.ap-southeast-1.amazonaws.com/floorplan_05f.svg'
    }, {
        fileName: 'FacilityA_FL1_09-01-2020',
        isUploaded: false,
        spaceCount: 547,
        legends: [],
        changes: [{
            fileName: 'FacilityA_FL1_09-01-2020',
            removedCount: 52,
            addedCount: 4
        }],
        file: 'https://svg-storage-smtv2.s3.ap-southeast-1.amazonaws.com/floorplan_05f.svg'
    }];

    // Existing Spaces
    public spaces: any[] = [];
    // New Spaces
    public newSpaces: any[] = [];

    public legendVisible: string = 'spaceassignability';
    public spaceCount: number = 0;
    public currentSpaces: string[] = [];
    public selectedSpaceNumber: string = '';
    public selectedSpace: object = {};

    public legendsConfig: {[key: string]: ILegend} = {
        spacetenant: {
            Blank: { legend: { background: '#CED4DA' }, count: 0, isDefault: true },
            BPO: { legend: { background: '#0275D8' }, count: 0 },
            TGP: { legend: { background: '#01D801' }, count: 0 },
            GS: { legend: { background: '#A100FF' }, count: 0 }
        },
        spacestatus: {
            Occupied: { legend: { background: '#E2E5DE' }, count: 0, isDefault: true },
            Vacant: { legend: { background: '#FFFFFF', border: '1px solid #A100FF' }, count: 0 },
            Offline: { legend: { background: '#E2E5DE' }, count: 0 },
        },
        spaceassignability: {
            Fixed: { legend: { background: '#1275D8' }, count: 0 },
            Flexible: { legend: { background: '#21D826' }, count: 0 },
            Blocked: { legend: { background: '#CED4DA' }, count: 0 },
            Unassigned: { legend: { background: '#FFFFFF', border: '1px solid #A100FF' }, count: 0, isDefault: true }
        }
    }
    public spaceForms: any = [];

    constructor(
      private dialog: MatDialog,
      private testService: TestServicesService
    ) { }

    ngOnInit(): void {
    }

    // !IMPORTANT
    // PASSDATA TO SERVICE BY CLICK FUNCTION OR ANY FUNCTION YOU LIKE
    addData() {
      let data = {
        isAdjacentEnabled: true
      }
      this.testService.passData(data);
    }
    // END

    public handleUpdateNewSpaces = (): void => {
      console.log('Data', this.spaceForms);
    }

    public setSpaceCount = (count: number): void => {
        this.spaceCount = count;
        this.countSpaces();
    }

    public countSpaces() {
        Object.keys(this.legendsConfig).forEach((key: any) => {
          const arrayWithStatus = Object.keys(this.legendsConfig[key]).filter((value: any) => !this.legendsConfig[key][value].isDefault);
          const status = Object.keys(this.legendsConfig[key]).reduce((value: any, currentValue) => {
            // console.log(`legends value =`, value, `and currentValue = `, currentValue)
              value[currentValue] = {
                  ...this.legendsConfig[key][currentValue],
                  count: /Unassigned|Occupied|Blank/.test(currentValue)
                      ? this.spaceCount - (this.spaces.filter((data: any) => {
                          console.log(`spaces data =`, data[key]);
                          const index = arrayWithStatus.findIndex(status => status === data[key]) + 1; //added new + 1
                          console.log(`index = ${index}`);
                          return index;
                      }).length) || 0
                      : this.spaces.filter((data: any) => data[key] === currentValue).length || 0
              }
              return value;
          }, {});

          this.legendsConfig[key] = status;
      })
    }

    public handleTabChange(index: number) {
        this.activeTabIndex = index;
    }

    public setCurrentSpaces = (space: any, isMultiple?: boolean): void => {
        if (isMultiple) {
            if (this.currentSpaces.includes(space)) {
                const index = this.currentSpaces.findIndex((item) => item === space);
                this.currentSpaces.splice(index, 1);
            } else {
                this.currentSpaces.push(space);
            }
        } else {
          // Pass found space to this.selectedSpace variable
            this.selectedSpace = this.spaces.find(s => s.spacenum == space)
            this.currentSpaces = [space];
        }

        console.log(this.currentSpaces)
        this.selectedSpaceNumber = space;
    }

    public clearCurrentSpaces = (): void => {
        this.currentSpaces = [];
        this.selectedSpaceNumber = '';
    }

    onChangeSpaceStatus(e:any) {
        this.legendVisible = e.target.value;
    }

    public getSpaceForms(data: any) {
      console.log(`Space Forms`, data);
      const fileName = `FacilityA_FL1_09-01-202`;

      let newFileName = fileName.slice(0, (fileName.length - 10));

      data.filter((item: any) => {
        item.spaceid = `${newFileName}_${item.spacenum}`
      });

      this.spaceForms = data;

      console.log(this.spaceForms);
    }

    public getSpaceProfiles() {
      this.spaces = dummy
    }

    public saveChanges() {
      console.log(`spaceForms`, this.spaceForms);

      this.spaceForms.filter((item: any) => this.spaces.push(item));
      console.log(`New spaces =`, this.spaces);
      this.countSpaces();
      this.clearCurrentSpaces();
    }

    viewLegends() {
      this.dialog.open(CustomModalComponent)
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
    }
  ]
