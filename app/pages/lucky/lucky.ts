// Base import
import { Component } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
    templateUrl: 'build/pages/lucky/lucky.html'
})
export class LuckySale  {

    private store: any;

    constructor(private http: Http) {
        this.http.get('http://loto.halogi.com/store_lucky').map(res => res.json()).subscribe(data => {
            this.store = data;
        })
    }
}