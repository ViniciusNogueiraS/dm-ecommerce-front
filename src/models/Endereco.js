export default class Endereco {

  rua;
  numero;
  referencia;
  bairro;
  cidade;
  uf;

  constructor(obj) {
    Object.assign(this, obj);
  }
}