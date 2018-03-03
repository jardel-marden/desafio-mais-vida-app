// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { Environment } from '../../app/app.env';
import { Medico } from '../../models/medico';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/take';

@Injectable()
export class MedicoProvider {
  env:any = new Environment();

  constructor(public http: AuthHttp) {
  }

  getMedicos(search:any=null) {
    return this.http.get(this.env.route('medicos') + (search == null ? '' : `${search}`))
    .map(this.extractData)
    .take(1);
  }

  postMedicos(medico:Medico) {
    return this.http.post(this.env.route('medicos'), medico)
    .map(this.extractData)
    .take(1);
  }

  putMedicos(medico:Medico) {
    return this.http.put(this.env.route('medicos') + medico.id, medico)
    .map(this.extractData)
    .take(1);
  }

  deleteMedicos(id:number) {
    return this.http.delete(this.env.route('medicos') + id)
    .map(this.extractData)
    .take(1);
  }

  private extractData(res: Response) {
    return res.json();
  }
}
