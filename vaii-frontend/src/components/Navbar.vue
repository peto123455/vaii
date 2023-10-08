<script setup lang="ts">
</script>

<template>
  <nav class="navbar navbar-dark bg-dark">
    <ul>
      <li class="nav-item"><RouterLink to="/" class="title">Profi Autoškola</RouterLink></li>
      <li class="nav-item"><RouterLink to="/">Domov</RouterLink></li>
      <li class="nav-item"><RouterLink to="/pricing">Cenník</RouterLink></li>
      <li class="nav-item"><RouterLink to="/about">O nás</RouterLink></li>
      <li class="nav-item"><RouterLink to="/contact">Kontakt</RouterLink></li>
      <li class="nav-item"><RouterLink to="/">Konto</RouterLink></li>
    </ul>
  </nav>
</template>

<style scoped>
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  position: sticky;
  top: 0;
  width: 100%;
}

li {
  float: left;
}

li a {
  display: block;
  color: white;
  text-align: center;
  padding: 4px 16px;
  text-decoration: none;
  font-weight: 600;
}

li:not(:first-child):hover {
  background-color: #111;
  border-radius: 5px;
}

/*li:first-child {
  margin-left: 12px;
}*/

li:last-child {
  float: right;
  background-color: green;
  border-radius: 5px;
  margin-right: 12px;
}

li:last-child:hover {
  background-color: rgb(0, 78, 0);
}

.title {
  color: #b6631f;
}

</style>
