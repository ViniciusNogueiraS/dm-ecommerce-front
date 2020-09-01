<template>
  <div class="barraADM">
    <div class="list-group">
      <router-link to="/painelADM" @click="estiloBarra(this)" class="list-group-item list-group-item-action">
        <b>PAINEL ADMINISTRATIVO</b>
        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-graph-up" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0h1v16H0V0zm1 15h15v1H1v-1z"/>
          <path fill-rule="evenodd" d="M14.39 4.312L10.041 9.75 7 6.707l-3.646 3.647-.708-.708L7 5.293 9.959 8.25l3.65-4.563.781.624z"/>
          <path fill-rule="evenodd" d="M10 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4h-3.5a.5.5 0 0 1-.5-.5z"/>
        </svg>
      </router-link>
      <router-link to="/cadastroProdutoADM" @click="estiloBarra(this)" class="list-group-item list-group-item-action">Cadastro de Produto</router-link>
      <router-link to="/perfilADM" @click="estiloBarra(this)" class="list-group-item list-group-item-action">Perfil</router-link>
      <button @click="deslogar" class="list-group-item list-group-item-action">Sair</button>
    </div>
  </div>
</template>

<script content-type="text/javascript">
import Vue from 'vue';
import {runLogout} from '../services/services.js';

export default{
  name: 'barraADM',
  data(){
    return {
    }
  },
  methods: {
    deslogar: function(){
      if (confirm("Deseja sair do Painel Administrativo?")) {
        runLogout().then(logout => {
          if (logout.token == null) {
            this.msgLog = "";
            this.temSessao = false;
  
            window.sessionStorage.clear();
            this.$router.push('/');
          }
        })
        .catch(({response}) => {
          console.log(response);
        });
      }
    }
  },
  estiloBarra(link){
    document.querySelector('.list-group-item').className = 'list-group-item list-group-item-action';
    link.className = 'list-group-item list-group-item-action router-link-exact-active router-link-active';
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.barraADM{
  position: fixed;
  bottom: 0;
  height: -webkit-fill-available;
  background-color: rgb(31, 31, 31);
}
button{
  float: left;
  color: white;
  transition: 0.3s;
}
a{
  float: left;
}
.list-group-item{
  background-color: rgb(31, 31, 31);
  color: white;
}
.router-link-active{
  background-color: #007bff;
}
.list-group-item:hover{
  background-color: rgb(21, 21, 21);
}
.router-link-active:hover{
  background-color: #007bff;
}
</style>
