export function calculaDesconto(preco, desconto){
  return preco - (preco * desconto / 100);
}

export function somaTotal(precosDescontados){
  return _.sum(precosDescontados);
}