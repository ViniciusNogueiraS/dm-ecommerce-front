<template>
  <main role="main" class="principal">
    <cabecalho ref="cabecalho"></cabecalho>
    <div id="carouselExampleCaptions" class="carousel slide" data-ride="carousel">
      <ol class="carousel-indicators">
        <li data-target="#carouselExampleCaptions" data-slide-to="0" class="active"></li>
        <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
        <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
      </ol>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src="http://localhost:3000/images/w1.jpg" class="d-block w-100" alt="">
        </div>
        <div class="carousel-item">
          <img src="http://localhost:3000/images/w2.jpg" class="d-block w-100" alt="">
        </div>
        <div class="carousel-item">
          <img src="http://localhost:3000/images/w3.jpg" class="d-block w-100" alt="">
        </div>
      </div>
      <a class="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>
    <cards1></cards1>
    <rodape></rodape>
  </main>
</template>

<script>
import cabecalho from './cabecalho';
import rodape from './rodape';
import cards1 from './cards1';

export default {
  name: 'principal',
  components: {
    cabecalho,
    cards1,
    rodape
  },
  data () {
    return {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#carouselExampleCaptions{
  padding-bottom: 1vw;
}
.carousel-indicators li{
  height: 10px;
  width: 10px;
  border-radius: 100%;
}
.carousel-item{
  z-index: -1;
  height: 30%;
}
@media (min-width: 576px) {
  .w-100{
    height: 30vh;
  }
}
@media (min-width: 992px){
  .w-100{
    height: 60vh;
  }
}
</style>
