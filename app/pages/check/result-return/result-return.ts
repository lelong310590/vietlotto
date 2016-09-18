// Base import
import { Component } from '@angular/core';
import { NavController, Platform, LoadingController, ViewController, NavParams } from 'ionic-angular';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

// Plugin import
import { Toast } from 'ionic-native';

// Services import
import { Helper } from '../../../services/helper';

@Component({
    templateUrl: 'build/pages/check/result-return/result-return.html',
    providers: [Helper]
})
export class ResultReturn { 

    private prizeResult: any = [];
    private resultStatus: boolean;
    private selectedBall: any;
    private prizeWin: number;
    private prizeTable: Array<any> = [];

    constructor(private navParam: NavParams, 
                private viewcontroller: ViewController, 
                private http: Http, 
                private navController: NavController, 
                private helper: Helper, 
                private loadingCtrl: LoadingController) 
    {
        // console.log('fuck');
        this.selectedBall = this.navParam.get('ball');
        if (this.navParam.get('data').total == 0) {
            this.resultStatus = false; // Không trúng
            this.getBallResultFail();
        } else {
            this.resultStatus = true; // Trúng giải
            this.getBallResultWin()
        }
    }

    public closeModal() {
        this.viewcontroller.dismiss();
    }

    public getBallResultFail() {
        let httpRequestListenner = this.http.get('http://loto.halogi.com/result?date=' + this.navParam.get('date')).map(res => res.json()).subscribe(
            (data) => {
                data.jackpot.split(",").forEach(i => {
                    this.prizeResult.push(this.helper.formatNumber(i));  // Format lại định dạng số trả về
                });
                // console.log(this.prizeResult);

                this.navController.viewDidLeave.subscribe(() => {
                    // console.log('view leave');
                    httpRequestListenner.unsubscribe();
                })
            },
            (error) => {
                // console.log(error);
            }
        );
    }

    public getBallResultWin() {
        this.prizeWin = this.navParam.get('data').total;
        let httpRequestListenner = this.http.get('http://loto.halogi.com/result?date=' + this.navParam.get('date')).map(res => res.json()).subscribe(
            (data) => {
                this.prizeTable.push(data);
                // console.log(this.prizeTable);

                this.navController.viewDidLeave.subscribe(() => {
                    // console.log('view leave');
                    httpRequestListenner.unsubscribe();
                })
            },
            (error) => {
                // console.log(error);
            }
        );
    }
}