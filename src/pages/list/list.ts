import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { AddPage } from '../add/add';

/**
 * Generated class for the ListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {

  Items;
  allItems = [];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private db: AngularFireDatabase) {
      let self = this;
      firebase.database().ref('/items').on('value', function (snapshot) {
        //console.log(snapshot.val());
        self.Items = snapshot.val();        
        //console.log(self.Items);
        for (var key in self.Items) {
            self.Items[key]['key'] = key;
            self.allItems.push(self.Items[key]);
        }
        //console.log(self.allItems);
        self.allItems.sort((a, b) => new Date(a['expiryDate']).getTime() - new Date(b['expiryDate']).getTime());
        //console.log(self.allItems);
      });
      //console.log(this.Items);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListPage');
  }
  back(){
    this.navCtrl.pop();
  }

  add(){
    this.navCtrl.push(AddPage);
  }

}
