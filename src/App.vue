<script setup>
import { RouterLink, RouterView } from "vue-router";
import Title from "@/components/Home-Title.vue";
</script>

<template>
  <header>
    <img
      alt="Vue logo"
      class="logo"
      src="@/assets/bag.png"
      width="125"
      height="125"
    />

    <div class="wrapper">
      <Title msg="Happy Shopping" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/budget">Budget</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style></style>
