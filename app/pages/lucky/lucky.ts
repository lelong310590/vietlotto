// Base import
import { Component } from '@angular/core';
import { LoadingController, NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

// Plugin import
import { Toast } from 'ionic-native';

// Page import
import { Map } from '../../pages/map/map';

@Component({
    templateUrl: 'build/pages/lucky/lucky.html'
})
export class LuckySale  {

    private store: any;

    constructor(private http: Http, private loadingCtrl: LoadingController, private navController: NavController) {
        let loading = this.loadingCtrl.create({
            content: 'Đang tải...'
        });
        loading.present();
        let httpRequest = this.http.get('http://loto.halogi.com/store_lucky').map(res => res.json()).subscribe(data => {
            this.store = data;
            loading.dismiss();
            setTimeout(function() {
                httpRequest.unsubscribe();
            }, 2500);
        })

        
    }

}