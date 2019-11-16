import { Injectable } from "@angular/core";
import {
	CanActivate,
	Router,
	ActivatedRouteSnapshot,
	RouterStateSnapshot
} from "@angular/router";
import { AuthService } from "./auth.service";
import { ToastController } from "@ionic/angular";
import { of } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
	providedIn: "root",
})
export class AuthGuardService implements CanActivate {
	constructor(
		private router: Router,
		private authService: AuthService,
		private toastController: ToastController
	) {}

	/**
	 * Checks whether a path is accessible to the current user. Otherwise blocks access and displays an error message.
	 * @param route 
	 * @param state 
	 */
	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		if (
			Array.isArray(route.data.needsPermissions) &&
			route.data.needsPermissions.length > 0
		) {
			return this.authService.currentUser().pipe(
				map(user => {
					if (!user.hasPermissions(route.data.needsPermissions)) {
						if (user.isGuest()) {
							this.router.navigate(["login"], { queryParams: { returnUrl: state.url }});
							this.showMessage(
								"Du musst dich anmelden, um diese Seite zu sehen.",
								"danger",
								"Na gut."
							);
						} else {
							this.router.navigate(["home"]);
							this.showMessage(
								"Du hast nicht die nötigen Berechtigungen, um diese Seite aufzurufen.",
								"danger",
								"Na gut."
							);
						}
						return false;
					}

					return true;
				})
			);
		}

		return of(true);
	}

	/**
	 * Displays a toast message
	 * @param message 
	 * @param cssClass Class for the CSS colors (z.B. 'danger', 'success', 'warning' or 'primary')
	 * @param closeBtnText 
	 */
	async showMessage(
		message: string,
		cssClass: string = "",
		closeBtnText: string = "OK"
	) {
		const toast = await this.toastController.create({
			message: message,
			duration: 5000,
			position: "bottom",
			cssClass: cssClass,
			showCloseButton: true,
			closeButtonText: closeBtnText,
		});
		toast.present();
	}
}
