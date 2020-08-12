export function calculaDesconto(preco, desconto){
  return preco - (preco * desconto / 100);
}

export function somaTotal(precos_descontados){
  return _.sum(precos_descontados);
}