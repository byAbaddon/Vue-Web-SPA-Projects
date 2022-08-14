<template>
  <v-app>
    <header-component />
    <v-main id="main">
      <router-view />
    </v-main>
    <footer-component />
  </v-app>
</template>


<script setup >
import HeaderComponent from "@/components/HeaderComponent";
import FooterComponent from "@/components/FooterComponent";
import { defineComponent, onBeforeMount, onMounted } from "vue";
import { useRouter} from 'vue-router'  
const router = useRouter()

defineComponent(() => {
  HeaderComponent, FooterComponent;
});


onMounted(() => {
  if (localStorage.getItem('auth') == null) {
    router.push("/").catch(() => { })
  }

})

onBeforeMount(() => {
  window.addEventListener("beforeunload", (event) => {
    if (localStorage.getItem("auth") != null) {
      event.preventDefault();
      return;
    }
    return;
  });
});
</script>


