import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChecklistPage } from './check-list';


@NgModule({
  declarations: [
    ChecklistPage,
  ],
  imports: [
    IonicPageModule.forChild(ChecklistPage),
  ],
})
export class ChecklistPageModule {

}
