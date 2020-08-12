export default class Carrinho {
  
  items;

  constructor(obj) {
    Object.assign(this, obj);
  }

  somaTotal(){
    var precos_descontados = [];
    
    this.items.forEach(item => {
      precos_descontados.push(item.produto.preco_descontado * item.quantidade);
    });

    return _.sum(precos_descontados);
  }
}