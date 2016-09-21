// Base import
import { Component } from '@angular/core';
import { NavController, Platform, NavParams, Page, ViewController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

// Plugin import
import { GoogleMap, GoogleMapsEvent, GoogleMapsLatLng, Geolocation, Toast, GoogleMapsMarkerOptions, GoogleMapsMarker, GoogleMapsMarkerIcon, SpinnerDialog, Splashscreen } from 'ionic-native';
import { Geoposition, GeolocationOptions } from 'ionic-native/dist/plugins/geolocation';

@Page({
    templateUrl: 'build/pages/map/map.html'
})

export class Map {

    constructor(private navController: NavController, private platform: Platform, private http: Http, private navParams: NavParams, private viewCtrl: ViewController) {
        platform.ready().then(() => {
            
        });
    }

    onPageLoaded () {
        this.platform.ready().then(() => {
            SpinnerDialog.show('', 'Đang tải dữ liệu bản đồ...');

            let map = new GoogleMap('map', {
                zoom: 15
            });
    
            this.http.get('http://loto.halogi.com/store').map(res => res.json()).subscribe(data => {
                
                map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
                    map.setMyLocationEnabled(true);
                    map.setZoom(15);

                    SpinnerDialog.hide();

                    let options: GeolocationOptions = {
                        maximumAge: 0, timeout: 5000, enableHighAccuracy: false
                    };
    
                    Geolocation.getCurrentPosition(options).then((resp) => {
                        console.log('locate ready');
                        let lat = resp.coords.latitude;
                        let long = resp.coords.longitude;
                        let coord = new GoogleMapsLatLng(lat, long); // Current Position
                        map.animateCamera({
                            'target': coord,
                            'zoom': 18,
                        });
                        // Toast.show("Chọn một đại lý bán vé ở gần bạn và bắt đầu tham gia", '3000', 'bottom').subscribe(
                        //     toast => {
                        //     }
                        // );
                    })
    
                    addMarkers(data, function (markers) {
                        markers[markers.length - 1].showInfoWindow();
                    });
    
                    function addMarkers(data, callback) {
                        var markers = [];
                        function onMarkerAdded(marker) {
                            markers.push(marker);
                            if (markers.length === data.length) {
                                callback(markers);
                            }
                        }
    
                        data.forEach((element) => {
                            map.addMarker({
                                'position': new GoogleMapsLatLng(element.location.lat, element.location.lng),
                                'title': element.title
                            }).then(onMarkerAdded);
                        });
                    }
                });
    
            });
        });
        
    }

    onPageDidUnload() {
        const index = this.viewCtrl.index;
        this.navController.remove(index);
    }

}