import { Component, OnInit } from '@angular/core';

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
        file: 'https://cdn.shopify.com/s/files/1/0269/1435/t/1/assets/Freesample.png?21088'
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
        file: 'https://cdn.shopify.com/s/files/1/0269/1435/t/1/assets/Freesample.png?21088'
    }];

    constructor() { }

    ngOnInit(): void {
    }

    public handleTabChange(index: number) {
        console.log('tab', index)
        this.activeTabIndex = index;
    }

}
