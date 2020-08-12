export default class Cliente {
  
  idusuario;
  nome;
  email;
  senha;
  telefone;
  cpf;
  endereco;

  constructor(obj) {
    Object.assign(this, obj);
  }
}