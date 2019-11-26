import { Injectable } from "@angular/core";
import * as moment from 'moment';

export class LoadingStatus {
    constructor(
        public start: number = 0,
        public totalNumber: number = 0,
        public moreAvailable: boolean = true,
        public modified: number = 0
    ) {
        if (this.modified <= 0) {
            this.modified = moment().unix();
        }
    }
}

@Injectable({
    providedIn: "root"
})
export class LoadingStatusAdapter {
    adapt(item: any): LoadingStatus {
        return new LoadingStatus(
            item.start,
            item.totalNumber,
            item.moreAvailable,
            item.modified
        );
    }
}
