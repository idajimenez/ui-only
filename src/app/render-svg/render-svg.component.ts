import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-render-svg',
    templateUrl: './render-svg.component.html',
    styleUrls: ['./render-svg.component.scss']
})
export class RenderSvgComponent implements OnInit {
    @Input() callbackFunction: ((space: any) => void) | undefined;
    @Input() setSpaceCount: ((count: number) => void) | undefined;
    @Input() url: string = 'https://svg-storage-smtv2.s3.ap-southeast-1.amazonaws.com/floorplan_05f.svg';

    public selectedItems: any[] = [];
    public selectedDocuments: any[] = [];

    public isDownloadingSvg: boolean = true;
    public isDownloadError: boolean = false;

    constructor() { }

    ngOnInit(): void {
        this.downloadSvg();
        console.log(this.callbackFunction)
    }

    public async downloadSvg() {
        try {
            const svgString = await fetch(this.url).then(resp => resp.text());
            this.setupSvgElements(svgString);

            this.isDownloadingSvg = false;
        } catch (err) {
            this.isDownloadError = true;
            this.isDownloadingSvg = false;
        }
    }

    public setupSvgElements(svgString: string) {
        const el = document!.getElementById('svg')!
        el.innerHTML = svgString;

        const rect = el.querySelectorAll('rect');

        this.setSpaceCount!(rect.length);
        rect.forEach(item => {
            // General styles
            item.style.cursor = 'pointer';

            // Styles based on status
            item.style.fill = '#A100FF';

            item.addEventListener('click', this.onItemClick.bind(this))
        })
    }

    public onItemClick(e: any) {
        this.callbackFunction!(e.target.id);
    }

    public someMethod(){

    }
}
