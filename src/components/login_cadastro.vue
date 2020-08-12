<template>
  <div class="login_cadastro">
    <cabecalho></cabecalho>
    <div class="container">
      <div id="log">
        <form v-on:keyup.enter="logar">
          <h1>Login</h1>
          <hr>
          <div id="msgLog" class="toast" role="alert" aria-live="assertive" aria-atomic="true" data-delay="8000">
            <div class="toast-body">
              {{msgLog}}
            </div>
          </div>
          <input class="form-control" placeholder="Email" type="text" v-model="emailLog">
          <input class="form-control" placeholder="Senha" type="password" v-model="senhaLog">
          <button class="btn btn-primary" type="button" @click="logar">
            Entrar
            <div v-if="loadE" class="spinner-border spinner-border-sm" role="status"></div>
          </button>
        </form>
      </div>
      <div id="cad">
        <h1>Cadastro</h1>
        <hr>
        <input class="form-control" type="text" placeholder="Nome" v-model="nome">
        <input class="form-control" type="text" placeholder="Email" v-model="email">
        <input class="form-control" type="password" placeholder="Senha" v-model="senha">
        <input class="form-control" type="text" placeholder="Telefone" v-model="telefone">
        <input class="form-control" type="text" placeholder="CPF" v-model="cpf">
        <b>Endereço</b><br><br>
        <div id="msgCad" class="toast" role="alert" aria-live="assertive" aria-atomic="true" data-delay="8000">
          <div class="toast-body">
            {{msgCad}}
          </div>
        </div>
        <input class="form-control" type="text" placeholder="Rua" v-model="rua">
        <input class="form-control" type="text" placeholder="Numero" v-model="numero">
        <input class="form-control" type="text" placeholder="Referência" v-model="referencia">
        <input class="form-control" type="text" placeholder="Bairro" v-model="bairro">
        <input class="form-control" type="text" placeholder="Cidade" v-model="cidade">
        <select class="form-control" v-model="uf">
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
        <button class="btn btn-success" type="button" @click="cadastrar">
          Cadastrar
          <div v-if="loadC" class="spinner-border spinner-border-sm" role="status"></div>
        </button>
      </div>
    </div>
    <rodape></rodape>
  </div>
</template>

<script content-type="text/javascript">

import Vue from 'vue';
import cabecalho from './cabecalho';
import rodape from './rodape';
import {runLogin, runCadastro} from '../services/services.js';

export default{
  name: 'login_cadastro',
  components: {
    cabecalho,
    rodape
  },
  data(){
    return {
      temSessao: false,
      loadE: false,
      msgLog: '',
      emailLog: '',
      senhaLog: '',
      loadC: false,
      msgCad: '',
      nome: '',
      email: '',
      senha: '',
      telefone: '',
      cpf: '',
      rua: '',
      numero: '',
      referencia: '',
      bairro: '',
      cidade: '',
      uf: 'AC'
    }
  },
  methods: {
    cadastrar: function(){
      this.loadC = true;

      var params = {
        nome: this.nome,
        email: this.email,
        senha: this.senha,
        telefone: this.telefone,
        cpf: this.cpf,
        endereco: {
          rua: this.rua,
          numero: this.numero,
          referencia: this.referencia,
          bairro: this.bairro,
          cidade: this.cidade,
          uf: this.uf
        }
      }

      runCadastro(params).then(cadastro => {
        this.$router.push('/');
      })
      .catch(({response}) => {
        this.msgCad = response;
        $('#msgCad').toast('show');
        this.loadC = false;
      });
    },
    logar: function(){
      this.loadE = true;

      var params = {
        email: this.emailLog,
        senha: this.senhaLog
      }

      runLogin(params).then(sessao => {
        if (sessao.cliente) {
          this.temSessao = true;

          window.sessionStorage.setItem('cliente', JSON.stringify(sessao.cliente));
          window.sessionStorage.setItem('token', sessao.token);

          this.$router.push('/');
        }else{
          if (sessao.administrador) {
            window.sessionStorage.setItem('administrador', JSON.stringify(sessao.administrador));
            window.sessionStorage.setItem('token', sessao.token);

            this.$router.push('/painelADM');
          }
        }
      })
      .catch(({response}) => {
        this.msgLog = response.data.message;
        $('#msgLog').toast('show');
        this.loadE = false;
      });
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.form-control{
  margin-bottom: 1rem;
  width: 50%;
}
#cad{
  margin-bottom: 2rem;
}
.toast{
  position: absolute;
  margin-left: 34%;
  color: white;
  font-weight: bold;
  background-color: #dc3546;
}
</style>
