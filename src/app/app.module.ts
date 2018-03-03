import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule, Http } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { AuthHttp, AuthConfig } from 'angular2-jwt';

import { MyApp } from './app.component';
import { AuthProvider } from '../providers/auth/auth';
import { LocalidadeProvider } from '../providers/localidade/localidade';
import { EspecialidadeProvider } from '../providers/especialidade/especialidade';
import { MedicoProvider } from '../providers/medico/medico';

export function getAuthHttp(http) {
  return new AuthHttp(new AuthConfig({
    headerPrefix: '',
    noJwtError: true,
    tokenGetter: (() => localStorage.getItem('token')),
    globalHeaders: [{'Content-Type':'application/json'}],
  }), http);
};

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {
      provide: AuthHttp,
      useFactory: getAuthHttp,
      deps: [Http]
    },
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    LocalidadeProvider,
    EspecialidadeProvider,
    MedicoProvider
  ]
})
export class AppModule {}
