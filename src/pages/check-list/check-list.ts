import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
/**
 * Generated class for the CheckListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-check-list',
  templateUrl: 'check-list.html',
})
export class ChecklistPage {
  checklist: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
    this.checklist = this.navParams.get('checklist');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckListPage');
  }

  addItem(): void {
    let prompt = this.alertCtrl.create({
      title: '添加记录',
      message: '记录名称:',
      inputs: [
        {
          name: 'name'
        }
      ],
      buttons: [
        {
          text: '取消'
        },
        {
          text: '保存',
          handler: data => {
            this.checklist.addItem(data.name);
          }
        }
      ]
    });
    prompt.present();
  }
  toggleItem(item): void {
    this.checklist.toggleItem(item);
  }
  removeItem(item): void {
    this.checklist.removeItem(item);
  }
  renameItem(item): void {
    let prompt = this.alertCtrl.create({
      title: '编辑',
      message: '名称:',
      inputs: [
        {
          name: 'name'
        }
      ],
      buttons: [
        {
          text: '取消'
        },
        {
          text: '保存',
          handler: data => {
            this.checklist.renameItem(item, data.name);
          }
        }
      ]
    });
    prompt.present();
  }
  uncheckItems(): void {
    this.checklist.items.forEach((item) => {
      if(item.checked){
        this.checklist.toggleItem(item);
      }
    })
  }

}
