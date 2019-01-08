import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { RegisterPage } from '../pages/register/register';
import { LoginPage } from '../pages/login/login';
import { AddPage } from '../pages/add/add';

import { Camera } from '@ionic-native/camera';
import { LocalNotifications } from '@ionic-native/local-notifications';

var config = {
  apiKey: "AIzaSyDeaIy5Bo_AeHRLVjqAVli_BqtwSyai2dA",
  authDomain: "webproject-ac948.firebaseapp.com",
  databaseURL: "https://webproject-ac948.firebaseio.com",
  projectId: "webproject-ac948",
  storageBucket: "webproject-ac948.appspot.com",
  messagingSenderId: "776286744063"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    RegisterPage,
    LoginPage,
    AddPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    RegisterPage,
    LoginPage,
    AddPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    LocalNotifications,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
