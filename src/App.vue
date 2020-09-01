<template>
  <div id="app">
    <router-view :key="$route.fullPath" component="principal"/>
  </div>
</template>

<script>

export default {
  name: 'App',
  data(){
    return{
    }
  }
}

</script>

<style>
h1, h2 {
  font-weight: normal;
}
.form-control, .custom-select{
  margin-bottom: 1vw;
  width: 50%;
}
.row{
  flex-wrap: initial;
}
.col{
  width: auto;
}
.card:hover{
  border: #0056b3 solid 1px;
  border-bottom: #0056b3 solid 5px;
}
.card{
  display: inline-flex;
  text-align: center;
  transition: 0.3s;
}
.card-body{
  padding: 5%;
}
.card h2, h3{
  font-size: 2.5vh;
}
.off{
  position: absolute;
  font-size: 2vh;
  top: 1%;
  left: 2%;
  color: rgba(255, 0, 0, 0.7);
}
@media (max-width: 576px) {
  .precoSD{
    font-size: small;
    color: gray;
  }
  /* CARDS */
  .card{
    width: 145px;
    height: 240px;
    margin: 2.6vw;
  }
  .card img{
    width: 140px;
    height: 140px;
    padding: 5px;
    margin-top: 10px;
  }
  /* OUTROS */
  h1{
    margin-top: 2vw;
    font-size: x-large;
  }
  h2{
    margin-top: 2vw;
    margin-bottom: 0;
    font-size: large;
  }
}
@media (min-width: 992px){
  .precoSD{
    font-size: medium;
    color: gray;
  }
  /* CARDS */
  .card{
    width: 185px;
    height: 280px;
    margin: 1vw;
    margin-left: 2.7vw;
    margin-right: 2.7vw;
  }
  .card img{
    width: 160px;
    height: 160px;
    padding: 5px;
    margin-top: 10px;
  }
  /* OUTROS */
  h1{
    margin-top: 2vw;
    font-size: 2.5vw;
  }
}
.btn-link:hover{
  text-decoration: none;
}
a{
  color: #007bff;
  transition: 0.3s;
  padding: 0.5vh;
}
a:hover{
  text-decoration: none;
}
.table-value{
  font-style: italic;
}
.spinner-border{
  font-size: 0.5vh;
  margin-bottom: 0.1vh;
}
.container2{
  padding: 1vh;
  margin-left: 18vh;
}
@media (max-width: 576px) {
  .form-control{
    height: 4vh;
    font-size: 2vh;
    padding: 1vh;
  }
  .custom-select{
    height: 4vh;
    font-size: 2vh;
    padding: 0;
    padding-left: 1vh;
  }
  .btn{
    font-size: 2vh;
    padding: 1vh;
  }
}
strike{
  color: gray;
}
</style>
