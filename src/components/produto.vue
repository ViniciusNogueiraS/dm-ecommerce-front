<template>
  <div class="produto">
    <cabecalho></cabecalho>
    <div class="container" v-if="produto != null">
      <h1>{{produto.nome}}</h1>
      <div class="table">
        <div class="row">
          <div id="tdImg" class="col-6">
            <img :src="'http://localhost:3000/images/'+produto.imagem">
          </div>
          <div class="col-6">
            <b>Categoria: </b>{{produto.categoria}}
          </div>
        </div>
        <div class="row">
          <div class="col-6"></div>
          <div class="col-6">
            <b>Desconto: </b>{{produto.desconto}}%
          </div>
        </div>
        <div class="row">
          <div class="col-6"></div>
          <div class="col-6">
            <b>Preço: </b>
            <p v-if="produto.desconto <= 0">
              {{produto.preco | currency}}
            </p>
            <strike v-else>
              {{produto.preco | currency}}
            </strike>
            <p v-if="produto.desconto > 0">
              {{produto.preco_descontado | currency}}
            </p>
          </div>
        </div>
        <div class="row">
          <div class="col-6"></div>
          <div class="col-6">
            <b>Quantidade: </b><input class="form-control" type="number" min="1" max="10" v-model="quantidade">
          </div>
        </div>
        <div class="row">
          <div class="col-6"></div>
          <div class="col-6">
            <p v-if="!temSessao">Realize o login para usar o carrinho de compras!</p>
            <button type="button" class="btn btn-danger" @click="removeDoCarrinho" v-else-if="estaNoCarrinho">
              Retirar do Carrinho
              <div v-if="loadB" class="spinner-border spinner-border-sm" role="status"></div>
              <svg v-else width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-cart3" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm7 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
              </svg>
            </button>
            <button type="button" class="btn btn-warning" @click="addAoCarrinho" v-else>
              Adicionar ao Carrinho
              <div v-if="loadB" class="spinner-border spinner-border-sm" role="status"></div>
              <svg v-else width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-cart3" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm7 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
              </svg>
            </button>
          </div>
        </div>
        <div class="row">
          <div id="compra" class="col-12">
            <button class="btn btn-success" @click="comprar()">Comprar</button>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <b>Mais sobre este produto:</b><br>
            <p>{{produto.descricao}}</p>
          </div>
        </div>
      </div>
    </div>
    <rodape></rodape>
  </div>
</template>

<script content-type="text/javascript">
import Vue from 'vue';
import cabecalho from './cabecalho';
import rodape from './rodape';
import eventBus from '../resources/eventBus.vue';
import Produto from '../models/Produto.js';
import {getProdutoById, getConfirmaCarrinho, inserirAoCarrinho, retirarDoCarrinho} from '../services/services.js';

export default {
  name: 'produto',
  components: {
    cabecalho,
    rodape
  },
  data() {
    return {
      temSessao: false,
      estaNoCarrinho: false,
      produto: null,
      quantidade: 1,
      loadB: false
    }
  },
  mounted: function(){
    var params = {
      idproduto: parseInt(this.$route.query.idproduto)
    }
    
    getProdutoById(params).then(produto => {
      this.produto = produto[0];
    })
    .catch(({response}) => {
      console.log(response);
    });

    var cliente = JSON.parse(window.sessionStorage.getItem('cliente'));
    this.temSessao = !!cliente;

    if (this.temSessao) {

      params = {
        id_cliente: cliente.idusuario,
        id_produto: parseInt(this.$route.query.idproduto)
      }

      getConfirmaCarrinho(params).then(confirma => {// confirma se está no carrinho (true or false)
        this.estaNoCarrinho = confirma;
      })
      .catch(({response}) => {
        console.log(response);
      });
    }
  },
  methods: {
    addAoCarrinho: function(){
      this.loadB = true;

      var params = {
        id_cliente: JSON.parse(window.sessionStorage.getItem('cliente')).idusuario,
        id_produto: parseInt(this.$route.query.idproduto)
      }

      inserirAoCarrinho(params).then(inCarrinho => {
        this.loadB = false;
        eventBus.$emit("addCar");
        this.estaNoCarrinho = true;
      })
      .catch(({response}) => {
        console.log(response);
        this.loadB = false;
      });
    },
    removeDoCarrinho: function(){
      this.loadB = true;

      var params = {
        id_cliente: JSON.parse(window.sessionStorage.getItem('cliente')).idusuario,
        id_produto: parseInt(this.$route.query.idproduto)
      }

      retirarDoCarrinho(params).then(remCarrinho => {
        this.loadB = false;
        eventBus.$emit("remCar");
        this.estaNoCarrinho = false;
      })
      .catch(({response}) => {
        console.log(response);
        this.loadB = false;
      });
    },
    comprar: function(){
      this.$router.push('/pedido?idproduto='+this.produto.idproduto+'&quantidade='+this.quantidade);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.produto .container{
  padding-bottom: 3vw;
}
h1{
  margin-top: 2vw;
}
.table{
  padding: 5px;
}
.table .col-6{
  margin-bottom: 1vw;
}
p{
  margin: 0;
}
@media (max-width: 576px) {
  .col-6{
    padding-left: 10px;
    padding-right: 10px;
  }
  .table{
    font-size: small;
  }
  .table .col-6:last-child{
    padding-left: 0;
  }
  #tdImg img{
    position: absolute;
    width: 23vh;
    height: 23vh;
  }
  #compra{
    display: inline-grid;
  }
}
@media (min-width: 992px){
  .table{
    font-size: xx-large;
  }
  .table .col-6:last-child{
    padding-left: 0;
  }
  #tdImg img{
    position: absolute;
    width: 28vw;
    height: 28vw;
  }
  #compra button{
    float: right;
    font-size: xx-large;
  }
}
table button{
  font-size: 1.3vw;
}
table button svg{
  margin-bottom: 0.2vw;
}
table tbody tr td{
  padding: 1vw;
  border-bottom: black solid 0.1vw;
}
table p{
  width: fit-content;
  margin: 0;
  display: contents;
}
</style>
