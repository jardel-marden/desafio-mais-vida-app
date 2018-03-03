import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NovoMedicoPage } from './novo-medico';

@NgModule({
  declarations: [
    NovoMedicoPage,
  ],
  imports: [
    IonicPageModule.forChild(NovoMedicoPage),
  ],
})
export class NovoMedicoPageModule {}
