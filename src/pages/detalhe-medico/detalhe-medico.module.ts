import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetalheMedicoPage } from './detalhe-medico';

@NgModule({
  declarations: [
    DetalheMedicoPage,
  ],
  imports: [
    IonicPageModule.forChild(DetalheMedicoPage),
  ],
})
export class DetalheMedicoPageModule {}
