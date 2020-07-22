<template>
  <header class="cabecalho">
    <div class="container">
      <div class="row">
        <div class="col-3">
          <router-link id="ecommerce-logo" class="btn btn-primary" to="/">
            <b>ECOMMERCE</b>
            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-gem" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M3.1.7a.5.5 0 0 1 .4-.2h9a.5.5 0 0 1 .4.2l2.976 3.974c.149.185.156.45.01.644L8.4 15.3a.5.5 0 0 1-.8 0L.1 5.3a.5.5 0 0 1 0-.6l3-4zm11.386 3.785l-1.806-2.41-.776 2.413 2.582-.003zm-3.633.004l.961-2.989H4.186l.963 2.995 5.704-.006zM5.47 5.495l5.062-.005L8 13.366 5.47 5.495zm-1.371-.999l-.78-2.422-1.818 2.425 2.598-.003zM1.499 5.5l2.92-.003 2.193 6.82L1.5 5.5zm7.889 6.817l2.194-6.828 2.929-.003-5.123 6.831z"/>
            </svg>
          </router-link>
        </div>
        <div id="search" class="col-6">
          <div>
            <form class="input-group mb-3" v-on:keyup.enter="pesquisarProduto">
              <input type="search" class="form-control" v-model="pesquisa" placeholder="O que está procurando?" aria-label="Recipient's username" aria-describedby="button-addon2">
              <div class="input-group-append">
                <button class="btn btn-outline-primary" @click="pesquisarProduto" :disabled="pesquisa == ''" type="button" id="button-addon2">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-search" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"/>
                    <path fill-rule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"/>
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
        <div id="col-user" class="col">
          <div class="user" v-if="temSessao">
            <router-link class="carIcon" to="/carrinho">
              <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-cart3" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm7 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
              </svg><b>{{quantCarrinho}}</b><br>
              Carrinho
            </router-link>
            <router-link to="/perfil">
              <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-person-lines-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm7 1.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm2 9a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z"/>
              </svg>
              Perfil
            </router-link><br>
            <button class="btn btn-link" type="button" @click="deslogar">
              Sair
              <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-reply-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.079 11.9l4.568-3.281a.719.719 0 0 0 0-1.238L9.079 4.1A.716.716 0 0 0 8 4.719V6c-1.5 0-6 0-7 8 2.5-4.5 7-4 7-4v1.281c0 .56.606.898 1.079.62z"/>
              </svg>
            </button>
          </div>
          <div class="noUser" v-else>
            <router-link class="btn btn-primary" to="/login_cadastro">
              Entre ou Cadastre-se!
              <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-arrow-right-square-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm5.646 10.646a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L9.793 7.5H5a.5.5 0 0 0 0 1h4.793l-2.147 2.146z"/>
              </svg>
            </router-link>
          </div>
        </div>
        <div class="col-9">
          <nav>
            <ul class="nav">
              <li class="dropdown">
                <button class="btn btn-link dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Categorias
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <router-link class="dropdown-item" to="/categoria?c=Acessórios">Acessórios</router-link>
                  <router-link class="dropdown-item" to="/categoria?c=Calçados">Calçados</router-link>
                  <router-link class="dropdown-item" to="/categoria?c=Eletrodomésticos">Eletrodomésticos</router-link>
                  <router-link class="dropdown-item" to="/categoria?c=Roupas">Roupas</router-link>
                </div>
              </li>
              <li class="nav-item">
                <router-link to="/ofertas">Ofertas</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/lancamentos">Lançamentos</router-link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </header>
</template>

<script content-type="text/javascript">
import Vue from 'vue';
import eventBus from '../resources/eventBus.vue';
import {runLogout, getCarrinho, getCountCarrinho} from '../resources/services.js';

export default{
  name: 'cabecalho',
  data(){
    return {
      temSessao: false,
      pesquisa: '',
      quantCarrinho: 0
    }
  },
  mounted: function(){//verificando existencia de sessão Cliente
  
    if (window.sessionStorage.getItem('cliente')) {
      this.temSessao = true;

      var params = {
        id_cliente: JSON.parse(window.sessionStorage.getItem('cliente')).idusuario
      }
  
      getCountCarrinho(params).then(count => {
        this.quantCarrinho = count[0].quantidade;
      })
      .catch(({response}) => {
        console.log(response);
      });

    }else{
      if (window.sessionStorage.getItem('administrador')) {
        this.$router.push('/painelADM');
      }else {
        this.temSessao = false;
      }
    }
  },
  created(){
    eventBus.$on("addCar", () => {
      this.quantCarrinho++;
    });

    eventBus.$on("remCar", () => {
      this.quantCarrinho--;
    });
  },
  methods: {
    pesquisarProduto: function(){
      this.$router.push('/pesquisa?pesquisa='+this.pesquisa);
    },
    deslogar: function(){

      runLogout().then(logout => {
        if (logout.token == null) {
          this.temSessao = false;

          window.sessionStorage.clear();

          if (this.$router.currentRoute.path != '/') {
            this.$router.push('/');
          }
        }
      })
      .catch(({response}) => {
        console.log(response);
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.cabecalho{
  background-color: rgb(31, 31, 31);
  color: white;
  box-shadow: 0px 5px 10px black;
}
.container{
  padding-top: 1rem;
}
.user{
  text-align: center;
}
.user a{
  font-size: 1.5rem;
  padding: 1rem;
  float: left;
}
.user .btn-link{
  font-size: 1.5rem;
  padding-top: 10px;
}
.user .carIcon svg{
font-size: 4rem;
}
.user .carIcon b{
  font-size: 1.6rem;
  position: absolute;
}
.noUser{
  text-align: center;
  margin-top: 1rem;
}
nav{
  padding-bottom: 10px;
}
nav ul li{
  margin-right: 2rem;
  font-size: 1.3rem;
}
nav .dropdown button{
  font-size: 1.3rem;
  padding: 0;
  padding-bottom: 5px;
  text-decoration: none;
}
nav .dropdown-menu a{
  color: black;
}
nav .dropdown-menu a:hover{
  background-color: #007bff;
}
nav .dropdown-menu{
  transition: height 0.2s;
}
#log{
  text-align: justify;
}
#search{
  margin-top: 1rem;
}
#col-user{
  height: 90px;
}
#col-user label{
  width: -webkit-fill-available;
}
#col-user input{
  height: 2rem;
  margin-bottom: 2px;
}
</style>
