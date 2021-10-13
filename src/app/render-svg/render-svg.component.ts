declare var Snap: any;
declare var mina: any;


import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
// import Snap from 'snapsvg-cjs';

@Component({
    selector: 'app-render-svg',
    templateUrl: './render-svg.component.html',
    styleUrls: ['./render-svg.component.scss']
})
export class RenderSvgComponent implements OnInit, OnChanges {
    @Input() callbackFunction: ((space: any, isMultiple?: boolean) => void) | undefined;
    @Input() currentSpaces: string[] = [];

    @Input() setSpaceCount?: ((count: number) => void) | undefined;
    @Input() url: string = '';
    @Input() data: any = [];
    @Input() legends?: any = [];
    @Input() legendVisible?: any = null;

    public selectedItems: any[] = [];
    public selectedDocuments: any[] = [];

    public downloadedSvg: string = '';
    public isDownloadingSvg: boolean = true;
    public isDownloadError: boolean = false;

    constructor() { 
        // document.addEventListener('mousemove', (event) => {
        //     console.log(`Mouse X: ${event.clientX}, Mouse Y: ${event.clientY}`);
        // });
    }

    ngOnInit(): void {
        this.downloadSvg();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.legendVisible) {
            console.log(changes.legendVisible);
            this.setupSvgElements();
        }

        if (changes.currentSpaces) {
            console.log(changes.currentSpaces, this.currentSpaces)
            this.handleHighlightSelected();
        }
    }

    handleHighlightSelected() {
        const rect = document.querySelectorAll('rect');
        const defaultLegend = Object.keys(this.legends).find((value: string) => this.legends[value].isDefault);

        rect.forEach((space) => {
            if (this.currentSpaces.includes(space.id)) {
                console.log(true)
                space.style.fill = '#A100FF';
            } else {
                this.handleConfig(space, defaultLegend!);
            }
        });
    }

    public async downloadSvg() {
        try {
            const svgString = await fetch(this.url).then(resp => resp.text());
            this.downloadedSvg = svgString;
            this.setupSvgElements();
            this.isDownloadingSvg = false;
        } catch (err) {
            console.log(err)
            this.isDownloadError = true;
            this.isDownloadingSvg = false;
        }
    }

    public setupSvgElements() {
        const el = document!.getElementById('svg')!

        el.innerHTML = this.downloadedSvg;
        
        console.log(el.firstElementChild!.id);

        const svg = el.getElementsByTagName('svg');
        // el.firstElementChild!.style.width = '100%';
        // svg[0].setAttribute("viewBox", "150 30 330 290");
        // console.log(svg)
        // console.log(svg[0].getBBox())
        svg[0].style.height = '100%';
        svg[0].style.width = '100%';
        const rect = el.querySelectorAll('rect');

        let ids: string[] = [];

        this.setSpaceCount && this.setSpaceCount!(rect.length);
        const defaultLegend = Object.keys(this.legends).find((value: string) => this.legends[value].isDefault);
        
        rect.forEach(item => {
            ids.push(item.id);
            // General styles
            item.style.cursor = 'pointer';

            // DEFAULT COLOR FOR SPACE STATUS
            item.style.fill = '#A100FF';
            item.innerHTML = `<p>${item.id}</p>`;
            
            this.handleConfig(item, defaultLegend!);

            item.addEventListener('click', this.onItemClick.bind(this))
        })

        // MULTI SELECT
        // this.addDragListener(el.firstElementChild!);
    }

    handleConfig(item: any, defaultLegend: string) {
        if (this.legendVisible) {
            // CHECK IF SPACE HAS CONFIGURATION
            const dataIndex = this.data.findIndex((da: any) => da.spacenum === item.id);

            if (dataIndex !== -1) {
                item.style.fill = this.legends[this.data[dataIndex][this.legendVisible]].legend.background
            } else {
                item.style.fill = this.legends[defaultLegend!].legend.background

                if (this.legends[defaultLegend].legend.border) {
                    item.style.stroke = '#A100FF';
                }
            }
        }
    }

    public addDragListener(svg: Element) {
        var s = Snap(`#${svg.id}`);
        // var s = Snap(svg);
        // console.log(s.children());
        // console.log("--", s.selectAll('rect'));
        //make an object in the background on which to attach drag events
        // var mat = svg.querySelector('g');
        var mat = s.rect(s.selectAll('g'));
        var set = s.g(s.selectAll('rect'));
    
        var box: any;
        
        //set that will receive the selected items
        var selections = s.group();
        
        //DRAG FUNCTIONS
        //when mouse goes down over background, start drawing selection box
        function dragstart (x: any, y: any, event: any) {
            console.log(x, y, event)
            box = s.rect(x, y, 0, 0).attr("stroke", "#9999FF");    
        }
        
        //when mouse moves during drag, adjust box. If to left or above original point, you have to translate the whole box and invert the dx or dy values since .rect() doesn't take negative width or height
        function dragmove (dx: number, dy: number, x: any, y: any, event: any) {
            var xoffset = 0,
                yoffset = 0;
                
            if (dx < 0) {
                xoffset = dx;
                dx = -1 * dx;
            }
            
            if (dy < 0) {
                yoffset = dy;
                dy = -1 * dy;
            }
            
            box.transform("T" + xoffset + "," + yoffset);
            box.attr("width", dx);    
            box.attr("height", dy);  
            box.attr("fill", "none");  
        }
        
        
        function dragend (event: any) {
            //get the bounds of the selections
            var bounds = box.getBBox();
            box.remove();
            // reset();

            var items = set.selectAll("*");
            items.forEach(function(el: { getBBox: () => any; }) {
                //here, we want to get the x,y vales of each object regardless of what sort of shape it is, but rect uses rx and ry, circle uses cx and cy, etc
                //so we'll see if the bounding boxes intercept instead
                var mybounds = el.getBBox();
                
                //do bounding boxes overlap?
                //is one of this object's x extremes between the selection's xextremes?
                if (Snap.path.isBBoxIntersect(mybounds, bounds)) {
                    selections.append(el);
                }
            });

            // console.log(items);

            // console.log(typeof selections.selectAll('rect'))
            // KUNIN MO UNG SELECTED rect DITO SA selections.. ito ung mga selected
            // naka object siya
            selections.attr("opacity", 0.5);
            console.log(selections.selectAll('rect').items[0].node)
        }
        
        
        function reset () {
            //empty selections and reset opacity;
            var items = selections.selectAll("*");
            items.forEach(function(el: any) {
                set.append(el);
            });
        }
        mat.drag(dragmove, dragstart, dragend);

        s.click(function(e: any){
            console.log("You have clicked in the elipse", e);
        });
    }

    public onItemClick(e: any) {
        if (e.shiftKey) {
            // trigger select + SHIFT key here
            this.callbackFunction!(e.target.id, true);
            e.target.style.fill = '#A100FF';
        } else {
            this.callbackFunction!(e.target.id);
        }
    }

    public someMethod(){

    }
}