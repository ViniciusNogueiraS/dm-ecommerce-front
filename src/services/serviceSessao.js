import Cliente from '../models/Cliente.js';
import Administrador from '../models/Administrador.js';

export function receptSessao(login){// ==> (response.data)

  if (login.cliente) {
    var sessao = {
      auth: login.auth,
      cliente: new Cliente(login.cliente),
      token: login.token
    }
  }else{
    if (login.administrador) {
      var sessao = {
        auth: login.auth,
        administrador: new Administrador(login.administrador),
        token: login.token
      }
    }
  }

  return sessao;
}