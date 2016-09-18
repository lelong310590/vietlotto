// Base import
import { Component } from '@angular/core';
import { NavController, Platform, LoadingController, ViewController } from 'ionic-angular';

// Plugin import
import { Toast } from 'ionic-native';

@Component({
    templateUrl: 'build/pages/check/picknumber/picknumber.html',
})
export class PickNumber {

    private pickType: number = 5;

    constructor(private viewController: ViewController ) {
        
    }

    public closeModal() {
        this.viewController.dismiss();
    }
}