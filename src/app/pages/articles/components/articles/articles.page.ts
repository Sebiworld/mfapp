import { Component, ViewChild } from "@angular/core";
import { IonInfiniteScroll } from "@ionic/angular";
import { ArticlesService } from 'src/app/services/articles/articles.service';

@Component({
	selector: "app-articles",
	templateUrl: "./articles.page.html",
	styleUrls: ["./articles.page.scss"],
})
export class ArticlesPage {
	@ViewChild(IonInfiniteScroll, {static: true}) infiniteScroll: IonInfiniteScroll;

	constructor(public articlesService: ArticlesService) {}

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
}
