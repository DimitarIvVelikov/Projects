import { userService } from "../userService.js";
import { html } from "./../../node_modules/lit-html/lit-html.js";

const loginTemp = () => {
  return html`
    <!-- Login Page (Only for Guest users) -->
    <section id="login">
      <div class="form">
        <h2>Login</h2>
        <form class="login-form" @submit=${submitHandler}>
          <input type="text" name="email" id="email" placeholder="email" />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="password"
          />
          <button type="submit">login</button>
          <p class="message">
            Not registered? <a href="/register">Create an account</a>
          </p>
        </form>
      </div>
    </section>
  `;
};
let context = null;
export function showLoginView(ctx) {
  context = ctx;
  ctx.render(loginTemp());
}

async function submitHandler(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const { email, password } = Object.fromEntries(formData);

  if (!email || !password) {
    alert("All fields are required!");
    return;
  }
  try {
    const response = await userService.login(email, password);
  } catch (error) {
    alert("Failed Login");
  }
  context.updateNav();
  context.goTo("/");
}
