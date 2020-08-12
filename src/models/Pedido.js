export default class Pedido {
  
  idpedido;
	visitante;
  cliente;
  lista; // array[{produto, quantidade}...]
	endereco;
	forma_pagamento;
	agencia;
	num_ct_credito;
	data_criacao;
	status;
  
  constructor(obj) {
    Object.assign(this, obj);
  }
}