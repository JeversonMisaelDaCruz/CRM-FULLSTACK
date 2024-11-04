<template>
  <v-app>
    <v-container fluid class="pa-0">
      <div class="background-container">
        <img
          src="https://media.istockphoto.com/id/842628662/pt/foto/family-with-dog-on-the-trip.jpg?s=612x612&w=0&k=20&c=Iy2pkj5opEkE-af0gjIt9eJwbCu8Tj9SC7kQZ1vNT_8="
          alt="" class="background-image" />
        <div class="gradient-overlay"></div>
        <v-card class="mx-auto pa-8" elevation="8" max-width="448" width="100%" rounded="lg">
          <v-card-title class="d-flex flex-column justify-center align-center font-weight-bold"
            style="font-size: 30px; border-bottom: 0.5px solid black; margin-bottom: 20px;">
            Login
          </v-card-title>

          <v-text-field v-model="inputEmail" placeholder="E-mail" prepend-inner-icon="mdi-email" @keyup.enter="login" />

          <v-text-field v-model="inputPassword" prepend-inner-icon="mdi-lock-outline" placeholder="Senha"
            :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'" :type="visible ? 'text' : 'password'"
            @click:append-inner="toggleVisibility" @keyup.enter="login" />

          <v-card-actions class="d-flex justify-center align-center">
            <v-btn @click="login" color="white"
              style="background-color: green; width: 100%; height: 50px; font-size: 16px; font-weight: bold;">
              Entrar
            </v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </v-container>
  </v-app>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../store/auth/User";

export default {
  name: "Login",
  setup() {

    const router = useRouter();
    const authStore = useAuthStore();
    const visible = ref(false);
    const inputEmail = ref("");
    const inputPassword = ref("");

    const toggleVisibility = () => {
      visible.value = !visible.value;
    };
    async function login() {
      try {
        const response = await authStore.login(inputEmail.value, inputPassword.value);
        if (response) {

          router.push("/leads");
        }
      } catch (error) {
        throw error;
      }
    }




    return {
      visible,
      inputEmail,
      inputPassword,
      login,
      toggleVisibility,
    };
  },
};
</script>

<style scoped>
.background-container {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.background-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.gradient-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, #fbbf24, #fb923c);
  opacity: 0.6;
}
</style>
