import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { LazyLoadImageModule, LoadImageProps } from 'ng-lazyload-image';

import { AuthService } from './services/auth/auth.service';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthGuardService } from './services/auth/auth-guard.service';
import { TokenStorage } from './services/auth/token-storage.service';
import { AuthInterceptor } from './services/auth/auth.interceptor';

import { SplashPage } from './pages/splash/splash.page';
import { CoreModule } from './core/core.module';

import { environment } from "./../environments/environment";

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

function loadImage({ imagePath }: LoadImageProps): Promise<string> {
  // console.log("imagePath: ", imagePath);
  try {
    const qIndex = imagePath.indexOf('?');

    if (qIndex < 0) {
      throw { message: "Normal filename", filename: imagePath };
    }

    const filename = imagePath.slice(0, qIndex);
    if (filename.length <= 0) {
      throw { message: "Normal filename", filename: imagePath };
    }

    const params = new URLSearchParams(imagePath.slice(qIndex));
    if (!params.has('page')) {
      throw { message: "Normal filename", filename: filename };
    }

    const pageid = params.get('page');
    params.set('file', filename);
    params.delete('page');

    return fetch(environment.api_url + 'file/' + pageid + (params.toString().length > 1 ? '?' + params.toString() : ''), {
      headers: {
        'x-api-key': environment.api_key
      },
    }).then(res => res.blob()).then(blob => URL.createObjectURL(blob));
  } catch (e) {
    // console.log("erRoR: ", e);
    if (typeof e === 'object' && e.filename) {
      return fetch(e.filename).then(res => res.blob()).then(blob => URL.createObjectURL(blob));
    }
  }
  return fetch(imagePath).then(res => res.blob()).then(blob => URL.createObjectURL(blob));
}

@NgModule({
  declarations: [AppComponent, SplashPage],
  entryComponents: [
    AppComponent,
    SplashPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    CoreModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    }),
    IonicStorageModule.forRoot(),
    LazyLoadImageModule.forRoot({ loadImage })
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AuthService,
    AuthGuardService,
    TokenStorage,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }
  ],
  exports: [LazyLoadImageModule],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
