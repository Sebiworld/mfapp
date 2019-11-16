import { Record } from 'immutable';

const defaultCategory = Record({
    id: 0,
	name: 'default',
	title: ''
});

export class Category extends defaultCategory {
	id: number;
	created: string;
    modified: string;
    title: string;
    name: string;

	constructor(props) {
        super(props);
    }
}
