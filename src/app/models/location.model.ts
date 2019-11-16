import { Record } from 'immutable';

const defaultLocation = Record({
    id: 0,
	name: 'default',
	title: ''
});

export class Location extends defaultLocation {
	id: number;
	created: string;
    modified: string;
    title: string;
    // TODO: Map-Position

	constructor(props) {
        super(props);
    }
}
