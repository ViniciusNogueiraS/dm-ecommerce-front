<template>
  <div class="produto">
    <cabecalho></cabecalho>
    <div class="container">
      <h1>{{nome}}</h1>
      <table>
        <tbody>
          <tr>
            <td rowspan="6"><img :src="'http://localhost:3000/images/'+imagem" width="420" height="420"></td>
            <td><b>Categoria: </b>{{categoria}}</td>
          </tr>
          <tr>
            <td><b>Desconto: </b>{{desconto}}%</td>
          </tr>
          <tr>
            <td><b>Preço: </b>
              <p v-if="desconto <= 0">
                {{preco | currency}}
              </p>
              <strike class="precoSD" v-else>
                {{preco | currency}}
              </strike>
              <p v-if="desconto > 0">
                {{precoDescontado | currency}}
              </p>
            </td>
          </tr>
          <tr>
            <td><b>Quantidade: </b><input class="form-control" type="number" min="1" max="10" v-model="quantidade"></td>
          </tr>
          <tr>
            <td>
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
            </td>
          </tr>
          <tr>
            <td>
              <button class="btn btn-success" type="button"><h2>Comprar</h2></button>
            </td>
          </tr>
          <tr>
            <td colspan="2">
              <b>Mais sobre este produto:</b><br><br>
              <p>{{descricao}}</p>
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
import cabecalho from './cabecalho';
import rodape from './rodape';
import eventBus from '../resources/eventBus.vue';
import {calculaDesconto} from '../resources/helpers.js';
import {getProdutoById, getCarrinho, inserirAoCarrinho, retirarDoCarrinho} from '../resources/services.js';

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
      idproduto: null,
      nome: '',
      categoria: '',
      preco: 0,
      desconto: 0,
      precoDescontado: 0,
      descricao: '',
      imagem: '',
      quantidade: 1,
      pedido: null,//o produto + sua respectiva quantidade
      loadB: false
    }
  },
  mounted: function(){
    this.loadProduto();
  },
  methods: {
    loadProduto: function(){
      var params = {
        idproduto: parseInt(this.$route.query.idproduto)
      }

      getProdutoById(params).then(produto => {
        this.idproduto = produto[0].idproduto;
        this.nome = produto[0].nome;
        this.categoria = produto[0].categoria;
        this.preco = produto[0].preco;
        this.desconto = produto[0].desconto;
        this.descricao = produto[0].descricao;
        this.imagem = produto[0].imagem;

        if(this.desconto > 0){
          this.precoDescontado = calculaDesconto(this.preco, this.desconto);
        }
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

        getCarrinho(params).then(produto => {
          this.estaNoCarrinho = produto;
        })
        .catch(({response}) => {
          console.log(response);
        });
      }
    },
    addAoCarrinho: function(){
      this.loadB = true;
      eventBus.$emit("addCar");

      var params = {
        id_cliente: JSON.parse(window.sessionStorage.getItem('cliente')).idusuario,
        id_produto: parseInt(this.$route.query.idproduto)
      }

      inserirAoCarrinho(params).then(inCarrinho => {
        this.loadProduto();
        this.loadB = false;
      })
      .catch(({response}) => {
        console.log(response);
        this.loadB = false;
      });
    },
    removeDoCarrinho: function(){
      this.loadB = true;
      eventBus.$emit("remCar");

      var params = {
        id_cliente: JSON.parse(window.sessionStorage.getItem('cliente')).idusuario,
        id_produto: parseInt(this.$route.query.idproduto)
      }

      retirarDoCarrinho(params).then(remCarrinho => {
        this.loadProduto();
        this.loadB = false;
      })
      .catch(({response}) => {
        console.log(response);
        this.loadB = false;
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.produto .container{
  padding-bottom: 3rem;
}
h1{
  margin-top: 2rem;
}
table{
  font-size: 1.7rem;
  width: -webkit-fill-available;
}
table button{
  font-size: 1.3rem;
}
table button svg{
  margin-bottom: 0.2rem;
}
input[type="number"]{
  width: 150px;
  display: inherit;
  font-size: 1.3rem;
}
table tbody tr td{
  padding: 1rem;
  border-bottom: black solid 0.1rem;
}
table p{
  width: fit-content;
  margin: 0;
  display: contents;
}
.precoSD{
  font-size: 1.3rem;
  color: gray;
}

</style>
