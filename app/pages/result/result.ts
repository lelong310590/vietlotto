// Base import
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

// Plugin import
import { Toast } from 'ionic-native';

// Page import
import { ResultDetailPage } from '../result/result-detail/result-detail';

@Component({
    templateUrl: 'build/pages/result/result.html'
})
export class ResultPage {

    constructor(public navController: NavController) {
        
    }

    public openPage() {
        this.navController.setRoot(ResultDetailPage);
    }

    public commingSoon() {
        Toast.show("Tính năng này đang được phát triển", '2500', 'bottom').subscribe(
            toast => {
            }
        );
    }

}
