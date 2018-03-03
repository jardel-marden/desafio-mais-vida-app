import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { LocalidadeProvider } from '../../providers/localidade/localidade';
import { EspecialidadeProvider } from '../../providers/especialidade/especialidade';
import { MedicoProvider } from '../../providers/medico/medico';
import { Medico } from '../../models/medico';

@IonicPage()
@Component({
  selector: 'page-novo-medico',
  templateUrl: 'novo-medico.html',
})
export class NovoMedicoPage {
  estados: any = Array<any>();
  cidades: any = Array<any>();
  uf: any;
  cidade: any;
  medico: Medico = {
    id: undefined,
    nome: '',
    sobrenome: '',
    email: '',
    especialidade: null,
    status: 'DISPONIVEL',
    ativo: true,
    cidade: '',
    cidadeId: null,
    uf: '',
    ufId: null
  } as Medico;
  especialidades: Array<any> = new Array<any>();

  constructor(public navCtrl: NavController, public navParams: NavParams, private localidade: LocalidadeProvider,
    public especialidadeProvider: EspecialidadeProvider, public medicoProvider: MedicoProvider, public toast: ToastController,
    public loader: LoadingController) {
      if (this.navParams.data !== null && this.navParams.data.medico !== undefined) {
        this.medico = this.navParams.data.medico;
      }
    }

    ionViewDidLoad() {
      this.localidade.getEstados().subscribe(data => {
        this.estados = data;

        // seta campo UF e cidade para atualizar
        if (this.medico.id !== null) {
          this.estados.forEach(uf => {
            if (this.medico.ufId === uf.id) {
              this.uf = uf;
              this.filterCidade().then(data => {
                data.forEach(cidade => {
                  if (cidade.id === this.medico.cidadeId) {
                    this.cidade = cidade;
                  }
                });
              });
            }
          });
        }
      });

      this.especialidadeProvider.getEspecialidades().subscribe(data => {
        for (let key in data) {
          this.especialidades.push({
            key: key,
            value: data[key]
          });
        }
      });
    }

    filterCidade(): Promise<any> {
      return new Promise((resolve) => {
        let loader = this.loader.create({
          content: "Processando informações aguarde...",
        });

        loader.present();
        this.localidade.getCidades(this.uf.id).subscribe(data => {
          this.cidades = data;
          loader.dismiss();
          resolve(data);
        }, err => {
          loader.dismiss();
        });
      });
    }

    cadastrarOrAtualizar() {
      if (this.medico.sobrenome == null || this.medico.nome == null || this.medico.especialidade == null) {
        this.presentToast('Informe o nome e a especialidad!');
        return;
      }

      if (this.uf) {
        this.medico.ufId = this.uf.id;
        this.medico.uf = this.uf.sigla;
        this.medico.cidade = this.cidade.nome;
        this.medico.cidadeId = this.cidade.id;
      }

      if (this.medico.id === null) {
        this.medicoProvider.postMedicos(this.medico).subscribe(data => {
          this.presentToast('Cadastro realizado com sucesso.');
          try {
            this.navCtrl.pop();
          } catch(e) {
            this.navCtrl.setRoot('MedicoPage');
          }
        }, error => {
          this.presentToast('Tivemos um problema ao cadastrar o médico.');
        })
      } else {
        this.medicoProvider.putMedicos(this.medico).subscribe(data => {
          this.presentToast('Atualização realizado com sucesso.');
          try {
            this.navCtrl.pop();
          } catch(e) {
            this.navCtrl.setRoot('MedicoPage');
          }
        }, error => {
          this.presentToast('Tivemos um problema ao atualizar o médico.');
        });
      }
    }

    presentToast(msg:string) {
      this.toast.create({
        message: msg,
        showCloseButton: true,
        closeButtonText: 'X',
        duration: 500
      }).present();
    }
  }
