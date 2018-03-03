import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Response, Headers } from '@angular/http';
import { Environment } from '../../app/app.env';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable()
export class AuthProvider {
  headers = new Headers();
  env = new Environment();

  constructor(public http: HttpClient) {
  }

  auth(user:any) {
      return this.http
      .post(this.env.route('usuario.login'), {username: user.email, password: user.password})
      .map(this.extractData);
  }

  register(user:any) : any {
    let params = {
      name: user.name,
      celular: user.celular,
      email: user.email,
      password: user.password
    };

    return this.http.post(this.env.route('usuario.sigin'), params)
    .do(this.logResponse)
    .map(this.extractData);
  }

  private logResponse(res: Response) {
    console.log(res);
  }

  private extractData(res: Response) {
    return res.json();
  }
}
