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

    public onChangeBao(newValue) {
        // console.log(newValue);
        // location.reload();
        // document.getElementsByClassName("checked").className
    }

    public pickBall(ballNo,  viewId) {
        let ballIdx = this.paramCheck.indexOf(ballNo);
        if (ballIdx != -1){
            document.getElementById(viewId).className = "unchecked";
            this.paramCheck.splice(ballIdx, 1);
            this.pickedQlt--;

            let i = this.pickerBall.indexOf(this.helper.formatNumber(ballNo));
            if (i != -1) {
                this.pickerBall.splice(i, 1);
            }
        }
        else{
            if(this.pickedQlt>=this.pickType){
                console.log('Bạn đã chọn đủ số, hãy bấm vào nút kiểm tra kết quả');
            }
            else{
                 this.pickerBall.push(this.helper.formatNumber(ballNo));
                 this.paramCheck.push(ballNo);
                 document.getElementById(viewId).className = "checked";
                 this.pickedQlt++;
            }
        }
    }

    public checkResult() {
        // console.log(this.paramCheck.toString());
        // console.log(this.navParams.get('date'));
        if (this.pickedQlt < this.pickType) {
            // console.log('Bạn vẫn chưa chọn đủ số để kiểm tra');
            // console.log("paramCheck " + this.paramCheck);
            Toast.show("Bạn vẫn chưa chọn đủ số để kiểm tra", '2500', 'bottom').subscribe(
                toast => {
                    // console.log(toast);
                }
            );
        } else {
            let loader = this.loadingCtrl.create({
                content: "Please wait...",
            });
            loader.present();
            this.http.get('http://loto.halogi.com/check?ticket=' + this.paramCheck.toString() + '&date=' + this.navParams.get('date')).map(res => res.json()).subscribe((data) => {
                loader.dismiss();
                let modal = this.modalCtrl.create(ResultReturn, {data: data, date: this.navParams.get('date'), ball: this.pickerBall}, {showBackdrop: true, enableBackdropDismiss: true});
                modal.present();
            })
        }
        // }
    }
}