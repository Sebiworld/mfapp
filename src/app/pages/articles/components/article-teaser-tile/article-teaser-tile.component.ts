import { Component, OnInit, Input, OnChanges, ElementRef } from "@angular/core";
import { ApiService } from "@services/api/api.service";
import { BehaviorSubject, EMPTY, Observable } from "rxjs";
import { switchMap, map, tap } from "rxjs/operators";
import { DomSanitizer } from "@angular/platform-browser";
import { Router } from "@angular/router";

@Component({
	selector: "app-article-teaser-tile",
	templateUrl: "./article-teaser-tile.component.html",
	styleUrls: ["./article-teaser-tile.component.scss"],
})
export class ArticleTeaserTileComponent implements OnInit, OnChanges {
	@Input()
	article: any;

	@Input()
	private mainImageSrc: string;
	private mainImageSrc$ = new BehaviorSubject(this.mainImageSrc);

	constructor(
		private apiService: ApiService,
		private domSanitizer: DomSanitizer,
		private elementRef: ElementRef,
		private router: Router
	) {}

	public mainImageDataUrl$ = this.mainImageSrc$.pipe(
		switchMap(() => {
			if (
				!this.article.id ||
				!this.article.main_image ||
				!this.article.main_image.basename
			) {
				return EMPTY;
			}
			
			return this.apiService
				.loadImage(this.article.id, this.article.main_image.basename)
				.pipe(
					map(image => {
						return this.domSanitizer.bypassSecurityTrustStyle(
							"url(" + image + ")"
						);
					})
				);
		})
	);

	public color = "#FC8F00";

	ngOnChanges(): void {
		this.mainImageSrc$.next(this.mainImageSrc);
	}

	ngOnInit(): void {
		if(this.article.color){
			this.color = '#' + this.article.color;
			this.elementRef.nativeElement.style.setProperty('--ion-color-primary', this.color);
		}
	}
}
