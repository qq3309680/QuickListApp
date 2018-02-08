import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
/**
 * Generated class for the IntroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html',
})
export class IntroPage {
  @ViewChild(Slides) slides: Slides;
  slideOptions: any;
  constructor(public nav: NavController){
    this.slideOptions = {
      pager: true
    };
  }
  goToHome(): void {
    this.nav.setRoot(HomePage);
  }

  ionViewDidLoad() {
    console.log(' IntroPage');
  }

}
