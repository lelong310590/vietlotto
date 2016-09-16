// Base import
import { Component } from '@angular/core';
import { Platform, ionicBootstrap } from 'ionic-angular';
import { StatusBar } from 'ionic-native';

// Page import
import { TabsPage } from './pages/tabs/tabs';


@Component({
    template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class MyApp {

    public rootPage: any;

    constructor(private platform: Platform) {
        this.rootPage = TabsPage;
        this.initializeApp();
    }

    public initializeApp() {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            StatusBar.overlaysWebView(true); // let status var overlay webview
			StatusBar.backgroundColorByHexString('#B71C1C');
        });
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
