import { Component, OnInit, Input, OnChanges } from "@angular/core";
import { ApiService } from "../../../services/api/api.service";
import { BehaviorSubject, EMPTY, Observable } from "rxjs";
import { switchMap, map, tap } from "rxjs/operators";
import { DomSanitizer } from "@angular/platform-browser";
import * as moment from 'moment';

@Component({
	selector: "app-event-tile",
	templateUrl: "./event-tile.component.html",
	styleUrls: ["./event-tile.component.scss"],
})
export class EventTileComponent implements OnInit {
	@Input()
	event: any;

	@Input()
	private mainImageSrc: string;
	private mainImageSrc$ = new BehaviorSubject(this.mainImageSrc);

	public color = "";

	public datetime_from: moment.Moment;
	public datetime_until: moment.Moment;
	public isMultiDays: boolean = false;

	public timePeriodsByDay;

	constructor(
		private apiService: ApiService,
		private domSanitizer: DomSanitizer
	) {}

	public mainImageDataUrl$ = this.mainImageSrc$.pipe(
		switchMap(() => {
			if (
				!this.event.id ||
				!this.event.main_image ||
				!this.event.main_image.basename
			) {
				return EMPTY;
			}

			return this.apiService
				.loadImage(this.event.id, this.event.main_image.basename)
				.pipe(
					map(image => {
						return this.domSanitizer.bypassSecurityTrustStyle(
							"url(" + image + ")"
						);
					})
				);
		})
	);

	ngOnChanges(): void {
		return;
		this.mainImageSrc$.next(this.mainImageSrc);
	}

	ngOnInit(): void {
		console.log("Event: ", this.event.datetime_from);
		return;
		if (this.event.color) {
			this.color = "#" + this.event.color;
		}

		this.datetime_from = moment.unix(this.event.datetime_from);
		if(this.event.datetime_until !== undefined){
			this.datetime_until = moment.unix(this.event.datetime_until);
		}

		this.isMultiDays = !this.datetime_from.isSame(this.datetime_until, 'day');

		let timePeriodsByDay = {};
		for(const index in this.event.time_periods){
			const timePeriod = this.event.time_periods[index];
			const timePeriodFrom = moment.unix(timePeriod.datetime_from);

			if(timePeriodsByDay[timePeriodFrom.format("YYYY-MM-DD")] === undefined){
				timePeriodsByDay[timePeriodFrom.format("YYYY-MM-DD")] = {
					date: timePeriodFrom.unix(),
					time_periods: []
				};
			}
			
			timePeriodsByDay[timePeriodFrom.format("YYYY-MM-DD")].time_periods.push(timePeriod);
		}

		this.timePeriodsByDay = Object.keys(timePeriodsByDay).map(key => timePeriodsByDay[key]);
	}
}
