import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'add-location',
    templateUrl: './add-location.component.html',
    styleUrls: ['./add-location.component.scss']
})
export class AddLocationComponent implements OnInit {

    // TODO fetch actual data
    public cityData: any = dummyCity;
    public facilityData: any = [];
    public floorData: any = [];

    public selectedCity: string = '';
    public selectedFacility: string = '';
    public selectedFloor: string = '';

    public errorSection?: 'city' | 'facility' | 'floor';

    constructor() { }

    ngOnInit(): void {
    }

    public handleAdd = (value: string, key: string) => {
        if (key === 'city') {
            const cityIndex = this.cityData.findIndex((city: any) => city.citynm === value);

            if (cityIndex === -1) {
                this.cityData.push({ citynm: value, facilities: [] });
            } else {
                this.errorSection = key;
            }
        } else if (key === 'facility') {
            const facilityIndex = this.facilityData.findIndex((item: any) => item.facility === value);

            if (facilityIndex === -1) {
                this.facilityData.push({ facilityid: this.facilityData, facility: value });
            } else {
                this.errorSection = key;
            }
        } else if (key === 'floor') {
            const floorIndex = this.floorData.findIndex((floor: number) => floor === parseInt(value));

            if (floorIndex === -1) {
                this.floorData.push(parseInt(value));
            } else {
                this.errorSection = key;
            }
        }
    }

    getOptions(key: string) {
        const arr = key === 'city' ? this.cityData : key === 'facility' ? this.facilityData : this.floorData;

        return arr.map((item: any) => {
            if (key === 'city') {
                return item.citynm;
            } else if (key === 'facility') {
                return item.facility;
            } else {
                return item;
            }
        })
    }

    public setSelectedLocation = (value: string, key: string) => {
        console.log(value, key)
        // TODO Call api to retrieve list of options
        if (key === 'city') {
            this.selectedCity = value;
            this.facilityData = dummyFacility.filter((item: any) => item.citynm === value);
            this.floorData = [];
            this.selectedFacility = '';
            this.selectedFloor = ''
        } else if (key === 'facility') {
            this.selectedFacility = value;

            const facility = this.facilityData.find((item: any) => item.facility === value);
            const floorIndex = dummyFloor.findIndex((item: any) => item.facilityid === facility.facilityid);

            this.floorData = dummyFloor[floorIndex].floors;
            this.selectedFloor = ''
        } else {
            this.selectedFloor = value;
        }
    }
}

const dummyFloor = [
    { "facilityid": 1, "floors": ['1', '2', '3', '4'] },
    { "facilityid": 2, "floors": ['1', '2', '3', '4', '6'] },
    { "facilityid": 3, "floors": ['1', '2'] }
]

const dummyFacility = [
    { "facilityid": 1, "facility": "officia proident", "citynm": "officia magna" },
    { "facilityid": 2, "facility": "velit laborum", "citynm": "enim velit" },
    { "facilityid": 4, "facility": "velit 4534535", "citynm": "enim velit" },
    { "facilityid": 3, "facility": "nostrud culpa", "citynm": "ex excepteur" }
]

const dummyCity = [
    { "citynm": "enim velit", facilities: [] },
    { "citynm": "velit incididunt", facilities: [] },
    { "citynm": "officia magna", facilities: [] },
    { "citynm": "ex excepteur", facilities: [] }
]