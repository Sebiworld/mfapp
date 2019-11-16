import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Observable, throwError } from "rxjs";
import { map, catchError, switchMap, tap } from "rxjs/operators";
import { ToastController } from "@ionic/angular";
import {
	HttpErrorResponse,
	HttpResponse,
	HttpRequest,
} from "@angular/common/http";

import { User } from "./../../models/user.model";
import { ApiService } from "../api/api.service";
import { TokenStorage } from "./token-storage.service";
import { Router } from "@angular/router";
import { environment } from "../../../environments/environment";

// Key for storing the current user in the local storage:
const CURRENT_USER = "currentUser";

@Injectable({
	providedIn: "root",
})
export class AuthService {
	// If a URL could not be called due to login problems, it is saved here for later use:
	private interruptedUrl: string;

	// Current user is a BehaviorSubject, changes can be tracked by subscription:
	private currentUser$: BehaviorSubject<User> = new BehaviorSubject(
		this.restoreUser()
	);

	constructor(
		private toastController: ToastController,
		private apiService: ApiService,
		private tokenStorage: TokenStorage,
		private router: Router
	) {}

	/**
	 * Checks whether an Access token is present
	 */
	public isAuthenticated(): Observable<boolean> {
		return this.tokenStorage.getAccessToken().pipe(map(token => !!token));
	}

	/**
	 * Returns the current access token.
	 */
	public getAccessToken(): Observable<string> {
		return this.tokenStorage.getAccessToken();
	}

	/**
	 * Renews the current access token.
	 * @param tkn Refresh-Token
	 */
	public refreshToken(tkn: string = ""): Observable<string> {
		if (tkn.length > 0) {
			this.tokenStorage.setRefreshToken(tkn);
		}
		return this.tokenStorage.getRefreshToken().pipe(
			switchMap((refreshToken: string) =>
				this.apiService.loadAccessToken(refreshToken)
			),
			map((accessTokenRequest) => {
				// Request was successful. The access token is defined and saved.
				this.tokenStorage.setAccessToken(accessTokenRequest.access_token);
				if(accessTokenRequest.refresh_token){
					this.tokenStorage.setRefreshToken(accessTokenRequest.refresh_token);
				}
				return accessTokenRequest.access_token;
			}),
			catchError(err => {
				// If an error occurs here, the user is logged out:
				this.logout();
				return Observable.throw(err);
			})
		);
	}

	/**
	 * Checks whether an incoming HTTP error indicates that the access token must be renewed.
	 * @param response
	 */
	public refreshShouldHappen(response: HttpErrorResponse): boolean {
		if (response.error.additionals) {
			if (response.error.can_renew) {
				return true;
			}
		}

		return false;
	}

	/**
	 * Checks if an outgoing request is a token request (then the interceptor must not intercept!)
	 * @param url
	 */
	public verifyTokenRequest(request: HttpRequest<any>): boolean {
		// For the POST actions "access" and "auth" the interceptor must not start, as this would lead to cycles.
		if (request.method !== "POST") {
			return false;
		}

		if(request.url !== environment.api_url + 'auth' && request.url !== environment.api_url + 'access'){
			return false;
		}

		return true;
	}

	public getInterruptedUrl(): string {
		return this.interruptedUrl;
	}

	public setInterruptedUrl(url: string): void {
		this.interruptedUrl = url;
	}

	/**
	 * Logs in the user. If successful, a toast message is displayed.
	 */

	public login(username, pass): Observable<boolean> {
		return this.apiService.login(username, pass).pipe(
			switchMap(refreshToken => this.refreshToken(refreshToken)),
			switchMap(() => this.refreshUserInformation()),
			map((user: User) => !user.isGuest()),
			tap(success => {
				if (success) {
					this.showMessage(
						"You have been successfully registered.",
						"success",
						"Thanks!"
					);
				} else {
					this.showMessage("The login failed.", "warning");
				}
			}),
			catchError(error => {
				this.showMessage("The login failed.", "warning");
				this.setUser(User.newInstance());
				this.tokenStorage.clear();
				return throwError(error.error);
			})
		);
	}

	/**
	 * Log off the user and delete all stored data
	 */
	logout(): void {
		this.showMessage("You have been successfully logged out.", "success", "Danke!");

		this.setUser(User.newInstance());
		this.tokenStorage.clear();

		// Reload current page:
		this.router.navigate(["/"]);
	}

	/**
	 * Defines a user as the current user and saves him for later use.
	 * @param user
	 */
	private setUser(user: User): void {
		localStorage.setItem(CURRENT_USER, user.serialize());
		this.currentUser$.next(user);
	}

	private refreshUserInformation(): Observable<User> {
		return this.apiService.userInfo().pipe(
			map(response => {
				let user = this.currentUser$.getValue();
				if (user.id !== response.id) {
					// Another user is linked to the current token...
					user = User.newInstance();
				}
				user.id = response.id;
				user.name = response.name;
				if (!user.isGuest()) {
					// Automatically give logged in users view rights to the sample plan:
					user.permissions = ["timetable-view"];
				}
				this.setUser(user);
				return user;
			})
		);
	}

	/*
	 * Restores information about a user from the LocalStorage. Is called when the app is reloaded or initialized.
	 */
	private restoreUser(): User {
		if (localStorage.getItem(CURRENT_USER) != null) {
			let nutzer = User.newInstance();
			nutzer.deserialize(localStorage.getItem(CURRENT_USER));
			console.log("User restored: ", nutzer);
			if (nutzer.isGuest()) {
				this.tokenStorage.clear();
			}
			return nutzer;
		}

		console.log("No user could be restored.");
		this.tokenStorage.clear();
		return User.newInstance();
	}

	/**
	 * Returns the current user as an observable stream.
	 */
	public currentUser(): Observable<User> {
		return this.currentUser$.asObservable();
	}

	/**
	 * Returns the current user.
	 */
	public currentUserStatic(): User {
		return this.currentUser$.getValue();
	}

	public hasPermissions(permissions: Array<string>): Observable<boolean> {
		return this.currentUser$.pipe(
			map(user => {
				return user.hasPermissions(permissions);
			})
		);
	}

	/**
	 * Displays a toast message
	 * @param message
	 * @param cssClass Klasse für die CSS-Farben (z.B. 'danger', 'success', 'warning' or 'primary')
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
