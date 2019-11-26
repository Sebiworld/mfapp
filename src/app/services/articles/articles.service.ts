import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Article, ArticleAdapter } from "../../models/article.model";
import { ApiService } from "../api/api.service";
import { HttpParams } from "@angular/common/http";
import { LoadingStatus, LoadingStatusAdapter } from "../../models/loading-status.model";
import { map, flatMap } from "rxjs/operators";
import * as moment from 'moment';

@Injectable({
	providedIn: "root",
})
export class ArticlesService {
	private _articles: BehaviorSubject<Article[]> = new BehaviorSubject([]);
	// The load status of the last API request is saved here. (Are there any unloaded elements? What is the total number?)
	private _loadingStatus: BehaviorSubject<LoadingStatus> = new BehaviorSubject(new LoadingStatus());

	constructor(private apiService: ApiService, private articleAdapter: ArticleAdapter, private loadingStatusAdapter: LoadingStatusAdapter) {
		this.loadInitialData();
	}

	get articles(): Observable<Article[]> {
		return this._articles.asObservable();
	}
	get status(): Observable<LoadingStatus> {
		return this._loadingStatus.asObservable();
	}

	private loadInitialData() {
		this.loadArticles(true).subscribe(
			response => console.log("ArticlesService response: ", response),
			error => console.log("Error when retrieving articles", error)
		);
	}

	public reload() {
		return this.loadArticles(true);
	}

	public loadMore() {
		return this.loadArticles();
	}

	public loadDetail(articleid: number, overwrite: boolean = false) {
		const article = this._articles.getValue().find((articles: Article) => articles.id === articleid);
		if (overwrite || article === undefined || !article.detailsLoaded) {
			return this.apiService.getPage(articleid).pipe(
				map(articledetails => {
					articledetails.detailsLoaded = true;
					let articles = this._articles.getValue();
					let index = articles.findIndex((article: Article) => article.id === articledetails.id);
					if (index >= 0) {
						// article already exists
						articles[index] = this.articleAdapter.adapt(articledetails);
					} else {
						// article does not yet exist
						articles.push(this.articleAdapter.adapt(articledetails));
					}
					this._articles.next(articles);
					return true;
				})
			);
		}
	}

	public detail(articleid: number): Observable<Article> {
		return this._articles.asObservable().pipe(
			map((articles: Article[]) => {
				return articles.find((articles: Article) => articles.id === articleid);
			})
		);
	}

	private loadArticles(overwrite: boolean = false) {
		if (overwrite) {
			this._articles.next([]);
			this._loadingStatus.next(new LoadingStatus());
		}

		if (!this._loadingStatus.getValue().moreAvailable) {
			throw "All articles have been loaded. No further items can be loaded.";
		}

		const currentLoadingStatus = this._loadingStatus.getValue();
		let params = new HttpParams()
			.append("start", "" + currentLoadingStatus.start)
			.append("limit", "15")
			.append("sort", "datetime_from")
			.append("start_date", "TODAY");
		return this.apiService.getArticles(params).pipe(
			map(response => {
				// console.log("Articles loaded: ", response);

				if (
					response.totalNumber === undefined ||
					response.moreAvailable === undefined ||
					response.lastElementIndex === undefined ||
					response.articles === undefined ||
					!Array.isArray(response.articles)
				) {
					this._loadingStatus.next(
						this.loadingStatusAdapter.adapt(
							{
								start: 0,
								totalNumber: 0,
								moreAvailable: false
							}
						)
					);
					throw "An error occurred during the request.";
				}

				let results = response.articles.map((data: any[]) => {
					return this.articleAdapter.adapt(data);
				});

				if (overwrite) {
					this._articles.next(results);
				} else {
					this._articles.next(this._articles.getValue().concat(results));
				}

				console.log(results);

				this._loadingStatus.next(
					this.loadingStatusAdapter.adapt(response)
				);

				return true;
			})
		);
	}
}
