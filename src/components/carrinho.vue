<template>
  <div class="carrinho">
    <cabecalho></cabecalho>
    <div class="container">
      <h1>Carrinho</h1>
      <hr>
      <div class="d-none d-sm-block table table-striped"><!-- TEMPLATE DESKTOP-->
        <div class="thead">
          <div class="row align-middle">
            <div class="col-2">Imagem</div>
            <div class="col-2">Nome</div>
            <div class="col-2">Categoria</div>
            <div class="col-1">Desconto</div>
            <div class="col-2">Preço</div>
            <div class="col-2">Quantidade</div>
            <div class="col-1"></div>
          </div>
        </div>
        <div class="tbody">
          <div class="row align-middle" v-if="carrinho == null || carrinho.items.length == 0">
            <div class="col-12">Seu carrinho está vazio!</div>
          </div>
          <div class="row align-middle" v-else v-for="item in carrinho.items" v-bind:key="item.produto.idproduto">
            <div class="col-2"><img v-bind:src="'http://localhost:3000/images/'+item.produto.imagem" height="80" width="80"></div>
            <div class="col-2">
              <router-link :to="'/produto?idproduto='+item.produto.idproduto">
                {{ item.produto.nome }}
              </router-link>
            </div>
            <div class="col-2">{{ item.produto.categoria }}</div>
            <div class="col-1">{{ item.produto.desconto }}%</div>
            <div class="col-2">
              <p v-if="item.produto.desconto <= 0">
                {{ item.produto.preco | currency }}
              </p>
              <strike class="precoSD" v-else>
                {{ item.produto.preco | currency}}
              </strike>
              <p v-if="item.produto.desconto > 0">
                {{ item.produto.preco_descontado | currency}}
              </p>
            </div>
            <div class="col-2"><input type="number" @change="atualizaCarrinho()" class="form-control" min="1" max="10" v-model=item.quantidade></div>
            <div class="col-1">
              <button type="button" class="btn btn-danger" @click="removeDoCarrinho(item.produto)">
                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/>
                </svg>
              </button>
            </div>
          </div>
          <div class="row align-middle" v-if="carrinho != null && carrinho.items.length > 0">
            <div class="col-2">
              <b>TOTAL</b>
            </div>
            <div class="col-5"></div>
            <div class="col-2">
              <b>{{total | currency}}</b>
            </div>
            <div class="col-3">
              <button class="btn btn-success" @click="comprar()">Comprar</button>
            </div>
          </div>
        </div>
      </div>


      <div class="d-block d-sm-none table table-striped"><!-- TEMPLATE MOBILE-->
        <div class="thead">
          <div class="row">
            <div class="col-4">Produto</div>
            <div class="col-4">Preço</div>
            <div class="col-4">Quantidade</div>
          </div>
        </div>
        <div class="tbody">
          <div class="row" v-if="carrinho == null || carrinho.items.length == 0">
            <div class="col-12">Seu carrinho está vazio!</div>
          </div>
          <div class="row" v-else v-for="item in carrinho.items" v-bind:key="item.produto.idproduto">
            <div class="col-4">
              <button class="btn btn-link" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <img v-bind:src="'http://localhost:3000/images/'+item.produto.imagem" height="65" width="65">•••
              </button>
              <div class="dropdown-menu dropdownOptions" aria-labelledby="dropdownMenuButton">
                <b>{{ item.produto.nome }}</b><br>
                <router-link :to="'/produto?idproduto='+item.produto.idproduto">Ver na página...</router-link>
                <hr>
                <b>Categoria:</b>
                <p>{{ item.produto.categoria }}</p><br>
                <b>Desconto:</b>
                <p>{{ item.produto.desconto }}%</p>
                <hr>
                <button type="button" class="btn btn-danger" @click="removeDoCarrinho(item.produto)">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/>
                  </svg> Remover
                </button>
              </div>
            </div>
            <div class="col-4">
              <p v-if="item.produto.desconto <= 0">
                {{ item.produto.preco | currency }}
              </p>
              <strike class="precoSD" v-else>
                {{ item.produto.preco | currency}}
              </strike>
              <p v-if="item.produto.desconto > 0">
                {{ item.produto.preco_descontado | currency}}
              </p>
            </div>
            <div class="col-4">
              <input type="number" @change="atualizaCarrinho()" class="form-control" min="1" max="10" v-model=item.quantidade>
            </div>
          </div>
          <div class="row" v-if="carrinho != null && carrinho.items.length > 0">
            <div class="col-4">
              <b>TOTAL</b>
            </div>
            <div class="col-4">
              <b>{{total | currency}}</b>
            </div>
            <div class="col-4">
              <button class="btn btn-success" @click="comprar()">Comprar</button>
            </div>
          </div>
        </div>
      </div>
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
  padding-bottom: 3vw;
}
.table .row{
  display: flex;
  text-align: center;
  padding: 1vh;
}
.thead{
  font-weight: bold;
}
.tbody .row:nth-child(odd){
  background-color: rgb(233, 233, 233);
}
@media (max-width: 576px) {
  .table{
    font-size: medium;
  }
  .dropdownOptions{
    padding: 10px;
    font-size: medium;
    width: 17rem;
  }
  .dropdownOptions p{
    display: contents;
  }
}
@media (min-width: 992px) {
  .table{
    font-size: large;
  }
}
</style>
