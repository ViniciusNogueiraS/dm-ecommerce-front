<template>
  <div class="carrinho">
    <cabecalho></cabecalho>
    <div class="container">
      <h1>Carrinho</h1>
      <hr>
      <table class="table table-striped">
        <thead>
          <tr>
            <td>Imagem</td>
            <td>Nome</td>
            <td>Categoria</td>
            <td>Desconto</td>
            <td>Preço</td>
            <td>Quantidade</td>
            <td>Remover</td>
          </tr>
        </thead>
        <tbody>
          <tr v-if="pedidos.length == 0">
            <td colspan="7">Seu carrinho está vazio!</td>
          </tr>
          <tr v-else v-for="pedido in pedidos" v-bind:key="pedido.idproduto">
            <td class="align-middle"><img v-bind:src="'http://localhost:3000/images/'+pedido.imagem" height="80" width="80"></td>
            <td class="align-middle">
              <router-link :to="'/produto?idproduto='+pedido.idproduto">
                {{ pedido.nome }}
              </router-link>
            </td>
            <td class="align-middle">{{ pedido.categoria }}</td>
            <td class="align-middle">{{ pedido.desconto }}%</td>
            <td class="align-middle">
              <p v-if="pedido.desconto <= 0">
                {{ pedido.preco | currency }}
              </p>
              <strike class="precoSD" v-else>
                {{ pedido.preco | currency}}
              </strike>
              <p v-if="pedido.desconto > 0">
                {{ pedido.precoDescontado | currency}}
              </p>
            </td>
            <td class="align-middle"><input type="number" @change="atualizaTotal()" class="form-control" min="1" max="10" v-model="pedido.quantidade"></td>
            <td class="align-middle">
              <button type="button" class="btn btn-danger" @click="removeDoCarrinho(pedido.idproduto)">
                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/>
                </svg>
              </button>
            </td>
          </tr>
          <tr v-if="pedidos.length > 0">
            <td><b>TOTAL</b></td>
            <td colspan="5"><b>{{total | currency}}</b></td>
            <td><router-link class="btn btn-success" to="/">Fazer Pedido</router-link></td>
          </tr>
        </tbody>
      </table>
    </div>
    <rodape></rodape>
  </div>
</template>

<script content-type="text/javascript">
import Vue from 'vue';
import app from '../App';
import cabecalho from './cabecalho';
import rodape from './rodape';
import eventBus from '../resources/eventBus.vue';
import {calculaDesconto, somaTotal} from '../resources/helpers.js';
import {getCarrinho, retirarDoCarrinho} from '../resources/services.js';

export default {
  name: 'carrinho',
  components: {
    cabecalho,
    rodape
  },
  data() {
    return {
      pedidos: [],//os produtos do carrinho + suas respectivas quantidades
      precosDescontados: [],
      total: 0
    }
  },
  mounted: function(){
    this.loadCarrinho();
  },
  methods: {
    loadCarrinho: function(){

      var params = {
        id_cliente: JSON.parse(window.sessionStorage.getItem('cliente')).idusuario
      }

      getCarrinho(params).then(carrinho => {

        carrinho[0].forEach(pd => {
          var pedido = {
            idproduto: pd.idproduto,
            nome: pd.nome,
            categoria: pd.categoria,
            preco: pd.preco,
            desconto: pd.desconto,
            precoDescontado: calculaDesconto(pd.preco, pd.desconto),
            descricao: pd.descricao,
            imagem: pd.imagem,
            quantidade: 1
          }

          this.precosDescontados.push(pedido.precoDescontado);
          this.pedidos.push(pedido);
        });
        
        this.total = somaTotal(this.precosDescontados);
      })
      .catch((response) => {
        console.log(response);
      });
    },
    removeDoCarrinho: function(id_produto){
      eventBus.$emit("remCar");

      var params = {
        id_cliente: JSON.parse(window.sessionStorage.getItem('cliente')).idusuario,
        id_produto: id_produto
      }

      retirarDoCarrinho(params).then(remCarrinho => {
        this.pedidos = [];
        this.loadCarrinho();
      })
      .catch(({response}) => {
        console.log(response);
      });
    },
    atualizaTotal: function(){

      this.precosDescontados = [];

      this.pedidos.forEach(pedido => {
        var subTotal = pedido.precoDescontado * pedido.quantidade;
        this.precosDescontados.push(subTotal);
      });

      this.total = somaTotal(this.precosDescontados);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.carrinho .container{
  padding-bottom: 3rem;
}
table{
  font-size: 1.3rem;
  text-align: center;
}
thead td{
  font-weight: bold;
}
.align-middle p{
  margin: 0;
}
.precoSD{
  font-size: 1rem;
  color: gray;
}
</style>
