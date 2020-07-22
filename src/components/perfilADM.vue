<template>
  <div class="perfilADM">
    <barraADM></barraADM>
    <div class="container2">
      <table class="table table-striped">
        <tbody>
          <th colspan="2">Perfil</th>
          <tr>
            <td>Nome</td>
            <td>{{administrador.nome}}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>{{administrador.email}}</td>
          </tr>
          <tr>
            <td>Senha</td>
            <td>{{administrador.senha}}</td>
          </tr>
          <tr>
            <td>Telefone</td>
            <td>{{administrador.telefone}}</td>
          </tr>
          <tr>
            <td>Cargo</td>
            <td>{{administrador.cargo}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script content-type="text/javascript">
import barraADM from './barraADM';
import Vue from 'vue';

export default {
  name: 'perfilADM',
  components: {
    barraADM
  },
  data() {
    return {
      administrador: JSON.parse(window.sessionStorage.getItem('administrador'))
    }
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
