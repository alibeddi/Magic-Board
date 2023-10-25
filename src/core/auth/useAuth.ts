import authService from "./authService";

export default function useAuth() {
  const jwt = new authService();

  return {
    jwt,
  };
}




