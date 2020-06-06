import { Component, ViewChild, ElementRef } from '@angular/core';
import { HttpService } from '../services/http.service';
import { EventService } from '../services/event.service';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss']
})



export class MapComponent {


    // google maps zoom level
    zoom: number = 10;

    // initial center position for the map
    lat: number;
    lng: number;

    doctors: any[];
    filteredList: any[];
    markers: marker[] = [];

    constructor(private http: HttpService, private eventService: EventService) {

        this.eventService.updateMap.subscribe((payload) => {
            //
            this.filterListwithLoc(payload.filter, payload.value);
        });
    }



    ngOnInit(): void {


        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.lat = position.coords.latitude;
                this.lng = position.coords.longitude;
                this.zoom = 8;
            });

            this.http.getAllDoctors().subscribe(data => {
                this.doctors = data.entries;
                this.filteredList = data;
                this.updateMarkers(data.entries, 'D');
            });
            this.http.getAllAmbulance().subscribe(data => {
                this.updateMarkers(data.entries, 'A');
            });
            this.http.getAllHospital().subscribe(data => {
                this.updateMarkers(data.entries, 'H');
            });
            this.http.getAllLabs().subscribe(data => {
                this.updateMarkers(data.entries, 'L');
            });
            this.http.getAllPharma().subscribe(data => {
                this.updateMarkers(data.entries, 'P');
            });

        }
    }

    filterListwithLoc(param, value) {

        this.filteredList = [];
        this.doctors.forEach(data => {

            if (data.address[param].toLowerCase() == value.toLowerCase()) {
                this.filteredList.push(this.getMarkerObj(data, 'D'));
            }
        });
        this.markers = this.filteredList;
    }

    getMarkerObj(data, label) {
        let markerObj = <marker>{};

        markerObj.lat = this.getNumber(data.address.latitude);
        markerObj.lng = this.getNumber(data.address.longitude);
        markerObj.label = label;

        return markerObj;
    }
    updateMarkers(arr, label) {
        arr.forEach(data => {
            this.markers.push(this.getMarkerObj(data, label));
        });
    }
    getNumber(str) {
        if (str) {
            let tokens = str.split("°");
            return Number(tokens[0]);
        }
        return 0;
    }
}
interface marker {
    lat: number;
    lng: number;
    label?: string;
    //city:String;
}