import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

// Key for storing the refresh token in the local storage:
const REFRESH_TOKEN = "refreshToken";

// Key for storing the access token in the local storage:
const ACCESS_TOKEN = "accessToken";

@Injectable()
export class TokenStorage {
	/**
	 * Get access token
	 * @returns {Observable<string>}
	 */
	public getAccessToken(): Observable<string> {
		const token: string = <string>localStorage.getItem(ACCESS_TOKEN);
		return of(token);
	}

	/**
	 * Get refresh token
	 * @returns {Observable<string>}
	 */
	public getRefreshToken(): Observable<string> {
		const token: string = <string>localStorage.getItem(REFRESH_TOKEN);
		return of(token);
	}

	/**
	 * Set access token
	 * @returns {TokenStorage}
	 */
	public setAccessToken(token: string): TokenStorage {
		localStorage.setItem(ACCESS_TOKEN, token);

		return this;
	}

	/**
	 * Set refresh token
	 * @returns {TokenStorage}
	 */
	public setRefreshToken(token: string): TokenStorage {
		localStorage.setItem(REFRESH_TOKEN, token);

		return this;
	}

	/**
	 * Remove tokens
	 */
	public clear() {
		localStorage.removeItem(ACCESS_TOKEN);
		localStorage.removeItem(REFRESH_TOKEN);
	}
}
