export default class Administrador {
  
  idusuario;
  nome;
  email;
  senha;
  telefone;
  cargo;

  constructor(obj) {
    Object.assign(this, obj);
  }
}