// Base import
import { Component } from '@angular/core';

// Page import
import { ResultPage } from '../result/result';
import { Map } from '../map/map';
import { SalePoint } from '../salepoint/salepoint';

@Component({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {

  public tab1Root: any;
  public tab2Root: any;
  public tab3Root: any;
  public tab4Root: any;

  constructor() {
    // this tells the tabs component which Pages
    // should be each tab's root Page
    this.tab1Root = Map;
    this.tab2Root = ResultPage;
    this.tab3Root = SalePoint;
    this.tab4Root = ResultPage;
  }
}
