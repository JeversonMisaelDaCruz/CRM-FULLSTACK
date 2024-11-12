import { defineStore } from "pinia";

export const useKanbanStore = defineStore("kanban", {
  state: () => ({
    boards: [],
  }),
  actions: {
    addBoard(board) {
      this.boards.push(board);
    },
  },
});
