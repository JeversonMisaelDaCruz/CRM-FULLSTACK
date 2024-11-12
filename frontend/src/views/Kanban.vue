<template>
  <v-container>
    <v-btn color="primary" @click="openCreateBoardModal"
      >Cadastrar Quadro</v-btn
    >

    <v-dialog v-model="isCreateBoardModalOpen" max-width="400">
      <v-card>
        <v-card-title>Cadastrar Quadro</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="newBoardName"
            label="Nome do Quadro"
            outlined
            required
          />
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="createBoard">Salvar</v-btn>
          <v-btn text @click="closeCreateBoardModal">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-row>
      <v-col v-for="board in boards" :key="board.id" cols="12" md="3">
        <v-card
          @click="selectBoard(board)"
          :class="{
            'selected-board': selectedBoard && selectedBoard.id === board.id,
          }"
        >
          <v-card-title>{{ board.name }}</v-card-title>
        </v-card>
      </v-col>
    </v-row>

    <v-divider></v-divider>
    <v-card v-if="selectedBoard">
      <v-card-title>{{ selectedBoard.name }}</v-card-title>
      <v-card-text>
        <v-btn color="secondary" @click="deselectBoard">Voltar</v-btn>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from "vue";

const isCreateBoardModalOpen = ref(false);
const newBoardName = ref("");
const boards = ref([]);
const selectedBoard = ref(null);

const openCreateBoardModal = () => {
  isCreateBoardModalOpen.value = true;
};

const closeCreateBoardModal = () => {
  isCreateBoardModalOpen.value = false;
  newBoardName.value = "";
};

const createBoard = () => {
  if (newBoardName.value.trim()) {
    const newBoard = { id: Date.now(), name: newBoardName.value };
    boards.value.push(newBoard);
    closeCreateBoardModal();
  }
};

const selectBoard = (board) => {
  selectedBoard.value = board;
};

const deselectBoard = () => {
  selectedBoard.value = null;
};
</script>

<style scoped>
.selected-board {
  background-color: #f0f0f0;
}
</style>
