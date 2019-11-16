import { Component, OnInit } from "@angular/core";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { ModalController } from "@ionic/angular";
import anime from 'animejs/lib/anime.es.js';
import { StatusBar } from "@ionic-native/status-bar/ngx";

@Component({
	selector: "app-splash",
	templateUrl: "./splash.page.html",
	styleUrls: ["./splash.page.scss"],
})
export class SplashPage implements OnInit {
	constructor(
		private splashScreen: SplashScreen,
		private modalCtrl: ModalController,
		private statusBar: StatusBar
	) {}

	ngOnInit() {}

	ionViewDidEnter() {
		this.splashScreen.hide();
		this.statusBar.hide();

		var timelineParameters = anime.timeline({
			// direction: "alternate",
			loop: true,
		});

		// timelineParameters
		// 	.add({
		// 		targets: ".splash-animation .logo",
		// 		translateY: -100,
		// 		duration: 700,
		// 		easing: [0.91, -0.54, 0.29, 1.26],
		// 		delay: 1000,
		// 		elasticity: 500,
		// 	})
		// 	.add({
		// 		targets: ".splash-animation .logo",
		// 		translateY: 0,
		// 		duration: 1000,
		// 		elasticity: 600,
		// 	})
		// 	.add({
		// 		targets: ".splash-animation .logo",
		// 		translateX: 80,
		// 		rotate: 360,
		// 		duration: 1400,
		// 		delay: 1000,
		// 		easing: "easeInOutCubic",
		// 		elasticity: 300,
		// 	})
		// 	.add({
		// 		targets: ".splash-animation .logo",
		// 		translateX: 0,
		// 		rotate: 0,
		// 		duration: 1200,
		// 		easing: "easeInOutCubic",
		// 		elasticity: 500,
		// 	})
		// 	.add({
		// 		targets: ".splash-animation .logo",
		// 		translateY: -100,
		// 		duration: 700,
		// 		easing: [0.91, -0.54, 0.29, 1.26],
		// 		delay: 1000,
		// 		elasticity: 500,
		// 	})
		// 	.add({
		// 		targets: ".splash-animation .logo",
		// 		translateY: 0,
		// 		duration: 1000,
		// 		elasticity: 600,
		// 	})
		// 	.add({
		// 		targets: ".splash-animation .logo",
		// 		translateX: -80,
		// 		rotate: -360,
		// 		duration: 1400,
		// 		easing: "easeInOutCubic",
		// 		elasticity: 500,
		// 		delay: 1000,
		// 	})
		// 	.add({
		// 		targets: ".splash-animation .logo",
		// 		translateX: 0,
		// 		rotate: 0,
		// 		duration: 1200,
		// 		easing: "easeInOutCubic",
		// 		elasticity: 500,
		// 	});

		// setTimeout(() => {
			this.modalCtrl.dismiss();
			this.statusBar.styleBlackOpaque();
			this.statusBar.show();
		// }, 4200);
	}
}
