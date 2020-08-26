<template>
  <div class="painelADM">
    <barraADM></barraADM>
    <div class="container2">
        <div class="cabecalhoADM">
        <button type="button" class="btn btn-secundary" @click="listProdutos">Listar Produtos</button>
        <button type="button" class="btn btn-secundary" @click="listClientes">Listar Clientes</button>
        <div v-if="loadPADM" class="spinner-border spinner-border-sm" role="status"></div>
      </div>
      <table id="produtosADM" class="table table-striped" v-if="produtos.length > 0 && showProdutos">
        <thead>
          <th colspan="8">PRODUTOS</th>
          <tr>
            <td>ID</td>
            <td>Imagem</td>
            <td>Nome</td>
            <td>Categoria</td>
            <td>Preço</td>
            <td>Desconto</td>
            <td>Preço Descontado</td>
            <td>Data de Cadastro</td>
            <td colspan="2">Ações</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="produto in produtos" v-bind:key="produto.idproduto">
            <td class="align-middle">{{produto.idproduto}}</td>
            <td><img v-bind:src="'http://localhost:3000/images/'+produto.imagem" height="80" width="80"></td>
            <td class="align-middle">{{produto.nome}}</td>
            <td class="align-middle">{{produto.categoria}}</td>
            <td class="align-middle">{{produto.preco | currency }}</td>
            <td class="align-middle">{{produto.desconto}}%</td>
            <td class="align-middle">{{produto.preco_descontado | currency }}</td>
            <td class="align-middle">{{produto.data_cadastro}}</td>
            <td class="align-middle">
              <button type="button" class="btn btn-primary" @click="alterarProduto(produto.idproduto)">
                Alterar
                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M11.293 1.293a1 1 0 0 1 1.414 0l2 2a1 1 0 0 1 0 1.414l-9 9a1 1 0 0 1-.39.242l-3 1a1 1 0 0 1-1.266-1.265l1-3a1 1 0 0 1 .242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z"/>
                  <path fill-rule="evenodd" d="M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 0 0 .5.5H4v.5a.5.5 0 0 0 .5.5H5v.5a.5.5 0 0 0 .5.5H6v-1.5a.5.5 0 0 0-.5-.5H5v-.5a.5.5 0 0 0-.5-.5H3z"/>
                </svg>
              </button>
            </td>
            <td class="align-middle">
              <button type="button" class="btn btn-danger" @click="excluirProduto(produto.idproduto)">
                Excluir
                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/>
                </svg>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <table class="table table-striped" v-if="clientes.length > 0 && showClientes">
        <thead>
          <th colspan="5">CLIENTES</th>
          <tr>
            <td>ID</td>
            <td>Nome</td>
            <td>Email</td>
            <td>Telefone</td>
            <td>CPF</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="cliente in clientes" v-bind:key="cliente.idusuario">
            <td>{{cliente.idusuario}}</td>
            <td>{{cliente.nome}}</td>
            <td>{{cliente.email}}</td>
            <td>{{cliente.telefone}}</td>
            <td>{{cliente.cpf}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script content-type="text/javascript">
import Vue from 'vue';
import barraADM from './barraADM';
import {getProdutos, getClientes, deleteProdutoById} from '../services/services.js';

export default {
  name: 'painelADM',
  components: {
    barraADM
  },
  data() {
    return {
      showProdutos: false,
      showClientes: false,
      produtos: [],
      clientes: [],
      loadPADM: false
    }
  },
  mounted: function(){

  },
  methods: {
    listProdutos: function(){
      this.loadPADM = true;
      this.showClientes = false;
      this.showProdutos = true;

      getProdutos().then(produtos => {
        this.produtos = produtos;
        this.loadPADM = false;
      })
      .catch(({response}) => {
        console.log(response);
        this.loadPADM = false;
      });
    },
    listClientes: function(){
      this.loadPADM = true;
      this.showProdutos = false;
      this.showClientes = true;

      getClientes().then(clientes => {
        this.clientes = clientes;
        this.loadPADM = false;
      })
      .catch(({response}) => {
        console.log(response);
        this.loadPADM = false;
      });
    },
    alterarProduto: function(idproduto){
      this.$router.push('/cadastroProdutoADM?idproduto='+idproduto);
    },
    excluirProduto: function(idproduto){
      if (confirm("Deseja mesmo excluir este produto?")) {
        var params = {
          idproduto
        }

        deleteProdutoById(params).then(remProduto => {
          this.listProdutos();
          alert(remProduto);
        })
        .catch(({response}) => {
          console.log(response);
        });
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.cabecalhoADM button{
  font-weight: bold;
}
table td{
  padding: 0.3vw;
  text-align: center;
  font-size: 1vw;
}
table thead{
  font-weight: bold;
  text-align: center;
}
</style>
