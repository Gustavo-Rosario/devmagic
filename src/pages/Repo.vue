<template>
  <main-layout>
    <h3 class="page-title">Informações do usuário</h3>
    <div class="row">
      <!-- USUARIO -->
      <div class="col s12 m6 l5">
        
        <div class="card">
          <div class="card-image">
            <img :src="user.avatar_url">
            <span class="card-title">{{user.name || 'Nome não definido'}}</span>
          </div>
          <div class="card-content">
            <p>
              {{user.bio || 'Bio indisponível'}}
            </p>
          </div>
          <div class="card-action">
            {{user.email || 'Email indisponível'}}
          </div>
          <div class="card-action">
            Seguidores: {{user.followers}}
          </div>
          <div class="card-action">
            Seguindo: {{user.following}}
          </div>
        </div>
        
      </div>  
      <!-- REPOSITORIOS -->
      <div class="col s12 m6 l7">
        <ul class="collection">
          <li class="collection-item avatar" v-for="repo in repos">
             <i class="material-icons circle">folder</i>
            <span class="title">{{repo.name}}</span>
            <p>{{repo.description || 'Sem descrição'}} <br>
               <span class="amber-text"><i class="material-icons">grade</i>{{repo.stargazers_count}}</span>
            </p>
            <a  class="secondary-content">
              <i class="material-icons">visibility</i>
            </a>
          </li>
        </ul>
      </div>
      
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
        user: {},
        repos: {}
      }
    },
    components: {
      MainLayout
    },
    goPage(path,arg){
      page(path+arg)
    },
    created() {
      // TEMP
      let self = this
      this.params = JSON.parse(localStorage.getItem('params'))
      this.$http.get(`https://api.github.com/users/${this.params.username}`).then((data)=>{
        this.$http.get(data.body.repos_url).then((data)=>{
          let repos = data.body; 
          repos.sort((a,b)=>(a.stargazers_count > b.stargazers_count) ? -1 : 1 )
          self.repos = repos
          console.log(repos)
        })
        
        $('.progress').fadeOut()
        self.user = data.body
        console.log(data.body)
      })
    },
    
    
  }
</script>