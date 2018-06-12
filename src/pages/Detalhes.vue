<template>
  <main-layout>
    <h3 class="page-title">Informações do usuário</h3>
    <div>
      <span>{{user.name || 'Nome não definido'}}</span>
    </div>
    
    <div class="progress">
      <div class="indeterminate"></div>
    </div>
    
  </main-layout>
</template>

<script>
  import Vue from 'vue'
  import VueResource from 'vue-resource'
  import VueRouter from 'vue-router'
  Vue.use(VueRouter)
  Vue.use(VueResource)
  import $ from 'jquery'
  import MainLayout from '../layouts/Main.vue'
  
  export default {
    data(){
      return {
        user: {}
      }
    },
    components: {
      MainLayout
    },
    created() {
      // TEMP
      let self = this
      this.params = JSON.parse(localStorage.getItem('params'))
      this.$http.get(`https://api.github.com/users/${this.params.username}`).then((data)=>{
        $('.progress').fadeOut()
        self.user = data.body
      })
    },
    
    
  }
</script>