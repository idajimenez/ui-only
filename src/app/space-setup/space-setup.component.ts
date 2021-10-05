import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import axios from 'axios';

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
        file: 'https://cdn.shopify.com/s/files/1/0269/1435/t/1/assets/Freesample.png?21088'
    }];
    // public svgPreview: 

    constructor(private sanitizer: DomSanitizer) { }

    ngOnInit(): void {
        this.downloadSvg();
    }

    public async downloadSvg() {
        try {
            const svgString = await fetch('https://svg-storage-smtv2.s3.ap-southeast-1.amazonaws.com/floorplan_05f.svg').then(resp => {
                console.log(resp)
                return resp.text()
            });

            // this.sampleSVG =  svgString;
            // this.safeHtml = this.sanitizer.bypassSecurityTrustHtml(svgString)
            const el = document!.getElementById('svg')!
            el.innerHTML = svgString;
            
            const rect = el.querySelectorAll('rect');
            console.log(rect.length)
            rect.forEach(item => {
                item.style.fill = 'pink'
                item.style.cursor = 'pointer'
            })
        } catch (err) {
            console.log(err);
        }
    }

    public handleTabChange(index: number) {
        console.log('tab', index)
        this.activeTabIndex = index;
    }

}
