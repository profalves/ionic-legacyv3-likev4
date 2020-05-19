import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  url = 'http://localhost:5550/teste/classes'

  data = {
    name: "Avocado",
    price: 1,
    amount: 1
  }

  header = {
    "X-Parse-REST-API-Key": "restAPIKey",
    "X-Parse-Master-Key": "masterKey",
    "X-Parse-Application-Id": "Appteste"
  };

  constructor(
    public alertController: AlertController,
    public loadingCtrl: LoadingController,
    public http: HttpClient
  ) { }



  ngOnInit() {
  }

  async startLoading() {
    await this.loadingCtrl.create({
      message: 'Carregando...'
    });
  }

  sendPostRequest() {
    this.startLoading()
    this.http.post(`${this.url}/products`, this.data, { headers: this.header }).subscribe((response) => {
      console.log(response);
      this.loadingCtrl.dismiss();
    });
  }

  getRequest() {
    this.startLoading()
    this.http.get(`${this.url}/products`, { headers: this.header }).subscribe((response) => {
      console.log(response);
      this.loadingCtrl.dismiss();
    });
  }

  async dialogAdd() {
    const alert = await this.alertController.create({
      header: 'Alerta',
      subHeader: 'Adicionar funcionário',
      message: 'Insira os dados do novo usuario.',
      inputs: [{
        name: "nome",
        placeholder: "Nome"
      }, {
        name: "email",
        placeholder: "E-mail"
      }, {
        name: "telefone",
        placeholder: "Telefone"
      }],
      buttons: [{
        text: "Cancelar"
      }, {
        text: "Salvar",
        handler: async data => {
          const loading = await this.loadingCtrl.create({
            message: 'Carregando...'
          });
          await loading.present();

          this.http.post(`${this.url}/test`, {
            nome: data.nome,
            email: data.email,
            telefone: data.telefone
          }, { headers: this.header })
            .subscribe(async (resposta) => {
              console.log(resposta);
              await loading.dismiss();
              this.requisicaoSucesso();
            }, async (error) => {
              console.log(error);
              await loading.dismiss();
              this.requisicaoErro(error);
            });
        }
      }]
    });

    await alert.present();
  }

  async requisicaoSucesso() {
    const alert = await this.alertController.create({
      header: 'Sucesso',
      subHeader: '',
      message: 'O funcionário foi adicionado ao Banco de Dados',
      buttons: ['OK']
    });

    await alert.present();
  }

  async requisicaoErro(error) {
    const alert = await this.alertController.create({
      header: 'Error',
      subHeader: '',
      message: error.message,
      buttons: ['OK']
    });

    await alert.present();
  }
}
