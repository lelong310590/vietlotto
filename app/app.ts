// Base import
import { Component } from '@angular/core';
import { Platform, ionicBootstrap, AlertController  } from 'ionic-angular';
import { StatusBar, Splashscreen, Network } from 'ionic-native';

// Page import
import { TabsPage } from './pages/tabs/tabs';


@Component({
    template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class MyApp {

    public rootPage: any;

    constructor(private platform: Platform, public alertCtrl: AlertController) {
        this.rootPage = TabsPage;
        this.initializeApp();
    }

    public initializeApp() {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            StatusBar.overlaysWebView(true); // let status var overlay webview
			StatusBar.backgroundColorByHexString('#B71C1C');
            this.platform.registerBackButtonAction(this.exitApp, 0);
            let disconnectSubscription = Network.onDisconnect().subscribe(() => {
                let alert = this.alertCtrl.create({
                    title: 'Lỗi kết nối!',
                    subTitle: 'Bạn vui lòng kiểm tra lại kết nối mạng hoặc Wifi!',
                    buttons: ['OK']
                });
                alert.present();
            });
            
        });
    }

    public exitApp() {

    }
}

ionicBootstrap(MyApp, [], {
    tabsLayout: 'icon-hide',
    tabsHighlight: true,
    platforms: {
        ios: {
            tabsPlacement: 'bottom',
            pageTransition: 'ios',
            iconMode: 'ios',
            activator: 'highlight'
        },
        android: {
            tabsPlacement: 'top',
            pageTransition: 'md',
            iconMode: 'md',
            activator: 'ripple'
        }
    }
});
