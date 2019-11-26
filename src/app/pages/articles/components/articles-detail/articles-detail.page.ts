import { Component, OnInit, OnChanges, ElementRef, Input, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable, BehaviorSubject, EMPTY, Subscription } from "rxjs";
import { map, tap, switchMap, single, filter, find, distinctUntilChanged } from "rxjs/operators";
import { ApiService } from "@services/api/api.service";
import { DomSanitizer, SafeStyle } from "@angular/platform-browser";
import { ArticlesService } from '@app/services/articles/articles.service';
import { Article } from '@app/models/article.model';

@Component({
	selector: 'app-articles-detail',
	templateUrl: './articles-detail.page.html',
	styleUrls: ['./articles-detail.page.scss'],
})
export class ArticlesDetailPage implements OnInit, OnDestroy {
	private _id;
	public article$: Observable<Article>;

	private subscription: Subscription;

	private mainImageDataUrl$: Observable<SafeStyle> = new BehaviorSubject('');

	constructor(
		private route: ActivatedRoute,
		private apiService: ApiService,
		private domSanitizer: DomSanitizer,
		private elementRef: ElementRef,
		public articlesService: ArticlesService
	) { }

	ngOnInit(): void {
		const idObservable$ = this.route.paramMap.pipe(
			map(params => +params.get('id')),
			filter(id => id > 0),
			distinctUntilChanged()
		);

		this.article$ = idObservable$.pipe(
			switchMap(id => this.articlesService.detail(id)),
			filter(article => article instanceof Article),
			map(article => {
				article.authorsString = '';
				if (article.authors && Array.isArray(article.authors)) {
					if (article.authors.length === 1) {
						article.authorsString = article.authors[0];
					} else if (article.authors.length > 1) {
						const lastAuthor = article.authors.pop();
						article.authorsString = article.authors.join(', ');
						article.authorsString += " & " + lastAuthor;
					}
				}
				return article;
			}),
			tap(article => {
				this.elementRef.nativeElement.style.setProperty(
					"--ion-color-primary",
					'#' + article.color
				);
			})
		);

		this.subscription = idObservable$.pipe(
			switchMap(id => this.articlesService.loadDetail(id))
		).subscribe();

		this.mainImageDataUrl$ = this.article$.pipe(
			switchMap((article) => {
				if (
					!article.id ||
					!article.main_image ||
					!article.main_image.basename
				) {
					return EMPTY;
				}

				return this.apiService
					.loadImage(article.id, article.main_image.basename)
					.pipe(
						map(image => {
							return this.domSanitizer.bypassSecurityTrustStyle(
								"url(" + image + ")"
							);
						})
					);
			})
		)
	}

	doRefresh(event) {
		this.articlesService.loadDetail(+this.route.snapshot.paramMap.get("id"), true).subscribe(() => {
			event.target.complete();
		});
	}

	loadData(): Observable<any> {
		return this.apiService.getPage(this._id).pipe(
			tap(response => {
				console.log("Detail-Page loaded: ", response);
			})
		);
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	// public mainImageDataUrl$ = this.mainImageSrc$.pipe(
	// 	switchMap(() => {
	// 		if (
	// 			!this.page.id ||
	// 			!this.page.main_image ||
	// 			!this.page.main_image.basename
	// 		) {
	// 			return EMPTY;
	// 		}

	// 		return this.apiService
	// 			.loadImage(this.page.id, this.page.main_image.basename)
	// 			.pipe(
	// 				map(image => {
	// 					return this.domSanitizer.bypassSecurityTrustStyle(
	// 						"url(" + image + ")"
	// 					);
	// 				})
	// 			);
	// 	})
	// );
}
