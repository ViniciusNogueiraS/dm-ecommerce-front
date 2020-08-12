import Carrinho from '../models/Carrinho.js';
import Produto from '../models/Produto.js';

export function receptCarrinho(carrinho){// ==> (response.data)

  var items = [];
  carrinho.forEach(produto => {
    var item = {
      produto: new Produto({
      idproduto: produto.idproduto,
      nome: produto.nome,
      categoria: produto.categoria,
      preco: produto.preco,
      desconto: produto.desconto,
      preco_descontado: produto.preco_descontado,
      descricao: produto.descricao,
      imagem: produto.imagem
      }),
      quantidade: 1
    };
  
    items.push(item);
  });

  return new Carrinho({items});
}