import { Injectable } from '@angular/core';

@Injectable()
export class Helper {
    formatNumber(s) {
        if (s.toString().length < 2) {
            s = "0" + s;
            return s;
        } else {
            return s;
        }
    }
}