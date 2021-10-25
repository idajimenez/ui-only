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
        file: 'https://svg-storage-smtv2.s3.ap-southeast-1.amazonaws.com/floorplan_05f.svg'
    }, {
        fileName: 'FacilityA_FL1_09-01-2020',
        isUploaded: false,
        spaceCount: 547,
        changes: [{
            fileName: 'FacilityA_FL1_09-01-2020',
            removedCount: 52,
            addedCount: 4
        }],
        file: 'https://svg-storage-smtv2.s3.ap-southeast-1.amazonaws.com/floorplan_05f.svg'
    }];
    public spaceCount: number = 0;
    public currentSpaces: any[] = [];
    items:any=['three','four','five']
    constructor() { }

    ngOnInit(): void {
    }

    public handleTabChange(index: number) {
        this.activeTabIndex = index;
    }

    public setCurrentSpace = (space: any): void => {
        console.log('space', space);
        this.currentSpaces = [space];
    }

    public clearCurrentSpace = (): void => {
        this.currentSpaces = [];
    }

    public setSpaceCount = (count: number): void => {
        this.spaceCount = count;
    }
}
