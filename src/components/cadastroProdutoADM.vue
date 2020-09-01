<template>
  <div class="cadastroProdutoADM">
    <barraADM></barraADM>
    <div class="container">
      <form enctype="multipart/form-data">
        <h1>Novo Produto</h1>
        <label>Nome</label>
        <input class="form-control" type="text" v-model="nome">
        <label>Categoria</label>
        <select class="custom-select" v-model="categoria">
          <option v-bind:value="'Acessórios'" :selected="true">Acessórios</option>
          <option v-bind:value="'Calçados'">Calçados</option>
          <option v-bind:value="'Eletrodomésticos'">Eletrodomésticos</option>
          <option v-bind:value="'Roupas'">Roupas</option>
        </select>
        <label>Preço</label>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">R$</span>
          </div>
            <input type="number" class="form-control" @change="calculaPrecoDescontado()" min="0" step="0.01" v-model="preco" aria-describedby="basic-addon1">
        </div>
        <label>Desconto</label>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">%</span>
          </div>
            <input class="form-control" @change="calculaPrecoDescontado()" type="number" min="0" max="100" v-model="desconto">
        </div>
        <label>Preço Descontado</label>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <label class="form-control">{{preco_descontado | currency}}</label>
          </div>
        </div>
        <div id="imgInput" class="input-group mb-3">
          <img id="output" :src="srcImg" height="325" width="325"/>
          <div class="custom-file">
            <input type="file" @change="onSelectFile" class="custom-file-input" id="inputGroupFile03" aria-describedby="inputGroupFileAddon03">
            <label class="custom-file-label" for="inputGroupFile03">Selecione a imagem</label>
          </div>
        </div>
        <label>Descrição</label>
        <textarea class="form-control" rows="8" cols="80" v-model="descricao"></textarea><br>
        <button v-if="!atualizacao" type="button" class="btn btn-success" @click="cadastrar">
          Cadastrar Produto
          <div v-if="loadC" class="spinner-border spinner-border-sm" role="status"></div>
        </button>
        <button v-else type="button" class="btn btn-primary" @click="atualizar">
          Atualizar Produto
          <div v-if="loadA" class="spinner-border spinner-border-sm" role="status"></div>
        </button>
      </form>
    </div>
  </div>
</template>

<script content-type="text/javascript">
import Vue from 'vue';
import barraADM from './barraADM';
import {getProdutoById, inserirProduto, uploadProdutoById, upImagem} from '../services/services.js';
import {calculaDesconto} from '../resources/helpers.js';

export default {
  name: 'cadastroProdutoADM',
  components: {
    barraADM
  },
  data() {
    return {
      loadC: false,
      loadA: false,
      idproduto: 0,
      nome: '',
      categoria: 'Acessórios',
      preco: 0,
      desconto: 0,
      preco_descontado: 0,
      descricao: '',
      imagem: '',
      srcImg: '',
      atualizacao: false
    }
  },
  mounted: function(){
    
    if (this.$route.query.idproduto) {//edição de produto
      this.idproduto = parseInt(this.$route.query.idproduto);
      this.atualizacao = true;

      var params = {
        idproduto: this.idproduto
      }

      getProdutoById(params).then(produto => {
        this.nome = produto[0].nome;
        this.categoria = produto[0].categoria;
        this.preco = produto[0].preco;
        this.desconto = produto[0].desconto;
        this.preco_descontado = produto[0].preco_descontado;
        this.descricao = produto[0].descricao;
        this.imagem = produto[0].imagem;

        this.srcImg = 'http://localhost:3000/images/'+this.imagem;
      })
      .catch(({response}) => {
        console.log(response);
      });
    }
  },
  methods: {
    onSelectFile(event){
      this.imagem = event.target.files[0];
      this.srcImg = URL.createObjectURL(this.imagem);

      $('#imgInput .custom-file label')[0].innerHTML = this.imagem.name;
    },
    cadastrar: function(){
      this.loadC = true;

      const fd = new FormData();
      fd.append('img', this.imagem, this.imagem.name);

      upImagem(fd).then(upload => {
        
        var params = {
          nome: this.nome,
          categoria: this.categoria,
          preco: this.preco,
          desconto: this.desconto,
          preco_descontado: this.preco_descontado,
          descricao: this.descricao,
          imagem: upload.filename
        }

        inserirProduto(params).then(inProduto => {
          alert(inProduto);
          this.$router.push('/painelADM');
        })
        .catch(({response}) => {
          this.loadC = false;
          console.log(response);
        });
      })
      .catch(({response}) => {
        this.loadC = false;
        console.log(response);
      });
    },
    atualizar: function(){
      
      if (this.imagem instanceof Blob) {//SE UMA NOVA IMAGEM FOI INSERIDA
        this.loadA = true;

        const fd = new FormData();
        fd.append('img', this.imagem, this.imagem.name);

        upImagem(fd).then(upload => {

          var params = {
            idproduto: this.idproduto,
            nome: this.nome,
            categoria: this.categoria,
            preco: this.preco,
            desconto: this.desconto,
            preco_descontado: this.preco_descontado,
            descricao: this.descricao,
            imagem: upload.filename
          }

          uploadProdutoById(params).then(upProduto => {
            alert(upProduto);
            this.$router.push('/painelADM');
          })
          .catch(({response}) => {
            this.loadA = false;
            console.log(response);
          });
        })
        .catch(({response}) => {
          this.loadA = false;
          console.log(response);
        });
        
      }else{
        
        var params = {
          idproduto: this.idproduto,
          nome: this.nome,
          categoria: this.categoria,
          preco: this.preco,
          desconto: this.desconto,
          preco_descontado: this.preco_descontado,
          descricao: this.descricao,
          imagem: this.imagem
        }

        uploadProdutoById(params).then(upProduto => {
          alert(upProduto);
          this.$router.push('/painelADM');
        })
        .catch(({response}) => {
          this.loadA = false;
          console.log(response);
        });
      }
      this.$router.push('/painelADM');
    },
    calculaPrecoDescontado: function(){
      this.preco_descontado = calculaDesconto(this.preco, this.desconto);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1{
  margin-top: 0;
}
.container{
  margin-left: 20vw;
  padding-top: 2vw;
}
.container input{
  width: 50%;
}
.container select{
  width: 50%;
}
.container .input-group{
  width: 50%;
}
#imgInput{
  position: absolute;
  left: 60%;
  top: 7.5vw;
}
#output{
  margin-top: 2.4vw;
}
#imgInput .custom-file{
  position: absolute;
  cursor: pointer;
  width: fit-content;
}
#imgInput .custom-file-input{
  width: 85%;
}
#imgInput .custom-file-label{
  cursor: pointer;
  width: 95%;
  right: 0;
}
</style>
