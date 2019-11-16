import { Record, List } from "immutable";
import { Location } from "./location.model";
import { Category } from "./category.model";

const defaultTimePeriod = Record({
	id: 0,
	name: "default",
	title: "",
});

export class TimePeriod extends defaultTimePeriod {
	id: number;
	created: string;
	modified: string;
	title: string;
	intro: string;
	location: Location;
	categories: List<Category>;
	datetime_from: string;
	datetime_until: string;

	constructor(props) {
		super(props);
	}
}
