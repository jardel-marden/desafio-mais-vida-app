// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { Environment } from '../../app/app.env';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/take';

@Injectable()
export class EspecialidadeProvider {
  env:any = new Environment();

  constructor(public http: AuthHttp) {
  }

  getEspecialidades() {
    return this.http.get(this.env.route('medicos.especialidade'))
    .map(this.extractData);
  }

  private extractData(res: Response) {
    return res.json();
  }
}
