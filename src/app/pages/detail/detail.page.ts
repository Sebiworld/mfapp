import { Component, OnInit, OnChanges, ElementRef, Input } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HttpParams } from "@angular/common/http";
import { Observable, BehaviorSubject, EMPTY } from "rxjs";
import { map, tap, switchMap } from "rxjs/operators";
import { ApiService } from "../../services/api/api.service";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
	selector: "app-detail",
	templateUrl: "./detail.page.html",
	styleUrls: ["./detail.page.scss"],
})
export class DetailPage implements OnInit, OnChanges {
	private _id;
	public title: string;
	public page;
	public color;
	public authorsString = '';

	@Input()
	private mainImageSrc: string;
	private mainImageSrc$ = new BehaviorSubject(this.mainImageSrc);

	constructor(
		private route: ActivatedRoute,
		private apiService: ApiService,
		private domSanitizer: DomSanitizer,
		private elementRef: ElementRef
	) { }

	private setPage(page) {
		this.page = page;
		this.title = page.title;

		this.color = "#FC8F00";
		if (this.page.color) {
			this.color = "#" + this.page.color;
		}

		this.elementRef.nativeElement.style.setProperty(
			"--ion-color-primary",
			this.color
		);

		this.authorsString = "";
		if (page.authors && Array.isArray(page.authors)) {
			if (page.authors.length === 1) {
				this.authorsString = page.authors[0];
			} else if (page.authors.length > 1) {
				const lastAuthor = page.authors.pop();
				this.authorsString = page.authors.join(', ');
				this.authorsString += " & " + lastAuthor;
			}
		}

		if (this.page.id && this.page.main_image && this.page.main_image.basename) {
			this.mainImageSrc$.next(this.mainImageSrc);
		}
	}

	ionViewWillEnter() {
		// Initially, information can be passed from the parent page, which is displayed as long as the detailed information is loaded:
		if (
			this.route.snapshot.queryParams.id !== undefined &&
			this.route.snapshot.queryParams.title !== undefined
		) {
			this.setPage(this.route.snapshot.queryParams);
		}

		this._id = this.route.snapshot.paramMap.get("id");
		this.loadData().subscribe(response => {
			this.setPage(response);
		});
	}

	doRefresh(event) {
		this.loadData().subscribe(response => {
			this.setPage(response);
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

	public mainImageDataUrl$ = this.mainImageSrc$.pipe(
		switchMap(() => {
			if (
				!this.page.id ||
				!this.page.main_image ||
				!this.page.main_image.basename
			) {
				return EMPTY;
			}

			return this.apiService
				.loadImage(this.page.id, this.page.main_image.basename)
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
		this.mainImageSrc$.next(this.mainImageSrc);
	}

	ngOnInit(): void { }
}
