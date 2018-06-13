<template>
  <main-layout>
    <!-- Body --> 
    <h3 class="page-title">Encontre um usuário do github</h3>
    <!-- Input pesquisa -->
    <input id="username" type="search">
    <button class="btn" v-on:click="getUser">
      <i class="material-icons">search</i>
    </button>
    
    <div id="users">
      <!-- preloader -->
      <div class="preloader-wrapper small active">
        <div class="spinner-layer spinner-green-only">
          <div class="circle-clipper left">
            <div class="circle"></div>
          </div>
          <div class="gap-patch">
            <div class="circle"></div>
          </div>
          <div class="circle-clipper right">
            <div class="circle"></div>
          </div>
        </div>
      </div>
      
      <!-- Lista de usuarios retornados -->
      <ul class="collection">
        <li class="collection-item" v-for="item in items">
          {{item.login}}
          <a class="secondary-content pointer" v-on:click="goPage('/detalhes/',item.login)">
            <i class="material-icons">visibility</i>
          </a>
        </li>
      </ul>
      
    </div>
  </main-layout>
</template>

<script>
  import Vue from 'vue'
  import VueResource from 'vue-resource'
  Vue.use(VueResource)
  import $ from 'jquery'
  import page from 'page'
  import MainLayout from '../layouts/Main.vue'
  
  export default {
    components: {
      MainLayout
    },
    created(){
      $('.preloader-wrapper').hide()
    },
    data(){
      return {
        items: []
      }
    },
    methods:{
      getUser(event){
        let self = this
        let name = $('#username').val()
        $('.preloader-wrapper').show()
        this.$http.get(`https://api.github.com/search/users?q=${name}`).then((data)=>{
          self.items = data.body.items
          $('.preloader-wrapper').hide()
        })
      },
      goPage(path,arg){
        page(path+arg)
      }
    },
    beforeMount(){
      $(document).ready(function(){
        $('.preloader-wrapper').hide()
      })
    }
  }
  
</script>