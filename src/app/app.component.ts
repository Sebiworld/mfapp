import { Component } from "@angular/core";

import { Platform, ModalController } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { TranslateService } from '@ngx-translate/core';

import { AuthService } from "./services/auth/auth.service";
import { SplashPage } from "./pages/splash/splash.page";

@Component({
	selector: "app-root",
	templateUrl: "app.component.html",
})
export class AppComponent {
	constructor(
		private platform: Platform,
		private splashScreen: SplashScreen,
		private statusBar: StatusBar,
		public authService: AuthService,
		private modalCtrl: ModalController,
		private translate: TranslateService
	) {
		this.initializeApp();
	}

	async initializeApp() {
		this.translate.setDefaultLang('en');
		this.translate.use('de');

		this.platform.ready().then(() => {
			this.statusBar.styleDefault();
			this.statusBar.styleBlackOpaque();
			// this.splashScreen.hide();
			// this.presentModal();
		});
	}

	async presentModal() {
		const splash = await this.modalCtrl.create({
			component: SplashPage,
			componentProps: { value: 123 },
			backdropDismiss: false,
			keyboardClose: false,
			cssClass: 'splash-modal'
		});
		return await splash.present();
	  }
}
