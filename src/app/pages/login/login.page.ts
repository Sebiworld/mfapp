import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AlertController } from "@ionic/angular";
import { AuthService } from "./../../services/auth/auth.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
	selector: "app-login",
	templateUrl: "./login.page.html",
	styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
	public loginForm: FormGroup;

	constructor(
		public authService: AuthService,
		public alertCtrl: AlertController,
		private formBuilder: FormBuilder,
		private router: Router,
		private route: ActivatedRoute
	) {
		this.loginForm = this.formBuilder.group({
			username: ["", Validators.required],
			pass: ["", Validators.required],
		});
	}

	ngOnInit() {}

	loginSubmit() {
		if (!this.loginForm.valid) {
			console.log("Formdata not valid.");
			return;
		}

		const result = this.authService
			.login(
				this.loginForm.controls["username"].value,
				this.loginForm.controls["pass"].value
			)
			.subscribe(isLoggedIn => {
				console.log("Login-Response: ", isLoggedIn);
				if (isLoggedIn === true) {
					this.loginForm.reset();
					const queryParams = this.route.snapshot.queryParams;
					const redirect = queryParams["redirect"] || "/";
					this.router.navigateByUrl(decodeURI(redirect));
				}else{
					console.log("Login failed.");
				}
			}, error => {
				console.log("Login failed.", error);
			});

		// Login successful
		// this.loginForm.reset();
		// const queryParams = this.route.snapshot.queryParams;
		// const redirect = queryParams["redirect"] || "/";
		// this.router.navigateByUrl(decodeURI(redirect));
	}
}
