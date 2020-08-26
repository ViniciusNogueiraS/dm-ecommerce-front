<template>
  <div class="categoria">
    <cabecalho></cabecalho>
    <div class="container">
      <h1>{{categoria}}</h1>
      <div class="card" v-bind:key="produto.idproduto" v-for="produto in produtos">
        <router-link :to="'/produto?idproduto='+produto.idproduto">
          <img v-bind:src="'http://localhost:3000/images/'+produto.imagem" class="card-img-top">
          <div class="card-body">
            <h2>{{ produto.nome }}</h2>
            <div v-if="produto.desconto > 0" class="off">
              <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-bookmark-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M3 3a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v12l-5-3-5 3V3z"/>
              </svg>
              <b>{{produto.desconto}}% OFF</b>
            </div>
            <h3>{{ produto.preco_descontado | currency }}</h3>
          </div>
        </router-link>
      </div>
    </div>
    <rodape></rodape>
  </div>
</template>

<script content-type="text/javascript">
import Vue from 'vue';
import cabecalho from './cabecalho';
import rodape from './rodape';
import {getProdutosByCategoria} from '../services/services.js';

export default {
  name: 'pesquisa',
  components: {
    cabecalho,
    rodape
  },
  data() {
    return {
      categoria: '',
      produtos: []
    }
  },
  mounted: function(){
    this.categoria = this.$route.query.c;

    var params = {
      categoria: this.categoria
    }

    getProdutosByCategoria(params).then(pds => {
      this.produtos = pds;
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
</style>
