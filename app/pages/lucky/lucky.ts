// Base import
import { Component } from '@angular/core';
import { LoadingController, NavController, Page, ViewController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

// Plugin import
import { Toast, SpinnerDialog } from 'ionic-native';

// Page import
import { Map } from '../../pages/map/map';

@Page({
    templateUrl: 'build/pages/lucky/lucky.html'
})
export class LuckySale  {

    private store: any;

    constructor(private http: Http, private loadingCtrl: LoadingController, private navController: NavController, private viewCtrl: ViewController) {
       
    }

    onPageLoaded() {
        SpinnerDialog.show('', 'Đang tải dữ liệu cửa hàng...');
        let httpRequest = this.http.get('http://loto.halogi.com/store_lucky').map(res => res.json()).subscribe(data => {
            this.store = data;
            setTimeout(function() {
                httpRequest.unsubscribe();
            }, 2500);
            SpinnerDialog.hide();
        })
    }

    onPageDidUnload() {
        const index = this.viewCtrl.index;
        this.navController.remove(index);
    }

}