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
#ecommerce-logo{
  font-size: 1.8rem;
}
#ecommerce-logo svg{
  font-size: 2.2rem;
  margin-bottom: 0.2rem;
}
h1{
  margin-top: 2rem;
}
.btn-link:hover{
  text-decoration: none;
}
a{
  color: #007bff;
  transition: 0.3s;
}
a:hover{
  text-decoration: none;
}
h1, h2 {
  font-weight: normal;
}
.cards1{
  display: contents;
}
.card{
  display: inline-flex;
  width: 13rem;
  height: 21rem;
  margin: 2rem;
  text-align: center;
  transition: 0.4s;
}
.card:hover{
  border: #0056b3 solid 1px;
  border-bottom: #0056b3 solid 5px;
}
.card img{
  width: 11rem;
  height: 11rem;
  margin-top: 10%;
}
.card h2{
  font-size: 1.5rem;
}
.card h3{
  font-size: 1.5rem;
}
.table-value{
  font-style: italic;
}
.spinner-border{
  font-size: 0.5rem;
  margin-bottom: 0.1rem;
}
.container2{
  padding: 1rem;
  margin-left: 18rem;
}
</style>
