import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Medico } from '../../models/medico';

@IonicPage()
@Component({
  selector: 'page-detalhe-medico',
  templateUrl: 'detalhe-medico.html',
})
export class DetalheMedicoPage {
  medico:Medico = {} as Medico;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.medico = this.navParams.get('medico');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetalheMedicoPage');
  }

}
