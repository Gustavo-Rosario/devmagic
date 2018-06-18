<template>
  <main-layout>
    <!-- Body --> 
    <h3 class="page-title">Encontre um usuário do github</h3>
    <!-- Input pesquisa -->
    <form v-on:submit="getUser">
      <div class="input-field">
        <input id="username" type="search" required>
        <label class="label-icon" for="search"><i class="material-icons search">search</i></label>
        <i class="material-icons">close</i>
      </div>
    </form>
    
    <!--<input id="username" type="search">-->
    <!--<button class="btn" v-on:click="getUser">-->
    <!--  <i class="material-icons">search</i>-->
    <!--</button>-->
    
    <div id="users">
      <!-- preloader -->
      <div class="progress">
        <div class="indeterminate"></div>
      </div>
      
      <!-- Lista de usuarios retornados -->
      <ul class="collection" v-if="items.length > 0">
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
      $('.progress').hide()
    },
    data(){
      return {
        items: []
      }
    },
    methods:{
      getUser(event){
        event.preventDefault()
        let self = this
        let name = $('#username').val()
        $('.progress').show()
        this.$http.get(`https://api.github.com/search/users?q=${name}`).then((data)=>{
          self.items = data.body.items
          $('.progress').hide()
        })
      },
      goPage(path,arg){
        page(path+arg)
      }
    },
    beforeMount(){
      $(document).ready(function(){
        $('.progress').hide()
        $('#username').keyup(function(){
          if($(this).val() != 0){
            $('.search').fadeOut()
          }else{
            $('.search').fadeIn()
          }
        })
      })
    }
  }
  
</script>