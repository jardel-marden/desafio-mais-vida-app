const ENV = {
  PATH_DEVELOPER: 'http://localhost:8080/api/v1/',
  PATH_PRODUCTION: 'https://desafio-mais-vida.herokuapp.com/api/v1/',
}

export class Environment {
  production: boolean = true;

  private uris: any = {
      'usuario.login': 'login',
      'medicos': 'medicos/',
      'medicos.especialidade': 'medicos/especialidade',
  };

  route(uri:string, id:number=null, per_page:any=null, search:any=null): string {
    let filters = '';

    if (per_page !== null) {
      filters = '?page=' + per_page;
    }

    if (search !== null) {
      filters += (filters === '' ? '?' : '&') + 'search=' + search;
    }

    return (this.production ? ENV.PATH_PRODUCTION : ENV.PATH_DEVELOPER) + `${this.uris[uri]}${filters}`;
  }
}
