<template>
  <div class="container">
    <nav class="blue darken-3">
      <div class="nav-wrapper">
        <v-link href="/" class="brand-logo mainMenu">GMaster</v-link>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <li><v-link href="/">Home</v-link></li>
        </ul>
      </div>
    </nav>
    <main>
      <slot></slot>
    </main>
  </div>
</template>

<script>
  import VLink from '../components/VLink.vue'
  export default {
    components: {
      VLink
    }
  }
</script>

<style scoped>
  
  .mainMenu{
    color: white !important;
  }
  
  .container{
    background-color: rgb(255,255,255);
  }
  
</style>