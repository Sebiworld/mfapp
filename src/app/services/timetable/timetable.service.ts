import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { List } from "immutable";
import { Event } from "../../models/event.model";
import { ApiService } from "../api/api.service";
import { HttpParams } from "@angular/common/http";
import { LoadingStatus, LoadingStatusAdapter } from "../../models/loading-status.model";
import { map } from "rxjs/operators";
import * as moment from 'moment';

@Injectable({
	providedIn: "root",
})
export class TimetableService {
	private _events: BehaviorSubject<List<Event>> = new BehaviorSubject(
		List([])
	);
	// The load status of the last API request is saved here. (Are there any unloaded elements? What is the total number?)
	private _loadingStatus: BehaviorSubject<LoadingStatus> = new BehaviorSubject(
		this.loadingStatusAdapter.adapt({})
	);

	// The two subjects are passed on to the outside via readonly observables:
	public readonly events: Observable<
		List<Event>
	> = this._events.asObservable();
	public readonly status: Observable<
		LoadingStatus
	> = this._loadingStatus.asObservable();

	constructor(private apiService: ApiService, private loadingStatusAdapter: LoadingStatusAdapter) {
		this.loadInitialData();
	}

	private loadInitialData() {
		this.loadData(true).subscribe(
			response => console.log("TimetableService response: ", response),
			error => console.log("Error when retrieving dates", error)
		);
	}

	public reload() {
		return this.loadData(true);
	}

	public loadMore() {
		return this.loadData();
	}

	private loadData(overwrite: boolean = false) {
		if (overwrite) {
			this._events.next(List([]));
			this._loadingStatus.next(this.loadingStatusAdapter.adapt({}));
		}

		if(!this._loadingStatus.getValue().moreAvailable){
			throw "All appointments have been loaded. No further dates can be loaded.";
		}

		const currentLoadingStatus = this._loadingStatus.getValue();
		let params = new HttpParams()
			.append("start", "" + currentLoadingStatus.start)
			.append("limit", "15")
			.append("sort", "datetime_from")
			.append("start_date", "TODAY");
		return this.apiService.getEvents(params).pipe(
			map(response => {
				console.log("Events loaded: ", response);

				if (
					response.totalNumber === undefined ||
					response.moreAvailable === undefined ||
					response.lastElementIndex === undefined ||
					response.events === undefined ||
					!Array.isArray(response.events)
				) {
					this._loadingStatus.next(
						this.loadingStatusAdapter.adapt({
							moreAvailable: false,
							totalNumber: 0,
							start: 0,
						})
					);
					throw "An error occurred during the request.";
				}

				let results = response.events.map((event: any) => {
					console.log("Event Raw: ", event);
					let eventData = {
						id: event.id,
						title: event.title,
						created: event.created,
						modified: event.modified,
						intro: event.intro,
						color: event.color,
						datetime_from: undefined,
						datetime_until: undefined
					};

					if(event.datetime_from !== undefined){
						const datetime_from = moment.unix(event.datetime_from).unix();
						if(typeof datetime_from === "number" && datetime_from > 0){
							eventData.datetime_from = datetime_from;
						}
					}

					if(event.datetime_until !== undefined){
						const datetime_until = moment.unix(event.datetime_until).unix();
						if(typeof datetime_until === "number" && datetime_until > 0){
							eventData.datetime_until = datetime_until;
						}
					}

					console.log("EventData: ", eventData);

					// TODO: time-periods

					return new Event(eventData);
				});

				if (overwrite) {
					this._events.next(List(results));
				} else {
					this._events.next(List(this._events.getValue().concat(List(results))));
				}

				this._loadingStatus.next(
					this.loadingStatusAdapter.adapt({
						moreAvailable: response.moreAvailable,
						totalNumber: response.totalNumber,
						start: response.lastElementIndex,
					})
				);

				return true;
			})
		);
	}
}
