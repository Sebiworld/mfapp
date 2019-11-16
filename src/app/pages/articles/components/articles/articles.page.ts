import { Component, OnInit, ViewChild, OnChanges } from "@angular/core";
import { IonInfiniteScroll } from "@ionic/angular";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { HttpParams } from "@angular/common/http";
import { ArticlesService } from 'src/app/services/articles/articles.service';

@Component({
	selector: "app-articles",
	templateUrl: "./articles.page.html",
	styleUrls: ["./articles.page.scss"],
})
export class ArticlesPage implements OnInit, OnChanges {
	@ViewChild(IonInfiniteScroll, {static: true}) infiniteScroll: IonInfiniteScroll;

	public articles: Array<Object> = [];

	private moreAvailable: boolean = true;
	private lastElementIndex: number = 0;
	public totalNumber: number = 0;

	constructor(private articlesService: ArticlesService) {}

	ngOnInit() {
		// this.loadData().subscribe(() => {});
	}

	ngOnChanges() {
		
	}

	doRefresh(event) {
		this.articlesService.reload().subscribe(() => {
			event.target.complete();
		});
	}

	doInfiniteLoad(event) {
		this.articlesService.loadMore().subscribe(response => {
			event.target.complete();
		});
	}

	// loadData(overwrite: boolean = false): Observable<boolean> {
	// 	if (overwrite) {
	// 		this.moreAvailable = true;
	// 		this.lastElementIndex = 0;
	// 	}

	// 	let params = new HttpParams()
	// 		.append("start", "" + this.lastElementIndex)
	// 		.append("limit", "10");
	// 	return this.apiService.getArticles(params).pipe(
	// 		map(response => {
	// 			console.log("Articles loaded: ", response);

	// 			if (
	// 				response.totalNumber === undefined ||
	// 				response.moreAvailable === undefined ||
	// 				response.lastElementIndex === undefined ||
	// 				response.articles === undefined ||
	// 				!Array.isArray(response.articles)
	// 			) {
	// 				this.moreAvailable = false;
	// 				this.totalNumber = 0;
	// 				this.lastElementIndex = 0;
	// 				return false;
	// 			}

	// 			if (overwrite) {
	// 				this.articles = response.articles;
	// 			} else {
	// 				this.articles = this.articles.concat(response.articles);
	// 			}

	// 			this.moreAvailable = response.moreAvailable;
	// 			this.totalNumber = response.totalNumber;
	// 			this.lastElementIndex = response.lastElementIndex;
	// 			this.infiniteScroll.disabled = !this.moreAvailable;

	// 			return true;
	// 		})
	// 	);
	// }
}
