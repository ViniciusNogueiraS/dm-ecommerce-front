<template>
  <div class="pesquisa">
    <cabecalho></cabecalho>
    <div class="container">
      <h1>Resultados da pesquisa "{{pesquisa}}":</h1>
      <p v-if="produtos.lenght == 0">
        Nenhum produto encontrado para essa pesquisa...
      </p>
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
    <rodape></rodape>
  </div>
</template>

<script content-type="text/javascript">
import Vue from 'vue';
import cabecalho from './cabecalho';
import rodape from './rodape';
import {pesquisar} from '../services/services.js';

export default {
  name: 'pesquisa',
  components: {
    cabecalho,
    rodape
  },
  data() {
    return {
      pesquisa: this.$route.query.pesquisa,
      produtos: []
    }
  },
  mounted: function(){
    
    var params = {
      pesquisa: this.pesquisa
    }

    pesquisar(params).then(pesquisa => {
      this.produtos = pesquisa;
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
