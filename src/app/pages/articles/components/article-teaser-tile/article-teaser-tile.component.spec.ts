import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ArticleTeaserTileComponent } from "./article-teaser-tile.component";

describe("ArticleTeaserTileComponent", () => {
	let component: ArticleTeaserTileComponent;
	let fixture: ComponentFixture<ArticleTeaserTileComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ArticleTeaserTileComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ArticleTeaserTileComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
