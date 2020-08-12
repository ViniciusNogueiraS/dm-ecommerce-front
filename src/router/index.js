import Vue from 'vue'
import Router from 'vue-router'
import principal from '@/components/principal'
import perfil from '@/components/perfil'
import login_cadastro from '@/components/login_cadastro'
import carrinho from '@/components/carrinho'
import produto from '@/components/produto'
import pesquisa from '@/components/pesquisa'
import categoria from '@/components/categoria'
import pedido from '@/components/pedido'
import barraADM from '@/components/barraADM'
import painelADM from '@/components/painelADM'
import perfilADM from '@/components/perfilADM'
import cadastroProdutoADM from '@/components/cadastroProdutoADM'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: principal
    },
    {
      path: '/perfil',
      component: perfil
    },
    {
      path: '/carrinho',
      component: carrinho
    },
    {
      path: '/produto',
      component: produto
    },
    {
      path: '/login_cadastro',
      component: login_cadastro
    },
    {
      path: '/pesquisa',
      component: pesquisa
    },
    {
      path: '/categoria',
      component: categoria
    },
    {
      path: '/pedido',
      component: pedido
    },
    {
      path: '/barraADM',
      component: barraADM,
      beforeEnter: (_to, _from, next) => {

        if (!window.sessionStorage.getItem('administrador')) {
          next('/login_cadastro');
        }

        next();
      }
    },
    {
      path: '/painelADM',
      component: painelADM,
      beforeEnter: (_to, _from, next) => {

        if (!window.sessionStorage.getItem('administrador')) {
          next('/login_cadastro');
        }

        next();
      }
    },
    {
      path: '/perfilADM',
      component: perfilADM,
      beforeEnter: (_to, _from, next) => {

        if (!window.sessionStorage.getItem('administrador')) {
          next('/login_cadastro');
        }

        next();
      }
    },
    {
      path: '/cadastroProdutoADM',
      component: cadastroProdutoADM,
      beforeEnter: (_to, _from, next) => {

        if (!window.sessionStorage.getItem('administrador')) {
          next('/login_cadastro');
        }

        next();
      }
    }
  ]
})
