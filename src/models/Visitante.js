export default class Visitante {
  
  idvisitante;
  nome;
  email;
  telefone;
  cpf;
  endereco;

  constructor(obj) {
    Object.assign(this, obj);
  }
}