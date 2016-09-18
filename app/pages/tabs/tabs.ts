// Base import
import { Component } from '@angular/core';

// Page import
import { ResultPage } from '../result/result';
import { Map } from '../map/map';
// import { SalePoint } from '../salepoint/salepoint';
import { CheckPage } from '../check/check';
import { LuckySale } from '../lucky/lucky';

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
    this.tab3Root = LuckySale;
    this.tab4Root = CheckPage;
  }
}
