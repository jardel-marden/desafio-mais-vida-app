import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, App } from 'ionic-angular';
import { User } from '../../models/user';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  user = {} as User;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toast: ToastController, public loadingCtrl: LoadingController,
    public authProvider: AuthProvider, public app:App) {
    this.user.email = "admin";
    this.user.password = "010203";
  }

  login() {
    let loading = this.loadingCtrl.create({content: 'Aguarde...'});
    loading.present();

    this.authProvider.auth(this.user).subscribe(auth => {
      localStorage.setItem('token', auth);
      this.navCtrl.setRoot('MedicosPage');
      loading.dismiss();
    }, err => {
      if (err.error.text !== null) {
        localStorage.setItem('token', err.error.text);
        this.navCtrl.setRoot('MedicosPage');
      } else {
          this.presentToast('Opss...Problemas de comunicação! ;x');
      }
      loading.dismiss();
    });
  }

  presentToast(msg:string) {
    this.toast.create({
      message: msg,
      duration: 3000,
      position: "top"
    }).present();
  }
}
