<template>
  <div class="pedido">
    <cabecalho></cabecalho>
    <div class="container">
      <h1>Pedido</h1>
      <hr>
      <div class="d-none d-sm-block table table-striped"><!-- TEMPLATE DESKTOP-->
        <div class="thead">
          <div class="row">
            <div class="col-2">Imagem</div>
            <div class="col-2">Nome</div>
            <div class="col-2">Categoria</div>
            <div class="col-2">Desconto</div>
            <div class="col-2">Preço</div>
            <div class="col-2">Quantidade</div>
          </div>
        </div>
        <div class="tbody">
          <div class="row" v-if="pedido.length == 0">
            <div class="col-12">Não há produtos em sua lista de pedidos!</div>
          </div>
          <div class="row" v-else v-for="item in pedido" v-bind:key="item.produto.idproduto">
            <div class="col-2"><img v-bind:src="'http://localhost:3000/images/'+item.produto.imagem" height="80" width="80"></div>
            <div class="col-2">
              <router-link :to="'/produto?idproduto='+item.produto.idproduto">
                {{ item.produto.nome }}
              </router-link>
            </div>
            <div class="col-2">{{ item.produto.categoria }}</div>
            <div class="col-2">{{ item.produto.desconto }}%</div>
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
            <div class="col-2">{{item.quantidade}}</div>
          </div>
          <div class="row" v-if="pedido.length > 0">
            <div class="col-2">
              <b>TOTAL</b>
            </div>
            <div class="col-6"></div>
            <div class="col-2">
              <b>{{total | currency}}</b>
            </div>
            <div class="col-2"></div>
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
          <div class="row" v-if="pedido.length == 0">
            <div class="col-12">Seu carrinho está vazio!</div>
          </div>
          <div class="row" v-else v-for="item in pedido" v-bind:key="item.produto.idproduto">
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
              {{item.quantidade}}
            </div>
          </div>
          <div class="row" v-if="pedido.length > 0">
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


      <div v-if="pedido.length > 0"><br>
        <h1>Informações</h1>
        <hr>
        <div v-if="cliente != null">
          <label>Nome
            <input class="form-control" disabled type="text" placeholder="Nome" v-model="cliente.nome">
          </label>
          <label>Email
            <input class="form-control" disabled type="text" placeholder="Email" v-model="cliente.email">
          </label>
          <label>Telefone
            <input class="form-control" disabled type="text" placeholder="Telefone" v-model="cliente.telefone">
          </label>
          <label>CPF
            <input class="form-control" disabled type="text" placeholder="CPF" v-model="cliente.cpf">
          </label>
          <h2>Endereço</h2>
          <div id="msgCad" class="toast" role="alert" aria-live="assertive" aria-atomic="true" data-delay="8000">
            <div class="toast-body">
              {{msgCad}}
            </div>
          </div>
          <label>
            <input type="checkbox" checked @change="enderecoCad = Boolean(!enderecoCad)">
            Usar endereço cadastrado.
          </label>
          <div v-if="enderecoCad">
            <label>Rua
              <input class="form-control" disabled type="text" placeholder="Rua" v-model="cliente.endereco.rua">
            </label>
            <label>Número
              <input class="form-control" disabled type="text" placeholder="Número" v-model="cliente.endereco.numero">
            </label>
            <label>Referência
              <input class="form-control" disabled type="text" placeholder="Referência" v-model="cliente.endereco.referencia">
            </label>
            <label>Bairro
              <input class="form-control" disabled type="text" placeholder="Bairro" v-model="cliente.endereco.bairro">
            </label>
            <label>Cidade
              <input class="form-control" disabled type="text" placeholder="Cidade" v-model="cliente.endereco.cidade">
            </label>
            <label>UF
              <input class="form-control" disabled type="text" placeholder="UF" v-model="cliente.endereco.uf">
            </label>
          </div>
          <div v-else>
            <label>Rua
              <input class="form-control" type="text" placeholder="Rua" v-model="rua">
            </label>
            <label>Número
              <input class="form-control" type="text" placeholder="Número" v-model="numero">
            </label>
            <label>Referência
              <input class="form-control" type="text" placeholder="Referência" v-model="referencia">
            </label>
            <label>Bairro
              <input class="form-control" type="text" placeholder="Bairro" v-model="bairro">
            </label>
            <label>Cidade
              <input class="form-control" type="text" placeholder="Cidade" v-model="cidade">
            </label>
            <label>UF<br>
              <select class="custom-select" v-model="uf">
                <option v-bind:value="'AC'" :selected="true">AC</option>
                <option v-bind:value="'AL'">AL</option>
                <option v-bind:value="'AP'">AP</option>
                <option v-bind:value="'AM'">AM</option>
                <option v-bind:value="'BA'">BA</option>
                <option v-bind:value="'CE'">CE</option>
                <option v-bind:value="'DF'">DF</option>
                <option v-bind:value="'ES'">ES</option>
                <option v-bind:value="'GO'">GO</option>
                <option v-bind:value="'MA'">MA</option>
                <option v-bind:value="'MT'">MT</option>
                <option v-bind:value="'MS'">MS</option>
                <option v-bind:value="'MG'">MG</option>
                <option v-bind:value="'PA'">PA</option>
                <option v-bind:value="'PB'">PB</option>
                <option v-bind:value="'PR'">PR</option>
                <option v-bind:value="'PE'">PE</option>
                <option v-bind:value="'PI'">PI</option>
                <option v-bind:value="'RJ'">RJ</option>
                <option v-bind:value="'RN'">RN</option>
                <option v-bind:value="'RS'">RS</option>
                <option v-bind:value="'RO'">RO</option>
                <option v-bind:value="'RR'">RR</option>
                <option v-bind:value="'SC'">SC</option>
                <option v-bind:value="'SP'">SP</option>
                <option v-bind:value="'SE'">SE</option>
                <option v-bind:value="'TO'">TO</option>
              </select>
            </label>
          </div>
        </div>
        <div v-else>
          <label>Nome
            <input class="form-control" type="text" placeholder="Nome" v-model="nome">
          </label>
          <label>Email
            <input class="form-control" type="text" placeholder="Email" v-model="email">
          </label>
          <label>Telefone
            <input class="form-control" type="text" placeholder="Telefone" v-model="telefone">
          </label>
          <label>CPF
            <input class="form-control" type="text" placeholder="CPF" v-model="cpf">
          </label>
          <h2>Endereço</h2>
          <div id="msgCad" class="toast" role="alert" aria-live="assertive" aria-atomic="true" data-delay="8000">
            <div class="toast-body">
              {{msgCad}}
            </div>
          </div>
          <label>Rua
            <input class="form-control" type="text" placeholder="Rua" v-model="rua">
          </label>
          <label>Número
            <input class="form-control" type="text" placeholder="Número" v-model="numero">
          </label>
          <label>Referência
            <input class="form-control" type="text" placeholder="Referência" v-model="referencia">
          </label>
          <label>Bairro
            <input class="form-control" type="text" placeholder="Bairro" v-model="bairro">
          </label>
          <label>Cidade
            <input class="form-control" type="text" placeholder="Cidade" v-model="cidade">
          </label>
          <label>UF<br>
            <select class="custom-select" v-model="uf">
              <option v-bind:value="'AC'" :selected="true">AC</option>
              <option v-bind:value="'AL'">AL</option>
              <option v-bind:value="'AP'">AP</option>
              <option v-bind:value="'AM'">AM</option>
              <option v-bind:value="'BA'">BA</option>
              <option v-bind:value="'CE'">CE</option>
              <option v-bind:value="'DF'">DF</option>
              <option v-bind:value="'ES'">ES</option>
              <option v-bind:value="'GO'">GO</option>
              <option v-bind:value="'MA'">MA</option>
              <option v-bind:value="'MT'">MT</option>
              <option v-bind:value="'MS'">MS</option>
              <option v-bind:value="'MG'">MG</option>
              <option v-bind:value="'PA'">PA</option>
              <option v-bind:value="'PB'">PB</option>
              <option v-bind:value="'PR'">PR</option>
              <option v-bind:value="'PE'">PE</option>
              <option v-bind:value="'PI'">PI</option>
              <option v-bind:value="'RJ'">RJ</option>
              <option v-bind:value="'RN'">RN</option>
              <option v-bind:value="'RS'">RS</option>
              <option v-bind:value="'RO'">RO</option>
              <option v-bind:value="'RR'">RR</option>
              <option v-bind:value="'SC'">SC</option>
              <option v-bind:value="'SP'">SP</option>
              <option v-bind:value="'SE'">SE</option>
              <option v-bind:value="'TO'">TO</option>
            </select>
          </label>
        </div>
        <div id="pagamento"><br>
          <h1>Pagamento</h1>
          <hr>

          <label class="form-control">
            <input type="radio" class="radio-button" name="forma_pagamento" v-model="forma_pagamento" value="boleto">
            <svg width="1.3em" height="1.3em" viewBox="0 0 16 16" class="bi bi-upc" fill="currentColor" xmls="http://www.w3.org/1000/svg">
              <path d="M3 4.5a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-7zm3 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7z"/>
            </svg>
            Boleto Bancário
          </label>
          <br>
          
          <label class="form-control">
            <input type="radio" class="radio-button" name="forma_pagamento" v-model="forma_pagamento" value="cartao">
            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-credit-card-2-back-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5H0V4zm11.5 1a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-2z"/>
              <path d="M0 11v1a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-1H0z"/>
            </svg>
            Cartão de Crédito
          </label>
          <div id="formCard" v-if="forma_pagamento == 'cartao'">
            <label>
              Número do Cartão de Crédito
              <input class="form-control" type="text" placeholder="xxxx-xxxx-xxxx-xxxx" v-model="num_ct_credito">
            </label>
            <label>
              Número da Agência Bancária
              <input class="form-control" type="text" placeholder="xxxx" v-model="agencia">
            </label>
          </div>
        </div>
        <router-link class="btn btn-success" to="/">Realizar Compra</router-link><br><br>
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
import {somaTotal} from '../resources/helpers.js';
import {getCarrinho, getProdutoById} from '../services/services.js';

