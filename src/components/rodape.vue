<template>
  <footer class="rodape" v-bind:style="{position: positionFooter()}">
    <div class="container">
      <ul class="hf">
        <li><router-link to="/">ECOMMERCE</router-link></li>
        <li><router-link to="/ofertas">OFERTAS</router-link></li>
        <li><router-link to="/lacamentos">LANÇAMENTOS</router-link></li>
      </ul>
      <label>Fale Conosco
        <p>v.nog@outlook.com / (22) 99738-7803</p>
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
  background-color: #9eaebe;
}
@media (max-width: 576px){
  label{
    padding: 1vw;
    font-weight: bold;
    font-size: smaller;
  }
  .hf{
    padding: 1vh;
    list-style: none;
    display: flex;
    margin-bottom: 0;
  }
  .hf li{
    font-size: medium;
    margin-right: 2vw;
  }
}
@media (min-width: 992px){
  label{
    padding: 1vw;
    font-weight: bold;
  }
  .hf{
    padding: 1vw;
    list-style: none;
    display: flex;
    margin-bottom: 0;
  }
  .hf li{
    margin-right: 2vw;
    font-size: x-large;
  }
}
</style>
