import { Injectable } from "@angular/core";
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
	HttpErrorResponse,
	HttpClient,
} from "@angular/common/http";
import { Observable, throwError, Subject } from "rxjs";
import { catchError, switchMap, map, first } from "rxjs/operators";

import { AuthService } from "./auth.service";

@Injectable({
	providedIn: "root",
})
export class AuthInterceptor implements HttpInterceptor {
	// If true, a token refresh request is currently in progress
	private refreshInProgress = false;
	private refreshSubject: Subject<boolean> = new Subject<boolean>();

	constructor(private authService: AuthService, private http: HttpClient) {}

	// Intercepts every outgoing request:
	intercept(
		request: HttpRequest<any>,
		delegate: HttpHandler
	): Observable<HttpEvent<any>> {
		// If the request is a token request, the token must not be mounted. This could lead to errors or endless loops:
		if (this.authService.verifyTokenRequest(request)) {
			return delegate.handle(request);
		}

		// All normal requests will be handled:
		return this.processIntercept(request, delegate);
	}

	/**
	 * Checks a request. Intercepts errors and inserts tokens.
	 */
	private processIntercept(
		original: HttpRequest<any>,
		httpHandler: HttpHandler
	): Observable<HttpEvent<any>> {
		const clonedRequest: HttpRequest<any> = original.clone();

		return this.request(clonedRequest).pipe(
			switchMap((req: HttpRequest<any>) => httpHandler.handle(req)),
			catchError((res: HttpErrorResponse) => this.responseError(clonedRequest, res))
		);
	}

	/**
	 * Adds a token to the request hizu. If a token renewal is in progress, the request is delayed.
	 */
	private request(req: HttpRequest<any>): Observable<HttpRequest<any>> {
		if (this.refreshInProgress) {
			return this.delayRequest(req);
		}

		return this.addToken(req);
	}

	/**
	 * Error handling. If a new access token is requested in the error, this is organized here.
	 */
	private responseError(
		req: HttpRequest<any>,
		res: HttpErrorResponse
	): Observable<HttpEvent<any>> {
		const refreshShouldHappen: boolean = this.authService.refreshShouldHappen(
			res
		);

		if (refreshShouldHappen) {
			if (!this.refreshInProgress) {
				this.refreshInProgress = true;

				this.authService.refreshToken().subscribe(
					() => {
						// Success
						this.refreshInProgress = false;
						this.refreshSubject.next(true);
					},
					() => {
						// Error
						this.refreshInProgress = false;
						this.refreshSubject.next(false);
					}
				);
			} else {
				return this.retryRequest(req, res);
			}
		}

		return throwError(res);
	}

	private refreshIfNecessary() {}

	/**
	 * Adds an access token to the request headers.
	 */
	private addToken(req: HttpRequest<any>): Observable<HttpRequest<any>> {
		return this.authService.getAccessToken().pipe(
			map((token: string) => {
				if (token) {
					// console.log("Token wird hinzugefügt: ", token, req);
					let setHeaders = { Authorization: `Bearer ${token}` };
					return req.clone({
						setHeaders: setHeaders,
						// params: req.params.append("tkn", token)
					});
				}

				return req;
			}),
			first()
		);
	}

	/**
	 * Delays a request until the token renewal is complete.
	 */
	private delayRequest(req: HttpRequest<any>): Observable<HttpRequest<any>> {
		return this.refreshSubject.pipe(
			first(),
			switchMap(
				(status: boolean) => (status ? this.addToken(req) : throwError(req))
			)
		);
	}

	/**
	 * Attempts to re-execute a failed or delayed request.
	 */
	private retryRequest(
		req: HttpRequest<any>,
		res: HttpErrorResponse
	): Observable<HttpEvent<any>> {
		return this.refreshSubject.pipe(
			first(),
			switchMap(
				(status: boolean) =>
					status ? this.http.request(req) : throwError(res || req)
			)
		);
	}
}
