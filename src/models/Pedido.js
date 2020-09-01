export default class Pedido {
  
 	idpedido;
  data_criacao;
  visitante;
  cliente;
  endereco;
  forma_pagamento;
  num_cartao;
  data_validade;
  codigo_seguranca;
  items;
  status;
  
  constructor(obj) {
    Object.assign(this, obj);
  }
}