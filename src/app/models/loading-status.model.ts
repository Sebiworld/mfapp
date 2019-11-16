import { Record } from 'immutable';
import * as moment from 'moment';

const defaultLoadingStatus = Record({
    start: 0,
    moreAvailable: true,
    totalNumber: 0,
    modified: moment.valueOf()
});

export class LoadingStatus extends defaultLoadingStatus {
    start: number;
    moreAvailable: boolean;
    totalNumber: number;
    modified: string;

	constructor(props) {
        super(props);
        console.log("LoadingStatus: ", this.modified);
    }
}
