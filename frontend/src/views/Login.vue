<template>
  <v-app>
    <v-container fluid class="pa-0">
      <div class="background-container">
        <img
          src="https://img.freepik.com/fotos-gratis/familia-com-sua-filha-pequena-em-um-campo-de-outono_1303-17368.jpg?t=st=1730231585~exp=1730235185~hmac=fd3cdd7f565782ec63ecfbb2f7e69733098531e56f1b2ebe7be19f41f31ce2af&w=2000"
          alt="" class="background-image" />
        <div class="gradient-overlay"></div>
        <v-card class="mx-auto pa-8" elevation="8" max-width="448" width="100%" rounded="lg">
          <v-card-title class="d-flex flex-column justify-center align-center font-weight-bold" style="
              font-size: 30px;
              border-bottom: 0.5px solid black;
              margin-bottom: 20px;
            ">
            Login
          </v-card-title>

          <v-text-field v-model="inputEmail" placeholder="E-mail" prepend-inner-icon="mdi-email" />

          <v-text-field v-model="inputPassword" prepend-inner-icon="mdi-lock-outline" placeholder="Senha"
            :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'" :type="visible ? 'text' : 'password'"
            @click:append-inner="visible = !visible" />

          <v-card-actions class="d-flex justify-center align-center">
            <v-btn @click="login" color="white" style="
                background-color: green;
                width: 100%;
                height: 50px;
                font-size: 16px;
                font-weight: bold;
              ">
              Entrar
            </v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: "Login",
  data: () => ({
    visible: false,
    inputEmail: "",
    inputPassword: "",
  }),
  methods: {
    async login() {
      try {
        const response = await this.$store.dispatch("auth/login", {
          email: this.inputEmail,
          password: this.inputPassword,
        });
        if (response) {
          console.log("Usuário logado com sucesso", response);
          // Armazene o token no localStorage
          localStorage.setItem("token", response.token);

          // Navegue para a rota /leads
          this.$router.push("/leads");
        }
      } catch (error) {
        console.error("Falha no login", error);
        // Exiba uma mensagem de erro ao usuário, se desejar
      }
    },
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
