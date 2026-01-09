<template>
  <v-container fluid class="pa-0">
    <div class="background-container">
      <img
        src="https://media.istockphoto.com/id/842628662/pt/foto/family-with-dog-on-the-trip.jpg?s=612x612&w=0&k=20&c=Iy2pkj5opEkE-af0gjIt9eJwbCu8Tj9SC7kQZ1vNT_8="
        alt=""
        class="background-image"
      />
      <div class="gradient-overlay"></div>
      <v-card
        class="mx-auto pa-8"
        elevation="8"
        max-width="448"
        width="100%"
        rounded="lg"
      >
        <v-card-title
          class="d-flex flex-column justify-center align-center font-weight-bold"
          style="
            font-size: 30px;
            border-bottom: 0.5px solid black;
            margin-bottom: 20px;
          "
        >
          Login
        </v-card-title>

        <v-text-field
          v-model="inputEmail"
          placeholder="E-mail"
          prepend-inner-icon="mdi-email"
          @keyup.enter="login"
        />

        <v-text-field
          v-model="inputPassword"
          prepend-inner-icon="mdi-lock-outline"
          placeholder="Senha"
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          @click:append-inner="toggleVisibility"
          @keyup.enter="login"
        />

        <v-card-actions class="d-flex justify-center align-center">
          <v-btn
            @click="login"
            style="width: 100%; height: 50px; font-size: 16px;"
          >
            Entrar
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </v-container>
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
        const response = await authStore.login(
          inputEmail.value,
          inputPassword.value
        );
        if (response) {
          router.push("/kanban");
        }
      } catch (error) {
        alert("Credenciais inválidas. Tente novamente.");
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
  background: linear-gradient(135deg, #6366F1 0%, #818CF8 50%, #F59E0B 100%);
}

.background-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.15;
}

.gradient-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg,
    rgba(99, 102, 241, 0.8) 0%,
    rgba(129, 140, 248, 0.7) 50%,
    rgba(245, 158, 11, 0.8) 100%
  );
  opacity: 0.9;
}

.v-card {
  backdrop-filter: blur(20px);
  background: rgba(255, 255, 255, 0.95) !important;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

.v-btn {
  background: linear-gradient(135deg, #6366F1 0%, #4F46E5 100%) !important;
  color: white !important;
  text-transform: none;
  font-weight: 600;
  letter-spacing: 0.02em;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
  transition: all 250ms ease;
}

.v-btn:hover {
  box-shadow: 0 6px 16px rgba(99, 102, 241, 0.5);
  transform: translateY(-2px);
}
</style>
