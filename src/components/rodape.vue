<template>
  <footer class="rodape" v-bind:style="{position: positionFooter()}">
    <div class="container">
      <ul class="nav">
        <li><router-link to="/">ECOMMERCE</router-link></li>
        <li><router-link to="/ofertas">OFERTAS</router-link></li>
        <li><router-link to="/lacamentos">LANÇAMENTOS</router-link></li>
      </ul>
      <label>Fale Conosco
        <ul>
          <li>v.nog@outlook.com</li>
          <li>(22) 99738-7803</li>
        </ul>
      </label>
    </div>
  </footer>
</template>

<script content-type="text/javascript">
import Vue from 'vue';

export default {
  name: 'rodape',
  data() {
    return {
    }
  },
  methods: {
    positionFooter: function(){
      // if ($(document).height() > $(window).height()) {
      //   console.log('aaaaaaaaaa');
      //   return "absolute";
      // }else{
      //   console.log('bbbbbbbbbbbb');
      //   return "none";
      // }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.rodape{
  bottom: 0;
  width: 100%;
  background-color: rgb(31, 31, 31);
  color: white;
}
label{
  padding: 1rem;
  font-weight: bold;
}
.nav{
  padding: 1rem;
}
.nav li{
  margin-right: 2rem;
  font-size: 1.3rem;
}
</style>
