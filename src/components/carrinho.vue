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
          <tr v-if="carrinho == null || carrinho.items.length == 0">
            <td colspan="7">Seu carrinho está vazio!</td>
          </tr>
          <tr v-else v-for="item in carrinho.items" v-bind:key="item.produto.idproduto">
            <td class="align-middle"><img v-bind:src="'http://localhost:3000/images/'+item.produto.imagem" height="80" width="80"></td>
            <td class="align-middle">
              <router-link :to="'/produto?idproduto='+item.produto.idproduto">
                {{ item.produto.nome }}
              </router-link>
            </td>
            <td class="align-middle">{{ item.produto.categoria }}</td>
            <td class="align-middle">{{ item.produto.desconto }}%</td>
            <td class="align-middle">
              <p v-if="item.produto.desconto <= 0">
                {{ item.produto.preco | currency }}
              </p>
              <strike class="precoSD" v-else>
                {{ item.produto.preco | currency}}
              </strike>
              <p v-if="item.produto.desconto > 0">
                {{ item.produto.preco_descontado | currency}}
              </p>
            </td>
            <td class="align-middle"><input type="number" @change="atualizaCarrinho()" class="form-control" min="1" max="10" v-model=item.quantidade></td>
            <td class="align-middle">
              <button type="button" class="btn btn-danger" @click="removeDoCarrinho(item.produto)">
                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/>
                </svg>
              </button>
            </td>
          </tr>
          <tr v-if="carrinho != null && carrinho.items.length > 0">
            <td><b>TOTAL</b></td>
            <td colspan="3"></td>
            <td><b>{{total | currency}}</b></td><td></td>
            <td>
              <button class="btn btn-success" @click="comprar()">Comprar</button>
            </td>
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
import Carrinho from '../models/Carrinho.js';
import {calculaDesconto, somaTotal} from '../resources/helpers.js';
import {getCarrinho, retirarDoCarrinho} from '../services/services.js';

export default {
  name: 'carrinho',
  components: {
    cabecalho,
    rodape
  },
  data() {
    return {
      carrinho: null,//items = produtos + quantidades
      total: 0
    }
  },
  mounted: function(){
    var params = {
      id_cliente: JSON.parse(window.sessionStorage.getItem('cliente')).idusuario
    }

    getCarrinho(params).then(carrinho => {
      this.carrinho = carrinho;
      this.total = carrinho.somaTotal();
    })
    .catch(response => {
      console.log(response);
    });
  },
  methods: {
    removeDoCarrinho: function(produto){
      eventBus.$emit("remCar");

      var params = {
        id_cliente: JSON.parse(window.sessionStorage.getItem('cliente')).idusuario,
        id_produto: produto.idproduto
      }

      retirarDoCarrinho(params).then(remCarrinho => {
        var index = _.findIndex(this.carrinho.items, {produto});
        this.carrinho.items.splice(index, 1);
      })
      .catch(({response}) => {
        console.log(response);
      });
    },
    atualizaCarrinho: function(){
      this.total = this.carrinho.somaTotal();
    },
    comprar: function(){
      window.sessionStorage.setItem('carrinho', JSON.stringify(this.carrinho));

      this.$router.push('/pedido?carrinho=true');
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
