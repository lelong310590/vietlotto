// Base import
import { Component } from '@angular/core';
import { NavController, ViewController, Page } from 'ionic-angular';

// Plugin import
import { Toast } from 'ionic-native';

// Page import
import { ResultDetailPage } from '../result/result-detail/result-detail';

@Page({
    templateUrl: 'build/pages/result/result.html'
})
export class ResultPage {

    constructor(public navController: NavController, private viewCtrl: ViewController) {
        
    }

    public openPage() {
        this.navController.push(ResultDetailPage);
    }

    public commingSoon() {
        Toast.show("Tính năng này đang được phát triển", '2500', 'bottom').subscribe(
            toast => {
            }
        );
    }

    onPageDidUnload() {
        const index = this.viewCtrl.index;
        this.navController.remove(index);
    }

}
