<template>
  <div class="container">
    <!-- Estilos -->
    <!--Import Google Icon Font-->
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link rel="stylesheet" href="node_modules/materialize-css/dist/css/materialize.css" >
    <ul>
      <li>
        <v-link href="/">Home</v-link>
        <v-link href="/detalhes">Detalhes</v-link>
      </li>
    </ul>

    <slot></slot>
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
  .container {
    max-width: 600px;
    margin: 0 auto;
    padding: 15px 30px;
    background: #f9f7f5;
  }
</style>