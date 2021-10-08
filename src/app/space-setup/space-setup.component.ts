import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
    selector: 'app-space-setup',
    templateUrl: './space-setup.component.html',
    styleUrls: ['./space-setup.component.scss']
})
export class SpaceSetupComponent implements OnInit {
    public activeTabIndex: number = 0;
    public floorPlans: any[] = [{
        fileName: 'FacilityA_FL1_09-01-2021',
        isUploaded: true,
        spaceCount: 500,
        legends: [
            { type: 'flexible', total: 12 },
            { type: 'blocked', total: 0 },
            { type: 'unassigned', total: 3 },
            { type: 'fixed', total: 485 }
        ],
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
        legends: [
            { type: 'flexible', total: 12 },
            { type: 'blocked', total: 0 },
            { type: 'fixed', total: 535 }
        ],
        changes: [{
            fileName: 'FacilityA_FL1_09-01-2020',
            removedCount: 52,
            addedCount: 4
        }],
        file: 'https://svg-storage-smtv2.s3.ap-southeast-1.amazonaws.com/floorplan_05f.svg'
    }];

    public sampleData: any[] = [
        {
            spaceId: '5.48A',
            floorplanid: '',
            spacefunction: '',
            spacetype: '',
            spacenum: '',
            spacetenant: '',
            spacestatus: 'flexible',
            spacegradelv1: '',
            spaceassignability: '',
            allowableweeklyschedule: '',
            seatutilizationtime: 2,
            daysavailability: 'sample',
            shiftstart: '',
            endstart: '',
            numofallowableproj: 2,
            numofallowableresource: 2,
            gaphours: 'sample',
        },
        {
            spaceId: '5.50D',
            floorplanid: '',
            spacefunction: '',
            spacetype: '',
            spacenum: '',
            spacetenant: '',
            spacestatus: 'fixed',
            spacegradelv1: '',
            spaceassignability: '',
            allowableweeklyschedule: '',
            seatutilizationtime: 2,
            daysavailability: 'sample',
            shiftstart: '',
            endstart: '',
            numofallowableproj: 2,
            numofallowableresource: 2,
            gaphours: 'sample'
        },
    ]

    public currentSpace: any = null;

    constructor() { }

    ngOnInit(): void {
    }

    public handleTabChange(index: number) {
        this.activeTabIndex = index;
    }

    public setCurrentSpace = (space: any): void => {
        console.log('space', space);
        this.currentSpace = space;
    }

    public clearCurrentSpace = (): void => {
        this.currentSpace = null;
    }

    onChangeSpaceStatus(value:any) {
        const status = value.target.value;
        if (status === 'spaceassignability') {
            this.floorPlans[0].legends = [
                { type: 'flexible', total: 12 },
                { type: 'blocked', total: 0 },
                { type: 'unassigned', total: 3 },
                { type: 'fixed', total: 485 }
            ]
        } else if(status === 'spacetenant') {
            this.floorPlans[0].legends = [
                { type: 'BPO', total: 12 },
                { type: 'TGP', total: 0 },
                { type: 'GS', total: 535 },
                { type: 'Blank', total: 535 }
            ]
        }else {
            this.floorPlans[0].legends = [
                { type: 'Occupied', total: 108 },
                { type: 'Vacant', total: 388 },
                { type: 'Offline', total: 4 },
            ]
        }
    }
}