export default {
  name: 'carrinho',
  components: {
    cabecalho,
    rodape
  },
  data() {
    return {
      enderecoCad: true,
      msgCad: '',
      tipo: '',
      pedido: [],
      total: 0,
      cliente: JSON.parse(window.sessionStorage.getItem('cliente')),
      nome: '',
      email: '',
      telefone: '',
      cpf: '',
      rua: '',
      numero: '',
      referencia: '',
      bairro: '',
      cidade: '',
      uf: 'AC',
      forma_pagamento: 'boleto',
      agencia: 0,
      num_ct_credito: 0
    }
  },
  mounted: function(){
    if (this.$route.query.idproduto){//Pedido único

      var params = {
        idproduto: this.$route.query.idproduto
      }
      
      getProdutoById(params).then(produto => {
        
        var item = {
          produto: produto[0],
          quantidade: this.$route.query.quantidade
        }

        this.pedido.push(item);
        this.atualizaTotal();
      })
      .catch(({response}) => {
        this.msgCad = response;
        $('#msgCad').toast('show');
      });

    }else if (window.sessionStorage.getItem('carrinho')) {//Pedido por carrinho

      this.pedido = JSON.parse(window.sessionStorage.getItem('carrinho')).items;
      this.atualizaTotal();

    } else {//Pedido sem tipo determinado

      this.$router.push('/');
    }
  },
  methods: {
    atualizaTotal: function(){
      var precos_descontados = [];

      this.pedido.forEach(item => {
        var subTotal = item.produto.preco_descontado * item.quantidade;
        precos_descontados.push(subTotal);
      });

      this.total = somaTotal(precos_descontados);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
  #pagamento .form-control{
    display: block;
    font-size: medium;
    padding: 1vh;
    padding-top: 0.3vw;
    height: 5vh;
    width: 60%;
  }
  #pagamento .form-control svg{
    font-size: large;
    margin: 3px;
  }
  #formCard{
    border-radius: 1vh;
    background-color: #212529;
    color: white;
    padding: 2vh;
    width: 80%;
    margin-bottom: 2vh;
  }
  #formCard .form-control{
    width: 100%;
  }
}
@media (min-width: 992px) {
  .table{
    font-size: large;
  }
  #pagamento .form-control{
    display: block;
    font-size: large;
    padding: 1vh;
    padding-top: 0.3vw;
    width: 30%;
  }
  #pagamento .form-control:hover{
    cursor: pointer;
  }
  #formCard{
    border-radius: 1vh;
    background-color: #212529;
    color: white;
    padding: 2vh;
    width: 40%;
    margin-bottom: 2vh;
  }
  #formCard .form-control{
    width: 100%;
  }
}
label{
  display: inline;
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
.toast{
  position: absolute;
  margin-left: 34%;
  color: white;
  font-weight: bold;
  background-color: #dc3546;
}
</style>
