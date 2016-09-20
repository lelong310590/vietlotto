// Base import
import { Component } from '@angular/core';
import { NavController, Platform, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

// Plugin import
import { GoogleMap, GoogleMapsEvent, GoogleMapsLatLng, Geolocation, Toast, GoogleMapsMarkerOptions, GoogleMapsMarker, GoogleMapsMarkerIcon, SpinnerDialog, Splashscreen } from 'ionic-native';


@Component({
    templateUrl: 'build/pages/map/map.html'
})

export class Map {

    constructor(private navController: NavController, private platform: Platform, private http: Http, private navParams: NavParams) {
        platform.ready().then(() => {
            this.initalizeMap();
            Splashscreen.hide();
        });
    }

    public initalizeMap() {
        SpinnerDialog.show('', 'Đang tải dữ liệu bản đồ...');
        this.http.get('http://loto.halogi.com/store').map(res => res.json()).subscribe(data => {

            let map = new GoogleMap('map', {
                zoom: 15
            });

            map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
                map.setMyLocationEnabled(true);
                map.setZoom(15);

                Geolocation.getCurrentPosition().then((resp) => {
                    console.log('location detected');
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

            SpinnerDialog.hide();

        });
    }

}