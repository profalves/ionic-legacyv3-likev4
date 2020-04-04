import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

  constructor(private http: HttpClient) {

  }

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
}
