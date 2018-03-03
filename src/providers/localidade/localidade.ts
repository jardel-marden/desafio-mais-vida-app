import { HttpClient } from '@angular/common/http';
import { Response } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/take';

@Injectable()
export class LocalidadeProvider {

  constructor(public http: HttpClient) {
  }

  getEstados() {
    return this.http.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
    .map((res: Response) => {
      return res;
    })
    .take(1);
  }

  getCidades(estado) {
    return this.http.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estado}/municipios`)
    .map((res: Response) => {
      return res;
    });
  }
}
