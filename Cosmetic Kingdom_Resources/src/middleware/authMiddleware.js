import * as authService from "../service/auth.js";

export function authMiddleware(ctx, next) {
  ctx.authData = authService.getAuthData();
  next();
}
