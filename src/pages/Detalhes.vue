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
        <h5>{{total_repos}} repos ordenados por:</h5>
        <div class="row">
          <div class="sortBtns">
            <!-- Por não estarem definidas as formas de organização, NOME, CRIACAO e ESTRELA foram adotados  -->
            <!-- IMPORTANTE: para organizar por estrela, somente por uma nova requisição -->
            <button v-on:click="sortBy('stars')" class="sortBtn sortActive btn col s4 m4 l4 amber darken-2">
              Estrelas ↓
            </button>
            <button v-on:click="sortBy('updated')" class="sortBtn btn col s4 m4 l4 blue-grey darken-1">
              Atualização
            </button>
            <button v-on:click="sortBy('forks')" class="sortBtn btn col s4 m4 l4 blue darken-4">
              Forks
            </button>
          </div>
        </div>
        
        <div class="progress">
          <div class="indeterminate"></div>
        </div>
        
        <!-- Paginação -->
        <ul class="pagination">
          <li :class="{disabled: (actual_page == 1) ,'waves-effect':true}" v-on:click="changePage(links.first)">
            <a class="first">
              <i class="material-icons">first_page</i>
            </a>
          </li>
          <li :class="{disabled: (actual_page == 1) ,'waves-effect':true}" v-on:click="changePage(links.prev)">
            <a class="prev">
              <i class="material-icons">chevron_left</i>
            </a>
          </li>
          <li class="active" >
            <a class="actual">
              {{actual_page}}
            </a>
          </li>
          <li :class="{disabled: (actual_page == links.last) ,'waves-effect':true}" v-on:click="changePage(links.next)">
            <a class="next">
              <i class="material-icons">chevron_right</i>
            </a>
          </li>
          <li :class="{disabled: (actual_page == links.last) ,'waves-effect':true}" v-on:click="changePage(links.last)">
            <a class="last">
              <i class="material-icons">last_page</i>
            </a>
          </li>
        </ul>
        
        <ul class="collection">
          <li class="collection-item avatar" v-for="repo in repos" :key="repo.id">
             <i class="material-icons circle">folder</i>
            <span class="title truncate">{{repo.name}}</span>
            <p>{{repo.description || 'Sem descrição'}} <br>
               <span class="amber-text"><i class="material-icons">grade</i>{{repo.stargazers_count}}</span>
            </p>
            <p>
              {{repo.created_at | formatDate}}
            </p>
            <v-link :href="/repositorio/+(repo.owner.login+'/'+repo.name)" class="secondary-content">
              <i class="material-icons">visibility</i>
            </v-link>
          </li>
        </ul>
        
        <!-- Paginação -->
        <ul class="pagination">
          <li :class="{disabled: (actual_page == 1) ,'waves-effect':true}" v-on:click="changePage(links.first)">
            <a class="first">
              <i class="material-icons">first_page</i>
            </a>
          </li>
          <li :class="{disabled: (actual_page == 1) ,'waves-effect':true}" v-on:click="changePage(links.prev)">
            <a class="prev">
              <i class="material-icons">chevron_left</i>
            </a>
          </li>
          <li class="active" >
            <a class="actual">
              {{actual_page}}
            </a>
          </li>
          <li :class="{disabled: (actual_page == links.last) ,'waves-effect':true}" v-on:click="changePage(links.next)">
            <a class="next">
              <i class="material-icons">chevron_right</i>
            </a>
          </li>
          <li :class="{disabled: (actual_page == links.last) ,'waves-effect':true}" v-on:click="changePage(links.last)">
            <a class="last">
              <i class="material-icons">last_page</i>
            </a>
          </li>
        </ul>
        
      </div>
      
    </div>
    
  </main-layout>
</template>

