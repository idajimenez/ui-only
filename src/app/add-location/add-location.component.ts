import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'add-location',
    templateUrl: './add-location.component.html',
    styleUrls: ['./add-location.component.scss']
})
export class AddLocationComponent implements OnInit {

    // TODO fetch actual data
    public cityOptions: any = dummyCity;
    public facilityOptions: any = [];
    public floorOptions: any = [];

    public selectCitynm: string = '';
    public selectFacilitynm: string = '';
    public selectFloornm: string = '';

    public errorSection?: 'city' | 'facility' | 'floor';

    constructor() { }

    ngOnInit(): void {
    }

    public handleAdd = (value: string, key: string) => {
        console.log(value, key);
        if (key === 'city') {
            const cityIndex = this.cityOptions.findIndex((city: any) => city.citynm === value);
            console.log(cityIndex);

            if (cityIndex === -1) {
                this.cityOptions.push({ citynm: value, facilities: [] });
            } else {
                this.errorSection = key;
            }
        } else if (key === 'facility') {
            const facilityIndex = this.facilityOptions.findIndex((item: any) => item.facility === value);

            if (facilityIndex === -1) {
                this.facilityOptions.push({ facilityid: this.facilityOptions, facility: value });
            } else {
                this.errorSection = key;
            }
        } else if (key === 'floor') {
            const floorIndex = this.floorOptions.findIndex((floor: number) => floor === parseInt(value));

            if (floorIndex === -1) {
                this.floorOptions.push(parseInt(value));
            } else {
                this.errorSection = key;
            }
        }
    }
}

const dummyFloor = [
    { "facilityid": 1, "floors": [1, 2, 3, 4] },
    { "facilityid": 2, "floors": [1, 2, 3, 4, 6] },
    { "facilityid": 3, "floors": [1, 2] }
]

const dummyFacility = [
    { "facilityid": 1, "facility": "officia proident" },
    { "facilityid": 2, "facility": "velit laborum" },
    { "facilityid": 3, "facility": "nostrud culpa" }
]

const dummyCity = [
    { "citynm": "enim velit", facilities: [] },
    { "citynm": "velit incididunt", facilities: [] },
    { "citynm": "officia magna", facilities: [] },
    { "citynm": "ex excepteur", facilities: [] }
]