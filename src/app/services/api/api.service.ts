import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient, HttpParams } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { environment } from "../../../environments/environment";
import { DomSanitizer } from "@angular/platform-browser";

@Injectable({
	providedIn: "root",
})
export class ApiService {
	constructor(
		private httpClient: HttpClient,
		private domSanitizer: DomSanitizer
	) { }

	private formatErrors(error: any) {
		console.log("API Error: ", error);
		return throwError(error.error);
	}

	get(
		endpoint: string,
		params: HttpParams = new HttpParams(),
		options: Object = {},
		headers: {
			[name: string]: string
		} = {}
	): Observable<any> {
		headers = Object.assign(headers, { 'x-api-key': environment.api_key });
		options = Object.assign(options, { params: params, headers: new HttpHeaders(headers) });

		return this.httpClient
			.get(environment.api_url + endpoint, options)
			.pipe(catchError(this.formatErrors));
	}

	put(endpoint: string, body: Object = {}, headers: {
		[name: string]: string
	} = {}): Observable<any> {
		headers = Object.assign(headers, { 'x-api-key': environment.api_key });

		const httpOptions = {
			headers: new HttpHeaders(headers)
		};

		return this.httpClient
			.put(environment.api_url + endpoint, JSON.stringify(body), httpOptions)
			.pipe(catchError(this.formatErrors));
	}

	post(endpoint: string, body: Object = {}, headers: {
		[name: string]: string
	} = {}): Observable<any> {

		headers = Object.assign(headers, { 'x-api-key': environment.api_key });

		const httpOptions = {
			headers: new HttpHeaders(headers)
		};

		return this.httpClient
			.post(environment.api_url + endpoint, JSON.stringify(body), httpOptions)
			.pipe(catchError(this.formatErrors));
	}

	/**
	 * Returns the request URL for a specific image
	 * @param page_id
	 * @param filename
	 */
	loadImage(
		page_id: number,
		filename: string,
		params: HttpParams = new HttpParams()
	): Observable<any> {
		params = params.append("file", filename);

		return this.get('file/' + page_id, params, { responseType: "blob" }).pipe(
			map(e => URL.createObjectURL(e)),
			// tap(result => console.log("RS: ", filename))
			// map(e => this.domSanitizer.bypassSecurityTrustUrl(URL.createObjectURL(e)))
		);
	}

	login(username: string, pass: string): Observable<string> {
		return this.post('auth', undefined, { 'authorization': 'Basic ' + btoa(username + ':' + pass) }).pipe(
			map(response => {
				if (!response.refresh_token) {
					throwError("No refresh token was received.");
				}
				return response.refresh_token;
			})
		);
	}

	loadAccessToken(refreshToken: string): Observable<{ access_token: string, refresh_token?: string }> {
		return this.post('access', undefined, { 'authorization': 'Bearer ' + (refreshToken) }).pipe(
			map(response => {
				if (!response.access_token) {
					throwError("No access token was received.");
				}

				return response;
			})
		);
	}

	/**
	 * Provides information about the currently logged in user.
	 */
	userInfo(params: HttpParams = new HttpParams()): Observable<any> {
		return this.get('current_user', params);
	}

	getPage(path: string|number, params: HttpParams = new HttpParams()): Observable<any> {
		return this.get('page/' + path, params);
	}

	getArticles(params: HttpParams = new HttpParams()): Observable<any> {
		return this.getPage('aktuelles', params);
	}

	getEvents(params: HttpParams = new HttpParams()): Observable<any> {
		return this.getPage('veranstaltungen', params);
	}
}
