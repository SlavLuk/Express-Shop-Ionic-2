import { Component,ElementRef,ViewChild } from '@angular/core';
import { NavController, NavParams ,Platform} from 'ionic-angular';
import {GoogleMap,GoogleMaps,GoogleMapsEvent,CameraPosition,Marker,LatLng} from '@ionic-native/google-maps';


@Component({
  selector: 'page-shoplocation',
  templateUrl: 'shoplocation.html'
})
export class ShoplocationPage {

 
@ViewChild('map') mapElement:ElementRef;

 public latLtg:any;
 public  map:GoogleMap;
 public locations:any;

  constructor(public navCtrl: NavController,public googleMaps: GoogleMaps, public navParams: NavParams,public platform: Platform) {


this.locations = navParams.get("storeLocations");//get locations params


    platform.ready().then(()=>{



 this.loadMap(this.locations);

    });



  }//constructor




  loadMap(myLoc) {


 // create a new map by passing HTMLElement
 let element: HTMLElement = document.getElementById('map');

 this.map = this.googleMaps.create(element);

 // listen to MAP_READY event
 // You must wait for this event to fire before adding something to the map or modifying it in anyway

 
this.map.one(GoogleMapsEvent.MAP_READY).then(() => console.log('Map is ready!'));
  
this.setMarker(myLoc);
 // create LatLng object
 let myPos: LatLng = new LatLng(myLoc[0].location.geo.coordinates.latitude,myLoc[0].location.geo.coordinates.longitude);
 
 // create CameraPosition
 let position: CameraPosition = {
   target: myPos,
   zoom: 10
  
  
 };

 // move the map's camera to position
 this.map.moveCamera(position);

this.map.setOptions({//set up map options
  controls: {
             'compass': true,
             'myLocationButton': true,
             'indoorPicker': true,
             'zoom': true
           },
             gestures: {
             'scroll': true,
             'tilt': true,
             'rotate': true,
             'zoom': true
           }

});

 }//end load map


setMarker(locations){

for(let loc in locations){//set up marker coordinates

 this.map.addMarker({

position:new LatLng(locations[loc].location.geo.coordinates.latitude,locations[loc].location.geo.coordinates.longitude),

title:locations[loc].location.name

 })
   .then((marker: Marker) => {
      marker.showInfoWindow();
    });

}


}//end set up markers



}//end class




