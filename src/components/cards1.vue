<template>
  <div class="cards1">
    <div class="container">
      <h1>Produtos</h1><hr>
      <div class="card" v-bind:key="produto.idproduto" v-for="produto in produtos">
        <router-link :to="'/produto?idproduto='+produto.idproduto">
          <img v-bind:src="'http://localhost:3000/images/'+produto.imagem" class="card-img-top">
          <div class="card-body">
            <h2>{{ produto.nome }}</h2>
            <h3>{{ produto.preco | currency }}</h3>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script content-type="text/javascript">
import Vue from 'vue';
import {getProdutos} from '../resources/services.js';

export default {
  name: 'cards1',
  data() {
    return {
      produtos: []
    }
  },
  mounted: function(){

    getProdutos().then(produtos => {
      this.produtos = produtos;
    })
    .catch(({response}) => {
      console.log(response);
    });

  },
  methods: {
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.cards1 .container{
  padding-bottom: 3rem;
}
</style>
