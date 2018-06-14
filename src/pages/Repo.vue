<template>
  <main-layout>
    <h3 class="page-title">Repositório</h3>
    <div v-if="repo.owner" class="row">
      <h2 class="title">{{repo.name}}</h2>
      <h3 class="sub-title">Proprietário: {{repo.owner.login}}</h3>
      <p>
        {{repo.description || 'Descrição indisponível'}}
      </p>
      <div class="starcount amber darken-1 white-text">
        <i class="material-icons left">star</i>
        <span> {{repo.stargazers_count}}</span>
      </div>
    </div>
    
    <!-- LOADER -->
    <div class="progress">
      <div class="indeterminate"></div>
    </div>
    
  </main-layout>
</template>

<script>
  import $ from 'jquery'
  import MainLayout from '../layouts/Main.vue'
  
  export default {
    data(){
      return {
        repo: {}
      }
    },
    components: {
      MainLayout
    },
    created() {
      // TEMP
      let self = this
      this.params = JSON.parse(localStorage.getItem('params'))
      this.$http.get(`https://api.github.com/repos/${this.params.user}/${this.params.repo}`).then((data)=>{
        $('.progress').fadeOut()
        self.repo = data.body
        console.log(data.body)
      })
    },
    
    
  }
</script>

<style scoped>
  .starcount{
    padding: 1rem .5rem;
    border-radius: 5px;
    line-height: 1.5;
    width: auto;
    display:inline-block;
  }
  .starcount i{
    margin-top: -0.1rem;
  }
  .starcount span{
    display: inline-block;
    border-left: 3px solid white;
    padding: 0 5px 0 15px;
    font: 1.5rem bold Verdana, sans-serif;
  }
</style>