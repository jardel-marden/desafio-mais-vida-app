import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ActionSheetController, ToastController} from 'ionic-angular';
import { Medico } from '../../models/medico';
import { MedicoProvider } from '../../providers/medico/medico';

@IonicPage()
@Component({
  selector: 'page-medicos',
  templateUrl: 'medicos.html',
})
export class MedicosPage {
  medicos: Array<Medico> = new Array<Medico>();
  medicoFilters: Array<Medico> = new Array<Medico>();

  constructor(public navCtrl: NavController, public navParams: NavParams, public alert: AlertController, public actions: ActionSheetController,
    public medicoProvider: MedicoProvider, public toast: ToastController) {
      const token = localStorage.getItem('token');
      if (token === null) {
        this.navCtrl.setRoot('LoginPage');
      }
    }

    ionViewDidLoad() {
      this.loadData();
    }

    ionViewWillEnter() {
      this.loadData();
    }

    private initializeItems(): void {
      this.medicos = Object.assign([], this.medicoFilters);
    }

    filter(ev: any) {
      // Reset items back to all of the items
      this.initializeItems();
      // set val to the value of the searchbar
      let val = ev.target.value;
      // if the value is an empty string don't filter the items
      if (val && val.trim() != '') {
        this.loadData(val);
        // this.medicos = this.medicos.filter((item) => {
        //   return (item.nome.toLowerCase().indexOf(val.toLowerCase()) > -1);
        // });
      }
    }

    loadData(searchTearm:string = null): void {
      this.medicoProvider.getMedicos(searchTearm).subscribe(data => {
        if (Array.isArray(data)) {
          this.medicos = data;
          this.medicoFilters = data;
        }
      }, err => {
        this.presentToast('Error de comunicação...');
      });
    }

    moreMedico(item: Medico) {
      let actions = [
        {
          text: 'Editar',
          handler: () => {
            this.navCtrl.push('NovoMedicoPage', {medico:item});
          }
        },{
          text: 'Ver mais detalhes',
          handler: () => {
            this.detalhes(item);
          }
        },{
          text: 'Excluir registro',
          handler: () => {
            this.deleteMedico(item.id);
          }
        },{
          text: 'Voltar',
          role: 'cancel',
          handler: () => {
          }
        }
      ];

      let actionSheet = this.actions.create({
        title: 'Selecione uma opção',
        buttons: actions
      });

      actionSheet.present();
    }

    detalhes(item: Medico) {
      this.navCtrl.push('DetalheMedicoPage',  {medico: item});
    }

    deleteMedico(id:number) {
      let alert = this.alert.create({
        title: 'Atenção',
        message: 'Deseja realmente remover este registro?',
        buttons: [
          {
            text: 'Voltar'
          },
          {
            text: 'Confirmar',
            handler: data => {
              this.medicoProvider.deleteMedicos(id).subscribe(data => {
                const medico: Medico = this.medicos.filter(medico => medico.id === id)[0];
                this.medicos.splice(this.medicos.indexOf(medico), 1);
                this.presentToast('Médico removido com sucesso.');
              }, error => {
                this.presentToast('Tivemos um problema ao remover o médico.');
              });
            }
          }
        ]
      });

      alert.present();
    }

    presentToast(msg:string) {
      this.toast.create({
        message: msg,
        showCloseButton: true,
        closeButtonText: 'X',
        duration: 2000
      }).present();
    }
  }
