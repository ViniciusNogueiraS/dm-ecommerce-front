<template>
  <div class="perfil">
    <cabecalho></cabecalho>
    <div class="container">
      <h1>Perfil</h1>
      <hr>
      <table class="table table-striped">
        <tbody>
          <tr>
            <td>Nome</td>
            <td class="table-value">{{cliente.nome}}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td class="table-value">{{cliente.email}}</td>
          </tr>
          <tr>
            <td>Senha</td>
            <td class="table-value">{{cliente.senha}}</td>
          </tr>
          <tr>
            <td>Telefone</td>
            <td class="table-value">{{cliente.telefone}}</td>
          </tr>
          <tr>
            <td>CPF</td>
            <td class="table-value">{{cliente.cpf}}</td>
          </tr>
          <th colspan="2">Endereço</th>
          <tr>
            <td>Rua</td>
            <td class="table-value">{{cliente.endereco.rua}}</td>
          </tr>
          <tr>
            <td>Número</td>
            <td class="table-value">{{cliente.endereco.numero}}</td>
          </tr>
          <tr>
            <td>Referência</td>
            <td class="table-value">{{cliente.endereco.referencia}}</td>
          </tr>
          <tr>
            <td>Bairro</td>
            <td class="table-value">{{cliente.endereco.bairro}}</td>
          </tr>
          <tr>
            <td>Cidade</td>
            <td class="table-value">{{cliente.endereco.cidade}}</td>
          </tr>
          <tr>
            <td>UF</td>
            <td class="table-value">{{cliente.endereco.uf}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <rodape></rodape>
  </div>
</template>

<script content-type="text/javascript">
import cabecalho from './cabecalho';
import rodape from './rodape';
import Vue from 'vue';

export default {
  name: 'perfil',
  components: {
    cabecalho,
    rodape
  },
  data() {
    return {
      cliente: JSON.parse(window.sessionStorage.getItem('cliente'))
    }
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.table{
  margin-bottom: 3vw;
}
</style>
