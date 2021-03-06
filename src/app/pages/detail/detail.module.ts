import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { DetailPage } from "./detail.page";
import { SharedModule } from '@shared/shared.module';

const routes: Routes = [
	{
		path: "",
		component: DetailPage,
	},
];

@NgModule({
	imports: [
		CommonModule,
		IonicModule,
		RouterModule.forChild(routes),
		SharedModule
	],
	declarations: [DetailPage],
})
export class DetailPageModule {}
