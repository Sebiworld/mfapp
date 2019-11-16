import { Component, OnInit, ViewChild, OnChanges } from "@angular/core";
import { ApiService } from "../../services/api/api.service";
import { IonInfiniteScroll } from "@ionic/angular";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { HttpParams } from "@angular/common/http";
import { TimetableService } from "../../services/timetable/timetable.service";

@Component({
	selector: "app-timetable",
	templateUrl: "./timetable.page.html",
	styleUrls: ["./timetable.page.scss"],
})
export class TimetablePage implements OnInit {
	@ViewChild(IonInfiniteScroll, {static: true}) infiniteScroll: IonInfiniteScroll;

	// public events;

	// private moreAvailable: boolean = true;
	// private lastElementIndex: number = 0;
	// public totalNumber: number = 0;

	constructor(private apiService: ApiService, public timetableService: TimetableService) {

	}

	ngOnInit() {
		// Initialize TimetableService. The first appointments are loaded automatically.
		// this.timetableService.events.subscribe(events => {
		// 	console.log("timetableService geladen: ", events);
		// });
		// this.loadData().subscribe(() => {});
	}

	ngOnChanges() {
		
	}

	doRefresh(event) {
		this.timetableService.reload().subscribe(() => {
			event.target.complete();
		});
	}

	doInfiniteLoad(event) {
		this.timetableService.loadMore().subscribe(response => {
			event.target.complete();
		});
	}

	// loadData(overwrite: boolean = false): Observable<boolean> {
		// if (overwrite) {
		// 	this.moreAvailable = true;
		// 	this.lastElementIndex = 0;
		// }

		// let params = new HttpParams()
		// 	.append("start", "" + this.lastElementIndex)
		// 	.append("limit", "15")
		// 	.append("sort", "datetime_from")
		// 	.append("start_date", "TODAY");
		// return this.apiService.getEvents(params).pipe(
		// 	map(response => {
		// 		console.log("Events loaded: ", response);

		// 		if (
		// 			response.totalNumber === undefined ||
		// 			response.moreAvailable === undefined ||
		// 			response.lastElementIndex === undefined ||
		// 			response.events === undefined ||
		// 			!Array.isArray(response.events)
		// 		) {
		// 			this.moreAvailable = false;
		// 			this.totalNumber = 0;
		// 			this.lastElementIndex = 0;
		// 			return false;
		// 		}

		// 		if (overwrite) {
		// 			this.events = response.events;
		// 		} else {
		// 			this.events = this.events.concat(response.events);
		// 		}

		// 		this.moreAvailable = response.moreAvailable;
		// 		this.totalNumber = response.totalNumber;
		// 		this.lastElementIndex = response.lastElementIndex;
		// 		this.infiniteScroll.disabled = !this.moreAvailable;

		// 		return true;
		// 	})
		// );
	// }
}
