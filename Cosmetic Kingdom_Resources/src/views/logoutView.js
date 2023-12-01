import * as authService from "../service/auth.js";

export async function logoutView(ctx) {
  await authService.logout();
}
