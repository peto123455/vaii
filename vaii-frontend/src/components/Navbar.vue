<script setup lang="ts">
</script>

<template>
  <div class="wrapper">
    <nav>
      <ul>
        <li><RouterLink to="/">Domov</RouterLink></li>
        <li><RouterLink to="/about">O nás</RouterLink></li>
        <li><RouterLink to="/contact">Kontakt</RouterLink></li>
        <li><RouterLink to="/">Konto</RouterLink></li>
      </ul>
    </nav>
  </div>
</template>

<style scoped>
.wrapper {
  width: 100%;
  background-color: gray;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #333;
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
  padding: 14px 16px;
  text-decoration: none;
  font-weight: 600;
}

li a:hover {
  background-color: #111;
}

li:last-child {
  float: right;
  background-color: rgb(16, 131, 16);
}
</style>
