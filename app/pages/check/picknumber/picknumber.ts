// Base import
import { Component } from '@angular/core';
import { NavController, Platform, LoadingController, ViewController, NavParams, ModalController } from 'ionic-angular';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

// Plugin import
import { Toast } from 'ionic-native';

// Services import
import { Helper } from '../../../services/helper';

// Page import
import { ResultReturn } from '../../check/result-return/result-return';

@Component({
    templateUrl: 'build/pages/check/picknumber/picknumber.html',
    providers: [Helper]
})
export class PickNumber {
    
    private pickType: number = 5;
    private pickedQlt: number = 0;

    private pickerBall: Array<any> = [];
    private paramCheck: Array<any> = []; // Mảng chứa Param

    constructor(private viewController: ViewController, private helper: Helper, private http: Http, private navParams: NavParams, private modalCtrl: ModalController, private loadingCtrl: LoadingController ) {
        
    }

    public closeModal() {
        this.viewController.dismiss();
    }

    public pickBall(ballNo, status) {
        if (this.pickedQlt >= this.pickType) {
            // Toast.show("Bạn đã chọn đủ số, hãy bấm vào nút kiểm tra kết quả", '2500', 'bottom').subscribe(
            //     toast => {
            //         // console.log(toast);
            //     }
            // );
            if (status == true) {
                // this.pickedQlt++;
                // this.pickerBall.push(this.helper.formatNumber(ballNo));
                // this.paramCheck.push(ballNo);
                console.log('Bạn đã chọn đủ số, hãy bấm vào nút kiểm tra kết quả');
            } else {
                // Xóa số trong mảng số chọn      
                let i = this.pickerBall.indexOf(this.helper.formatNumber(ballNo));
                if (i != -1) {
                    this.pickerBall.splice(i, 1);
                }
    
                // Xóa số trong mảng số chọn      
                let j = this.paramCheck.indexOf(ballNo);
                if (j != -1) {
                    this.paramCheck.splice(j, 1);
                }
    
                this.pickedQlt--;
            }
        } else {
            if (status == true) {
                this.pickedQlt++;
                this.pickerBall.push(this.helper.formatNumber(ballNo));
                this.paramCheck.push(ballNo);
            } else {
                // Xóa số trong mảng số chọn      
                let i = this.pickerBall.indexOf(this.helper.formatNumber(ballNo));
                if (i != -1) {
                    this.pickerBall.splice(i, 1);
                }
    
                // Xóa số trong mảng số chọn      
                let j = this.paramCheck.indexOf(ballNo);
                if (j != -1) {
                    this.paramCheck.splice(j, 1);
                }
    
                this.pickedQlt--;
            }
        }
        
    }

    public checkResult() {
        // console.log(this.paramCheck.toString());
        // console.log(this.navParams.get('date'));
        if (this.pickedQlt < this.pickType) {
            Toast.show("Bạn vẫn chưa chọn đủ số để kiểm tra", '2500', 'bottom').subscribe(
                toast => {
                    // console.log(toast);
                }
            );
        } else {
            
            this.http.get('http://loto.halogi.com/check?ticket=' + this.paramCheck.toString() + '&date=' + this.navParams.get('date')).map(res => res.json()).subscribe((data) => {
                let modal = this.modalCtrl.create(ResultReturn, {data: data, date: this.navParams.get('date'), ball: this.pickerBall}, {showBackdrop: true, enableBackdropDismiss: true});
                modal.present();
            })
        }
        // }
    }
}