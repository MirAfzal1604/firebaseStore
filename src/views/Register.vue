<template>
  <div>
    <h1>Create an Accound</h1>
    <p><input type="email" placeholder="email" v-model="email" /></p>
    <p><input type="password" placeholder="password" v-model="password" /></p>
    <p><button @click="register">Submit</button></p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");

const router = useRouter();

const register = () => {
  createUserWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((data) => {
      console.log("Success" + data);
      alert(`successful`);
      router.push("/register/grocery");
    })
    .catch((err) => {
      console.log(err.code);
    });
};
</script>

<style lang="scss" scoped>
</style>