import { userService } from "../userService.js";
import { html } from "./../../node_modules/lit-html/lit-html.js";

const registerTemp = () => {
  return html`
    <!-- Register Page (Only for Guest users) -->
    <section id="register">
      <div class="form">
        <h2>Register</h2>
        <form class="register-form" @submit=${submitHandler}>
          <input
            type="text"
            name="email"
            id="register-email"
            placeholder="email"
          />
          <input
            type="password"
            name="password"
            id="register-password"
            placeholder="password"
          />
          <input
            type="password"
            name="re-password"
            id="repeat-password"
            placeholder="repeat password"
          />
          <button type="submit">register</button>
          <p class="message">Already registered? <a href="/login">Login</a></p>
        </form>
      </div>
    </section>
  `;
};
let context = null;
export function showRegisterView(ctx) {
  context = ctx;
  ctx.render(registerTemp());
}

async function submitHandler(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  // const email = formData.get("email");
  // const password = formData.get("password");
  // const rePassword = formData.get("re-password");
  const {
    email,
    password,
    "re-password": rePass,
  } = Object.fromEntries(formData);

  if (!email || !password || !rePass) {
    alert("All fields are required!");
    return;
  }
  if (password !== rePass) {
    alert("Password and Repeat Password needs to match!");
    return;
  }
  try {
    const response = await userService.register(email, password);
  } catch (error) {
    alert("Failed Registration");
  }
  context.updateNav();
  context.goTo("/");
}
