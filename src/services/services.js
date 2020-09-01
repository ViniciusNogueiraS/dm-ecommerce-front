import axios from "axios";
import { receptProdutos } from "./serviceProduto";
import { receptCarrinho } from "./serviceCarrinho";
import { receptSessao } from "./serviceSessao";

export function runLogin(params){
  return axios({
    method: 'POST',
    url: 'login',
    baseURL: 'http://localhost:3000/',
    data: params
  })
  .then(response => receptSessao(response.data));
}

export function runLogout(){
  return axios({
    method: 'POST',
    url: 'logout',
    baseURL: 'http://localhost:3000/',
    headers: {
      'x-access-token': window.sessionStorage.getItem('token')
    }
  })
  .then(response => response.data);
}

export function runCadastro(params){
  return axios({
    method: 'POST',
    url: 'cadastro',
    baseURL: 'http://localhost:3000/',
    data: params
  })
  .then(response => response.data);
}

export function getProdutos(params){
  return axios({
    method: 'GET',
    url: 'produto',
    baseURL: 'http://localhost:3000/',
    params
  })
  .then(response => receptProdutos(response.data));
}

export function getProdutoById(params){
  return axios({
    method: 'GET',
    url: 'produto',
    baseURL: 'http://localhost:3000/',
    params
  })
  .then(response => receptProdutos(response.data));
}

export function getProdutosByCategoria(params){
  return axios({
    method: 'GET',
    url: 'produto',
    baseURL: 'http://localhost:3000/',
    params
  })
  .then(response => receptProdutos(response.data));
}

export function pesquisar(params){
  return axios({
    method: 'GET',
    url: 'produto',
    baseURL: 'http://localhost:3000/',
    params
  })
  .then(response => receptProdutos(response.data));
}

export function inserirProduto(params){
  return axios({
    method: 'POST',
    url: 'produtoADM',
    baseURL: 'http://localhost:3000/',
    data: params,
    headers: {
      'x-access-token': window.sessionStorage.getItem('token')
    }
  })
  .then(response => response.data);
}

export function upImagem(file){
  return axios({
    method: 'POST',
    url: 'uploadProfile',
    baseURL: 'http://localhost:3000/',
    data: file,
    headers: {
      'x-access-token': window.sessionStorage.getItem('token'),
      'Content-Type': 'multipart/form-data'
    }
  })
  .then(response => response.data);
}

export function inserirPedido(params){
  return axios({
    method: 'POST',
    url: 'pedido',
    baseURL: 'http://localhost:3000/',
    data: params
  })
  .then(response => response.data);
}

export function getCarrinho(params){
  return axios({
    method: 'GET',
    url: 'carrinho',
    baseURL: 'http://localhost:3000/',
    params,
    headers: {
      'x-access-token': window.sessionStorage.getItem('token')
    }
  })
  .then(response => receptCarrinho(response.data));
}

export function getConfirmaCarrinho(params){
  return axios({
    method: 'GET',
    url: 'confirmaCarrinho',
    baseURL: 'http://localhost:3000/',
    params,
    headers: {
      'x-access-token': window.sessionStorage.getItem('token')
    }
  })
  .then(response => response.data);
}

export function inserirAoCarrinho(params){
  return axios({
    method: 'POST',
    url: 'carrinho',
    baseURL: 'http://localhost:3000/',
    data: params,
    headers: {
      'x-access-token': window.sessionStorage.getItem('token')
    }
  })
  .then(response => response.data);
}

export function retirarDoCarrinho(params){
  return axios({
    method: 'DELETE',
    url: 'carrinho',
    baseURL: 'http://localhost:3000/',
    params,
    headers: {
      'x-access-token': window.sessionStorage.getItem('token')
    }
  })
  .then(response => response.data);
}

export function uploadProdutoById(params){
  return axios({
    method: 'PUT',
    url: 'produtoADM',
    baseURL: 'http://localhost:3000/',
    data: params,
    headers: {
      'x-access-token': window.sessionStorage.getItem('token')
    }
  })
  .then(response => response.data);
}

export function deleteProdutoById(params){
  return axios({
    method: 'DELETE',
    url: 'produtoADM',
    baseURL: 'http://localhost:3000/',
    params,
    headers: {
      'x-access-token': window.sessionStorage.getItem('token')
    }
  })
  .then(response => response.data);
}

export function getClientes(params){
  return axios({
    method: 'GET',
    url: 'cliente',
    baseURL: 'http://localhost:3000/',
    params,
    headers: {
      'x-access-token': window.sessionStorage.getItem('token')
    }
  })
  .then(response => response.data);
}