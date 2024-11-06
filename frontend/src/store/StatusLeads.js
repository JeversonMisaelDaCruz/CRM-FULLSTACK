import { defineStore } from "pinia";
import { ref } from "vue";
import API from "@/services/module/API";

export const useLeadStatusesStore = defineStore("leadStatuses", () => {
  const statuses = ref([]);

  const fetchStatuses = async () => {
    try {
      const response = await API.leadStatus.getLeadsStatus();
      console.log("Resposta completa da API no fetchStatuses:", response);

      if (response && Array.isArray(response)) {
        statuses.value = response;
        console.log("Dados atribuídos a statuses na store:", statuses.value);
      } else {
        console.warn("A resposta da API não é um array esperado:", response);
        statuses.value = [];
      }
    } catch (error) {
      console.error("Erro ao buscar statuses:", error);
    }
  };

  return { statuses, fetchStatuses };
});
