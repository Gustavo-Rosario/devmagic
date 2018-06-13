<template>
  <main-layout>
    <h3 class="page-title">Informações do usuário</h3>
    <div class="row">
      <!-- USUARIO -->
      <div class="col s12 m6 l5">
        
        <div class="card">
          <div class="card-image">
            <img :src="user.avatar_url">
            <div class="gradient-layer zindexM"></div>
            <span class="card-title zindexH">{{user.name || 'Nome não definido'}}</span>
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
          <div class="card-action">
            <a target="_blank" :href="user.html_url" class="blue-text text-darken-3">
              GitHub <i class="material-icons">link</i></a>
          </div>
        </div>
        
      </div>  
      
      <!-- REPOSITORIOS -->
      <div class="col s12 m6 l7">
        <!-- ORDENAÇÂO-->
        <h5>Ordenar por:</h5>
        <div class="row">
          <div class="sortBtns">
            <!-- Por não estarem definidas as formas de organização, NOME, CRIACAO e ESTRELA foram adotados  -->
            <!-- IMPORTANTE: para não fazer uma nova requisição ajax, o sort é feito por um metodo proprio -->
            <button v-on:click="sortBy('stargazers_count')" class="sortActive btn col s4 m4 l4 amber darken-2">
              Estrelas ↓
            </button>
            <button v-on:click="sortBy('name')" class="btn col s4 m4 l4 blue-grey darken-1">
              Nome
            </button>
            <button v-on:click="sortBy('created_at')" class="btn col s4 m4 l4 blue darken-4">
              Criação
            </button>
          </div>
        </div>
        
        <ul class="collection">
          <li class="collection-item avatar" v-for="repo in repos">
             <i class="material-icons circle">folder</i>
            <span class="title">{{repo.name}}</span>
            <p>{{repo.description || 'Sem descrição'}} <br>
               <span class="amber-text"><i class="material-icons">grade</i>{{repo.stargazers_count}}</span>
            </p>
            <p>
              {{repo.created_at | formatDate}}
            </p>
            <v-link :href="/repositorio/+(user.name+'/'+repo.name)" class="secondary-content">
              <i class="material-icons">visibility</i>
            </v-link>
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
  import $ from 'jquery'
  // COMPONENTS
  import MainLayout from '../layouts/Main.vue'
  import VLink from '../components/VLink.vue'
  
  export default {
    data(){
      return {
        user: {},
        repos: {}
      }
    },
    components: {
      MainLayout,
      VLink,
    },
    methods:{
      sortBy(prop){
        let type = $(event.target).data('type') || 'asc'
        $('.sortActive').text((a,b)=> `${b.replace(/[↑↓]/g,'')}`).removeClass('sortActive').data('type','')
        if(type == 'asc'){
          this.repos.sort((a,b)=>( typeof a[prop] == "string" ? (a[prop].toLowerCase() > b[prop].toLowerCase() ? -1 : 1) : (a[prop] > b[prop] ? -1 : 1) ) )
          $(event.target).text((a,b)=> `${b.replace(/[↑↓]/g,'')} ↓`).data('type','desc')
        }else{
          this.repos.sort((a,b)=>(typeof a[prop] == "string" ? (a[prop].toLowerCase() > b[prop].toLowerCase() ? 1 : -1) : (a[prop] > b[prop] ? 1 : -1) ) )
          $(event.target).text((a,b)=> `${b.replace(/[↑↓]/g,'')} ↑`).data('type','asc')
        }
        $(event.target).addClass('sortActive')
      },
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
        })
        
        $('.progress').fadeOut()
        self.user = data.body
      })
    },
    beforeMount(){
    }
    
  }
</script>

<style scoped>
  .gradient-layer{
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, transparent , rgba(0,0,0,.5));;
  }
  
  zindexH{
    z-index: 9;
  }
  
  zindexM{
    z-index: 5;
  }
  
  .sortBtns{
    
  }
  
</style>