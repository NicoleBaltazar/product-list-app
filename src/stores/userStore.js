import { defineStore } from "pinia";
import { ref } from "vue";
import { API_BASE } from "../config";

export const useUserStore = defineStore("userStore", () => {
  const user = ref(null);

  const login = async (email, password) => {
    const res = await fetch(`${API_BASE}/users`);
    const users = await res.json();
    const found = users.find(
      (u) => u.email === email && u.password === password
    );
    if (!found) throw new Error("Invalid credentials");
    user.value = found;
  };

  const logout = () => {
    user.value = null;
  };

  return { user, login, logout };
});
