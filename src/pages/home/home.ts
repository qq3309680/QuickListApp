import { Component } from '@angular/core';
import { NavController,NavParams, AlertController, Platform } from 'ionic-angular';
import { Keyboard } from '@ionic-native/keyboard';
import { ChecklistPage }from '../check-list/check-list';
import { ChecklistModel } from '../../models/checklist-model';
import { DataProvider } from '../../providers/data/data';
import { IntroPage } from '../intro/intro';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  checklists: ChecklistModel[] = [];
  constructor(public navCtrl: NavController,public navParams: NavParams,public dataService:DataProvider,public alertCtrl: AlertController, public platform: Platform,public storage: Storage) {

  }
  //页面加载时执行
  ionViewDidLoad(){
    this.platform.ready().then(() => {
      this.storage.get('introShown').then((result) => {
        if(!result){
          this.storage.set('introShown', true);
          this.navCtrl.setRoot(IntroPage);
        }
      });
      this.dataService.getData().then((checklists) => {
        let savedChecklists: any = false;
        if(typeof(checklists) != "undefined"){
          savedChecklists = JSON.parse(checklists);
        } if(savedChecklists){
          savedChecklists.forEach((savedChecklist) => {
            let loadChecklist = new ChecklistModel(savedChecklist.title, savedChecklist.items);
            this.checklists.push(loadChecklist);
            loadChecklist.checklist.subscribe(update => {
              this.save();
            });
          });
        }
      });
    });
  }
  //增加清单
  addChecklist(): void {
    let prompt = this.alertCtrl.create({
      title: '添加清单',
      message: '在下放输入清单的名称:',
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
            let newChecklist = new ChecklistModel(data.name, []);
            this.checklists.push(newChecklist);
            newChecklist.checklist.subscribe(update => {
              this.save();
            });
            this.save();
          }
        }
      ]
    });
    prompt.present();
  }
  //充命名清单
  renameChecklist(checklist): void {
    let prompt = this.alertCtrl.create({
      title: '重新命名',
      message: '在下方输入清单新名称:',
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
            let index = this.checklists.indexOf(checklist);
            if(index > -1){
              this.checklists[index].setTitle(data.name);
              this.save();
            }
          }
        }
      ]
    });
    prompt.present();

  }
  //浏览清单
  viewChecklist(checklist): void {
    this.navCtrl.push(ChecklistPage, {
      checklist: checklist
    });
  }
  //删除清单
  removeChecklist(checklist): void{
    let index = this.checklists.indexOf(checklist);
    if(index > -1){
      this.checklists.splice(index, 1);
      this.save();
    }
  }
  //保存
  save(): void{

    //this.KeyBoard.close();
    this.dataService.save(this.checklists);
  }
}
