import { render, html } from "../../node_modules/lit-html/lit-html.js";
import { loginHandler } from "../service/auth.js";

const main = document.querySelector("main");

const loginTemp = () => {
  return html`
    <!-- Login Page (Only for Guest users) -->
    <section id="login">
      <div class="form">
        <h2>Login</h2>
        <form class="login-form" @submit=${loginHandler}>
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

export function loginView(ctx) {
  render(loginTemp(), main);
}
