import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  url = 'https://my-json-server.typicode.com/profalves/pos-controle-system'

  data = {
    test: 'test',
    description: 'one more test'
  }

  header = {
    "headers": {
      "Content-Type": "application/json",
      "X-Custom-Header": "myCustomHeader"
    }
  };

  constructor(
    public alertController: AlertController,
    public loadingCtrl: LoadingController,
    public http: HttpClient
  ) { }

  ngOnInit() { }

  sendPostRequest() {
    this.http.post(`${this.url}/test`, this.data, this.header).subscribe((response) => {
      console.log(response);
    });
  }

  getRequest() {
    this.http.get(`${this.url}/products`).subscribe((response) => {
      console.log(response);
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
          }, this.header)
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
