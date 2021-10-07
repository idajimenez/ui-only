declare var Snap: any;
declare var mina: any;

import { Component, Input, OnInit } from '@angular/core';
// import Snap from 'snapsvg-cjs';

@Component({
    selector: 'app-render-svg',
    templateUrl: './render-svg.component.html',
    styleUrls: ['./render-svg.component.scss']
})
export class RenderSvgComponent implements OnInit {
    @Input() callbackFunction: ((space: any) => void) | undefined;
    @Input() setSpaceCount?: ((count: number) => void) | undefined;
    @Input() url: string = '';

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
            console.log(err)
            this.isDownloadError = true;
            this.isDownloadingSvg = false;
        }
    }

    public setupSvgElements(svgString: string) {
        const el = document!.getElementById('svg')!

        el.innerHTML = svgString;
        
        console.log(el.firstElementChild!.id);
        this.addDragListener(el.firstElementChild!);

        // const svg = el.getElementsByTagName('svg');
        // console.log(svg)
        // el.firstElementChild!.style.width = '100%';
        // el.style.height = '100%';
        const rect = el.querySelectorAll('rect');

        let ids: string[] = [];

        this.setSpaceCount && this.setSpaceCount!(rect.length);
        rect.forEach(item => {
            ids.push(item.id);
            // General styles
            item.style.cursor = 'pointer';

            // Styles based on status
            item.style.fill = '#A100FF';

            item.addEventListener('click', this.onItemClick.bind(this))
        })

        console.log(ids);
    }

    public addDragListener(svg: Element) {
        var s = Snap(`#${svg.id}`);

        console.log(s.children());
        //make an object in the background on which to attach drag events
        // var mat = svg.querySelector('g');
        var mat = s.rect(0, 0, 300, 300).attr("fill", "#ffffff");

        var circle = s.circle(75, 75, 50);
        var rect = s.rect(150, 150, 50, 50);
        var set = s.g(circle, rect);
        
        set.attr({
            fill: 'red',
            stroke: 0
        });

        var box: any;
        
        //set that will receive the selected items
        var selections = s.group();
        
        //DRAG FUNCTIONS
        //when mouse goes down over background, start drawing selection box
        function dragstart (x: any, y: any, event: any) {
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
            reset();

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

            console.log(items);
            console.log(selections)
            selections.attr("opacity", 0.5);
        }
        
        
        function reset () {
            //empty selections and reset opacity;
            var items = selections.selectAll("*");
            items.forEach(function(el: any) {
                set.append(el);
            });
        }
        
        mat.drag(dragmove, dragstart, dragend);
    }

    public onItemClick(e: any) {
        this.callbackFunction!(e.target.id);
    }

    public someMethod(){

    }
}
