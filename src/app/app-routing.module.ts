import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuardService } from "./services/auth/auth-guard.service";

const routes: Routes = [
	{
		path: "",
		redirectTo: "home",
		pathMatch: "full",
	},
	{
		path: "home",
		loadChildren: "./pages/home/home.module#HomePageModule",
	},
	{
		path: "articles",
		loadChildren: "./pages/articles/articles.module#ArticlesPageModule",
		canActivate: [AuthGuardService],
	},
	{
		path: "timetable",
		loadChildren: "./pages/timetable/timetable.module#TimetablePageModule",
		canActivate: [AuthGuardService],
		data: {
			needsPermissions: ["timetable-view"],
		},
	},
	{ path: "login", loadChildren: "./pages/login/login.module#LoginPageModule" },
	{
		path: "detail/:id",
		loadChildren: "./pages/detail/detail.module#DetailPageModule",
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
