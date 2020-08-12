<template>
  <div class="pedido">
    <cabecalho></cabecalho>
    <div class="container">
      <h1>Pedido</h1>
      <table class="table table-striped">
        <thead>
          <tr>
            <td>Imagem</td>
            <td>Nome</td>
            <td>Categoria</td>
            <td>Desconto</td>
            <td>Preço</td>
            <td>Quantidade</td>
          </tr>
        </thead>
        <tbody>
          <tr v-if="pedido.length == 0">
            <td colspan="6">Não há produtos em sua lista de pedidos!</td>
          </tr>
          <tr v-else v-for="item in pedido" v-bind:key="item.produto.idproduto">
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
                {{item.produto.preco | currency}}
              </p>
              <strike class="precoSD" v-else>
                {{item.produto.preco | currency}}
              </strike>
              <p v-if="item.produto.desconto > 0">
                {{item.produto.preco_descontado | currency}}
              </p>
            </td>
            <td class="align-middle">{{item.quantidade}}</td>
          </tr>
          <tr>
            <td><b>TOTAL</b></td>
            <td colspan="3"></td>
            <td><b>{{total | currency}}</b></td><td></td>
          </tr>
        </tbody>
      </table>
      <div v-if="pedido.length > 0"><br>
        <h2>Informações</h2>
        <hr>
        <div v-if="cliente != null">
          <label>Nome</label><input class="form-control" disabled type="text" placeholder="Nome" v-model="cliente.nome">
          <label>Email</label><input class="form-control" disabled type="text" placeholder="Email" v-model="cliente.email">
          <label>Telefone</label><input class="form-control" disabled type="text" placeholder="Telefone" v-model="cliente.telefone">
          <label>CPF</label><input class="form-control" disabled type="text" placeholder="CPF" v-model="cliente.cpf">
          <b>Endereço</b><br>
          <div id="msgCad" class="toast" role="alert" aria-live="assertive" aria-atomic="true" data-delay="8000">
            <div class="toast-body">
              {{msgCad}}
            </div>
          </div>
          <input type="checkbox" checked @change="enderecoCad = Boolean(!enderecoCad)">Usar endereço cadastrado.
          <div v-if="enderecoCad">
            <label>Rua</label><input class="form-control" disabled type="text" placeholder="Rua" v-model="cliente.endereco.rua">
            <label>Número</label><input class="form-control" disabled type="text" placeholder="Número" v-model="cliente.endereco.numero">
            <label>Referência</label><input class="form-control" disabled type="text" placeholder="Referência" v-model="cliente.endereco.referencia">
            <label>Bairro</label><input class="form-control" disabled type="text" placeholder="Bairro" v-model="cliente.endereco.bairro">
            <label>Cidade</label><input class="form-control" disabled type="text" placeholder="Cidade" v-model="cliente.endereco.cidade">
            <label>UF</label><input class="form-control" disabled type="text" placeholder="UF" v-model="cliente.endereco.uf">
          </div>
          <div v-else>
            <label>Rua</label><input class="form-control" type="text" placeholder="Rua" v-model="rua">
            <label>Número</label><input class="form-control" type="text" placeholder="Número" v-model="numero">
            <label>Referência</label><input class="form-control" type="text" placeholder="Referência" v-model="referencia">
            <label>Bairro</label><input class="form-control" type="text" placeholder="Bairro" v-model="bairro">
            <label>Cidade</label><input class="form-control" type="text" placeholder="Cidade" v-model="cidade">
            <label>UF</label><select class="form-control" v-model="uf">
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
          </div>
        </div>
        <div v-else>
          <label>Nome</label><input class="form-control" type="text" placeholder="Nome" v-model="nome">
          <label>Email</label><input class="form-control" type="text" placeholder="Email" v-model="email">
          <label>Telefone</label><input class="form-control" type="text" placeholder="Telefone" v-model="telefone">
          <label>CPF</label><input class="form-control" type="text" placeholder="CPF" v-model="cpf">
          <b>Endereço</b><br><br>
          <div id="msgCad" class="toast" role="alert" aria-live="assertive" aria-atomic="true" data-delay="8000">
            <div class="toast-body">
              {{msgCad}}
            </div>
          </div>
          <label>Rua</label><input class="form-control" type="text" placeholder="Rua" v-model="rua">
          <label>Número</label><input class="form-control" type="text" placeholder="Número" v-model="numero">
          <label>Referência</label><input class="form-control" type="text" placeholder="Referência" v-model="referencia">
          <label>Bairro</label><input class="form-control" type="text" placeholder="Bairro" v-model="bairro">
          <label>Cidade</label><input class="form-control" type="text" placeholder="Cidade" v-model="cidade">
          <label>UF</label><select class="form-control" v-model="uf">
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
        </div>
        <div id="pagamento"><br>
          <h2>Pagamento</h2>
          <hr>

          <label class="form-control">
            <input type="radio" class="radio-button" name="forma_pagamento" v-model="forma_pagamento" value="boleto">

            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-upc" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
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

          <div v-if="forma_pagamento == 'cartao'">
            <label class="fom_control">
              Número da Agência Bancária
              <input type="number" v-model="agencia">
            </label>
            <label class="fom_control">
              Número do Cartão de Crédito
              <input type="number" v-model="num_ct_credito">
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
.form-control{
  margin-bottom: 1rem;
  width: 50%;
}
label{
  display: table-row;
}
label svg{
  font-size: 2rem;
}
.toast{
  position: absolute;
  margin-left: 34%;
  color: white;
  font-weight: bold;
  background-color: #dc3546;
}
#pagamento .form-control{
  display: block;
  font-size: 1.3rem;
  padding: 1rem;
  padding-top: 0.3rem;
  width: 30%;
}
#pagamento .form-control:hover{
  cursor: pointer;
}
</style>
