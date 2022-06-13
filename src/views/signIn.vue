<template>
  <div>
    <h1>Sign-in an Accound</h1>
    <p><input type="email" placeholder="email" v-model="email" /></p>
    <p><input type="password" placeholder="password" v-model="password" /></p>
    <p v-if="errMsg">{{ errMsg }}</p>
    <p><button @clck="register">Submit</button></p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const errMsg = ref();

const router = useRouter();

const register = () => {
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((data) => {
      console.log("Success" + data);
      router.push("/grocery");
    })
    .catch((error) => {
      console.log(error.code);
      switch (error.code) {
        case "auth/invalid-email":
          errMsg.value = "Xato Email!!";
          break;
        case "auth/user-not-found":
          errMsg.value = "Bunaqa email li odam topilmadi!!";
          break;
        case "auth/wrong-password":
          errMsg.value = "parol xato!!";
          break;
        default:
          errMsg.value = "email yoki parol xato!!";
          break;
      }
    });
};
</script>

<style lang="scss" scoped>
</style>