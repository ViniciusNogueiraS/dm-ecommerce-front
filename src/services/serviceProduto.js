import Produto from '../models/Produto.js';

export function receptProdutos(produtos){// ==> (response.data)

  var pds = [];
  produtos.forEach(produto => {
    var produto = new Produto({
      idproduto: produto.idproduto,
      nome: produto.nome,
      categoria: produto.categoria,
      preco: produto.preco,
      desconto: produto.desconto,
      preco_descontado: produto.preco_descontado,
      descricao: produto.descricao,
      imagem: produto.imagem,
      data_cadastro: produto.data_cadastro
    });
    
    pds.push(produto);
  });

  return pds;
}