<script>
  import $ from 'jquery'
  import Vue from 'vue'
  // COMPONENTS
  import MainLayout from '../layouts/Main.vue'
  import VLink from '../components/VLink.vue'
  
  export default {
    data(){
      return {
        user: {},
        repos: {},
        links: {
          first: 1,
          prev: 1,
          next: 1,
          last: 1
        },
        actual_page: 0,
        total_repos: 0,
        prop: 'stars'
      }
    },
    components: {
      MainLayout,
      VLink,
    },
    methods:{
      sortBy(prop){
        
        $('.progress').fadeIn()
        this.prop = prop
        let self = this
        let type = $(event.target).data('type') || 'desc'
        let url = `https://api.github.com/search/repositories?q=user:${this.user.login}&sort=${prop}&order=${type}&per_page=30&page=${this.actual_page}`
        this.$http.get(url).then((data)=>{
          // Links para proximas páginas
          if(data.headers.map.link){
            let aux = data.headers.map.link[0].split(',')
            $.each(aux, (i,link)=>{
              if(link.search('rel="first"') != -1){
                self.links.first = link.split(';')[0].split('>')[0].split('<')[1].slice(-1)
              }else if(link.search('rel="prev"') != -1){
                self.links.prev = link.split(';')[0].split('>')[0].split('<')[1].slice(-1)
              }else if(link.search('rel="next"') != -1){
                self.links.next = link.split(';')[0].split('>')[0].split('<')[1].slice(-1)
              }else if(link.search('rel="last"') != -1){
                self.links.last = link.split(';')[0].split('>')[0].split('<')[1].slice(-1)
              }
            })
          }
          self.total_repos = data.body.total_count
          let repos = data.body.items
          self.repos = repos
          // Remove Loading
          $('.progress').fadeOut()
        }).catch(function(err){
          alert('Limite da GITHUB API atingido')
          console.log(err)
          // Remove Loading
          $('.progress').fadeOut()
        })
        if($(event.target).hasClass('sortBtn')){
          $('.sortActive').text((a,b)=> `${b.replace(/[↑↓]/g,'')}`).removeClass('sortActive').data('type','')
          if(type == 'asc'){
            $(event.target).text((a,b)=> `${b.replace(/[↑↓]/g,'')} ↓`).data('type','desc')
          }else{
            $(event.target).text((a,b)=> `${b.replace(/[↑↓]/g,'')} ↑`).data('type','asc')
          }
          $(event.target).addClass('sortActive')
        }
        console.log(self.links.last)
      },
      changePage(page){
        this.actual_page = page
        let prop = this.prop
        this.sortBy(prop)
      },
    },
    created() {
      // TEMP
      let self = this
      this.params = JSON.parse(localStorage.getItem('params'))
      this.$http.get(`https://api.github.com/users/${this.params.username}`).then((data)=>{
        // Pega repositórios com order desejada 
        // ORGANIZAÇÂO POR ESTRELA SOMENTE NA ROTA DE PESQUISA
        self.user = data.body
        self.actual_page = 1
        let url = `https://api.github.com/search/repositories?q=user:${data.body.login}&sort=stars&order=desc&per_page=30&page=1`
        this.$http.get(url).then((data)=>{
          // Links para proximas páginas
          if(data.headers.map.link){
          let aux = data.headers.map.link[0].split(',')
            $.each(aux, (i,link)=>{
              if(link.search('rel="first"') != -1){
                self.links.first = link.split(';')[0].split('>')[0].split('<')[1].slice(-1)
              }else if(link.search('rel="prev"') != -1){
                self.links.prev = link.split(';')[0].split('>')[0].split('<')[1].slice(-1)
              }else if(link.search('rel="next"') != -1){
                self.links.next = link.split(';')[0].split('>')[0].split('<')[1].slice(-1)
              }else if(link.search('rel="last"') != -1){
                self.links.last = link.split(';')[0].split('>')[0].split('<')[1].slice(-1)
              }
            })
          }
          self.total_repos = data.body.total_count
          self.repos = data.body.items
          // Remove Loading
          $('.progress').fadeOut()
        }).catch(function(err){
          alert('Limite da GITHUB API atingido')
          console.log(err)
          // Remove Loading
          $('.progress').fadeOut()
        })
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