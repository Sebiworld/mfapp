import { Record, List } from "immutable";
import { TimePeriod } from "./time-period.model";

const defaultEvent = Record({
	id: 0,
	title: "",
});

export class Event extends defaultEvent {
	id: number;
	title: string;
	created: string;
	modified: string;
	intro: string;
	color: string;
	datetime_from: string;
	datetime_until: string;
	// time_periods: List<TimePeriod>;

	constructor(props) {
		super(props);
	}
}
