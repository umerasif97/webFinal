import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { LocalNotifications } from '@ionic-native/local-notifications';
import moment from 'moment';
import { ListPage } from '../list/list';

/**
 * Generated class for the AddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add',
  templateUrl: 'add.html',
})
export class AddPage {
  itemInfo: AngularFireList<any>;
  item = { id: '', name: '', picture: '', quantity:'', expiryDate: '', expiryTime: '', reminder: '' };
  imageURL = '';
  minDate;
  maxDate;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public db: AngularFireDatabase,
    private camera: Camera,
    public alertCtrl: AlertController,
    public localNotifications: LocalNotifications) {
      this.minDate = moment.utc().startOf('day').add(0, 'day').format('YYYY-MM-DD');
      this.maxDate = moment.utc().add(5, 'y').format('YYYY-MM-DD');
      this.itemInfo = db.list('/items');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPage');
  }

  takePhoto() {

    const options: CameraOptions = {
      sourceType: this.camera.PictureSourceType.CAMERA,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
      //      targetWidth: 1000,
      //      targetHeight: 1000
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is a base64 encoded string
      this.imageURL = "data:image/jpeg;base64," + imageData;
    }, (err) => {
      console.log(err);
    });

  }


  // accessGallery() {
  //   this.camera.getPicture({
  //     sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
  //     destinationType: this.camera.DestinationType.DATA_URL
  //   }).then((imageData) => {
  //     this.imageURL = 'data:image/jpeg;base64,' + imageData;
  //     console.log(this.imageURL);
  //   }, (err) => {
  //     // let errAlert = this.alertCtrl.create({
  //     //   title: err,
  //     //   buttons: ['OK']
  //     // });
  //     // errAlert.present();
  //     console.log(err);
  //   });
  // }



  guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }

  list(){
    this.navCtrl.push(ListPage);
  }

  addItem(name, quantity, expiryDate, expiryTime) {
    let notificationDay = new Date(expiryDate+":"+expiryTime);
    //console.log(notificationDay);
    let notification = {
      title: 'POST EXPIRY',
      text: 'Your post is about to expire',
      at: notificationDay
    }
    //console.log(notification);
    this.localNotifications.schedule(notification);
    console.log(notificationDay);
    this.itemInfo.push({
      id: this.guid(),
      name: name,
      quantity: quantity,
      picture: this.imageURL,
      expiryDate: expiryDate,
      expiryTime: expiryTime
    });
    this.item.picture = '';
    this.item.name = '';
    this.item.quantity = '';
    this.item.expiryDate = '';
    this.item.expiryTime = '';
    let alert1 = this.alertCtrl.create({
      title: 'Successfully Added!',
      subTitle: 'You have successfully added the item.',
      buttons: ['Ok']
    });
    alert1.present();
  }
}

