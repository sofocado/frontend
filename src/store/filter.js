import { defineStore } from "pinia";
export const useUserStore = defineStore("filterUser", {
  state: () => ({
    username: "",
  }),
});
