import { Component, OnInit, ViewChild, Pipe } from '@angular/core';
import { SpaceProfileFormComponent } from '../space-profile-form/space-profile-form.component';

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
    public spaces: any[] = dummy;
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

    constructor() { }

    ngOnInit(): void {
    }

    public handleUpdateNewSpaces = (): void => {
      console.log('Data', this.SpaceForm.formData)
    }

    public setSpaceCount = (count: number): void => {
        this.spaceCount = count;
        this.countSpaces();
    }

    private countSpaces() {
        Object.keys(this.legendsConfig).forEach((key: any) => {
            const arrayWithStatus = Object.keys(this.legendsConfig[key]).filter((value: any) => !this.legendsConfig[key][value].isDefault);
            const status = Object.keys(this.legendsConfig[key]).reduce((value: any, currentValue) => {
                value[currentValue] = {
                    ...this.legendsConfig[key][currentValue],
                    count: /Unassigned|Occupied|Blank/.test(currentValue)
                        ? this.spaceCount - (this.spaces.filter((data: any) => {
                            const index = arrayWithStatus.findIndex(status => status === data[key])
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
