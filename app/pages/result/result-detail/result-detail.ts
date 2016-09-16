// Base import
import { Component } from '@angular/core';
import { NavController, Platform, LoadingController } from 'ionic-angular';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

// Plugin import
import { DatePicker, Toast } from 'ionic-native';

// Services import
import { Helper } from '../../../services/helper';

@Component({
    templateUrl: 'build/pages/result/result-detail/result-detail.html',
    providers: [Helper]
})
export class ResultDetailPage {

    private searchResultJackpot: Array<any> = [];
    private prizeResult: Array<any> = [];
    private returnResult: Array<any> = [];
    private returnprizeResult: Array<any> = [];

    private showNewestResult: boolean = true;

    constructor(public navController: NavController, private platform: Platform, private http: Http, private helper: Helper, private loadingCtrl: LoadingController) {
        this.getDefaulResult();
    }

    public datePicker() {
        this.platform.ready().then(() => {
            DatePicker.show({
                date: new Date(),
                mode: 'date',
                okText: 'Chọn',
                cancelText: 'Thoát',
                androidTheme: 5,
            }).then(
               (date) => {
                    let loader = this.loadingCtrl.create({
                        content: "Đang tải...",
                    });
                    loader.present();
                    
                    // let selectedDate = date.getFullYear().toString() + ' - ' + this.helper.formatNumber((date.getMonth() + 1).toString()) + ' - ' + this.helper.formatNumber(date.getDate().toString());
                    let dateStr = date.getFullYear().toString() + this.helper.formatNumber((date.getMonth() + 1).toString()) + this.helper.formatNumber(date.getDate().toString()); //Format lại định dạng ngày tháng
                    // console.log(dateStr);
                    let httpRequestListenner = this.http.get('http://loto.halogi.com/result?date=' + dateStr).map(res => res.json()).subscribe(
                        (data) => {

                            this.returnResult = []; // Xóa mảng kết quả trả về trước khi truyền vào dữ liệu mới
                            this.returnprizeResult = []; // Xóa mảng ball kết quả trả về trước khi truyền vào dữ liệu mới

                            this.showNewestResult = true;

                            this.returnResult.push(data); // Truyền vào dữ liệu mới dựa trên ngày tháng lấy được vào mảng
                            data.jackpot.split(",").forEach(i => {
                                this.returnprizeResult.push(this.helper.formatNumber(i));  // Format lại định dạng số trả về và truyền dữ liệu mới vào mảng
                            });

                            this.showNewestResult = false;

                            loader.dismiss();
                        },
                        (error) => {
                            console.log(error);
                            Toast.show('Không có kết quả quay số cho ngày này', '3000', 'center').subscribe(
                                toast => {
                                    console.log(toast);
                                }
                            );
                            loader.dismiss();
                        }
                    );

                    this.navController.viewDidLeave.subscribe(() => {
                        console.log('view leave');
                        httpRequestListenner.unsubscribe();
                    })
                },
                (err) => {
                    console.log("Error occurred while getting date:", err);
                }
            );
        })
    }

    public getDefaulResult() {
        let date = new Date();
        let curentDate = date.getFullYear().toString() + this.helper.formatNumber((date.getMonth() + 1).toString()) + this.helper.formatNumber(date.getDate().toString()); //Format lại định dạng ngày tháng
        let httpRequestListenner = this.http.get('http://loto.halogi.com/result?date=' + curentDate).map(res => res.json()).subscribe(
            (data) => {
                this.searchResultJackpot.push(data);
                data.jackpot.split(",").forEach(i => {
                    this.prizeResult.push(this.helper.formatNumber(i));  // Format lại định dạng số trả về
                });

                this.navController.viewDidLeave.subscribe(() => {
                    console.log('view leave');
                    httpRequestListenner.unsubscribe();
                })
                
            },
            (error) => {
                console.log(error);
            }
        );

       
       
    }
    
}
