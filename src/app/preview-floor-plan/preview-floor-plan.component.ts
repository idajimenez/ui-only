import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-preview-floor-plan',
    templateUrl: './preview-floor-plan.component.html',
    styleUrls: ['./preview-floor-plan.component.scss']
})
export class PreviewFloorPlanComponent implements OnInit {
    public activeTabIndex: number = 0;
    public floorPlans: any[] = [{
        fileName: 'FacilityA_FL1_09-01-2021',
        isUploaded: true,
        spaceCount: 500,
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
