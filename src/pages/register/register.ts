import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 export class User{
   id: string;
   email: string;
   password: string;
 }

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
  providers: [AngularFireAuth]
})
export class RegisterPage {
  dbUser: AngularFireList<any>;
  public user:User = new User();
  repassword;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public fAuth: AngularFireAuth,
    public alertCtrl: AlertController,
    public db: AngularFireDatabase){
      this.dbUser = db.list('/users');
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  login(){
    this.navCtrl.pop();
  }

  async register() {
    if(this.user.password == this.repassword){
      console.log('match');
      try {
        var r = await this.fAuth.auth.createUserWithEmailAndPassword(
          this.user.email,
          this.user.password
        );
        if (r) {
          let basicAlert = this.alertCtrl.create({
            title: 'Successfully registered!',
            buttons: ['OK']
          });
          basicAlert.present();
          this.dbUser.push({
            id: firebase.auth().currentUser.uid,
            email: this.user.email
          })
          this.user.email = '';
          this.user.password = '';
          this.repassword = '';
        }
  
      } catch (err) {
        let basicAlert = this.alertCtrl.create({
          title: err,
          buttons: ['OK']
        });
        basicAlert.present();
      }
    }else{
      let basicAlert = this.alertCtrl.create({
        title: 'Passowrd doesnt match',
        buttons: ['OK']
      });
      basicAlert.present();
    }
    
  }

}
