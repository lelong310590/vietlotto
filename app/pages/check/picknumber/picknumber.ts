// Base import
import { Component } from '@angular/core';
import { NavController, Platform, LoadingController, ViewController, NavParams, ModalController, Page } from 'ionic-angular';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

// Plugin import
import { Toast } from 'ionic-native';

// Services import
import { Helper } from '../../../services/helper';

// Page import
import { ResultReturn } from '../../check/result-return/result-return';

@Page({
    templateUrl: 'build/pages/check/picknumber/picknumber.html',
    providers: [Helper]
})
export class PickNumber {
    
    private pickType_min: number = 5;
    private pickType_max: number = 18;
    private pickedQlt: number = 0;

    private pickerBall: Array<any> = [];
    private paramCheck: Array<any> = []; // Mảng chứa Param

    constructor(private viewController: ViewController, private helper: Helper, private http: Http, private navParams: NavParams, private navCtrl: NavController, private loadingCtrl: LoadingController, private modalCtrl: ModalController ) {

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
            if(this.pickedQlt>=this.pickType_max){
                // console.log('Bạn đã chọn đủ số, hãy bấm vào nút kiểm tra kết quả');
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
        if (this.pickedQlt < this.pickType_min) {
            // console.log('Bạn vẫn chưa chọn đủ số để kiểm tra');
            // console.log("paramCheck " + this.paramCheck);
            Toast.show("Bạn vẫn chưa chọn đủ số để kiểm tra", '2500', 'bottom').subscribe(
                toast => {
                    // console.log(toast);
                }
            );
        } else {
            let loader = this.loadingCtrl.create({
                content: "Đang tải kết quả...",
            });
            loader.present();
            this.http.get('http://loto.halogi.com/check?ticket=' + this.paramCheck.toString() + '&date=' + this.navParams.get('date')).map(res => res.json()).subscribe((data) => {
                loader.dismiss();
                let modal = this.modalCtrl.create(ResultReturn, {data: data, date: this.navParams.get('date'), ball: this.pickerBall});
                modal.present();
            })
        }
        // }
    }

    onPageDidUnload() {
        const index = this.viewController.index;
        this.navCtrl.remove(index);
    }
}