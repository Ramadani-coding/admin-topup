import type { AuthProvider } from "react-admin";

const apiUrl = import.meta.env.VITE_API_URL;

export const authProvider: AuthProvider = {
  login: async ({ username, password }) => {
    // Gabungkan dengan path /login
    const response = await fetch(`${apiUrl}/auth/login`, {
      method: "POST",
      body: JSON.stringify({ email: username, password }),
      headers: new Headers({ "Content-Type": "application/json" }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Login gagal");
    }

    const auth = await response.json();
    localStorage.setItem("auth_token", auth.token);
    localStorage.setItem("admin_name", auth.user.name);
    return Promise.resolve();
  },
  logout: () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("admin_name");
    return Promise.resolve();
  },
  checkError: (error) => {
    const status = error.status;
    if (status === 401 || status === 403) {
      localStorage.removeItem("auth_token");
      return Promise.reject();
    }
    return Promise.resolve();
  },
  checkAuth: () =>
    localStorage.getItem("auth_token") ? Promise.resolve() : Promise.reject(),
  getPermissions: () => Promise.resolve(),
  getIdentity: () => {
    const name = localStorage.getItem("admin_name");
    return Promise.resolve({ id: "admin", fullName: name || "Admin" });
  },
};
