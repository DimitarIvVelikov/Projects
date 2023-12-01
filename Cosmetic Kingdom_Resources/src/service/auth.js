import {
  buyProductStatusUrl,
  loginUrl,
  logoutUrl,
  registerUrl,
} from "../constants/index.js";
import page from "./../../node_modules/page/page.mjs";

export async function loginHandler(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const { email, password } = Object.fromEntries(formData);
  if (!email || !password) {
    alert("All fields are required!");
    return;
  }
  try {
    const response = await login({ email, password });
    if (response.status !== 200) {
      e.target.reset();
      alert("Invalid Credentials");
      return;
    }
    const data = await response.json();
    setAuthData(data);
    // Change to Products
    page.redirect("/products");
  } catch (err) {
    alert(err.message);
  }
}

export async function registerHandler(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const email = formData.get("email");
  const password = formData.get("password");
  const rePassword = formData.get("re-password");
  if (!email || !password || !rePassword) {
    alert("All fields are required!");
    return;
  }
  if (password !== rePassword) {
    alert("Password and Repeat Password fields must match");
    return;
  }

  try {
    const response = await register({ email, password });
    if (response.status !== 200) {
      e.target.reset();
      alert("User already exists");
      return;
    }
    const data = await response.json();
    setAuthData(data);
    // Change to Products
    page.redirect("/products");
  } catch (err) {
    alert(err.message);
  }
}

export async function logout() {
  try {
    const response = await fetch(logoutUrl, {
      method: "GET",
      headers: {
        "X-Authorization": getAuthData().accessToken,
      },
    });
    console.log(response);
    if (response.status !== 204) {
      alert("Logout not successful");
      return;
    }
    removeAuthData();
    page.redirect("/");
  } catch (err) {
    alert(err);
  }
}

async function login(data) {
  return await fetch(loginUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

async function register(data) {
  return await fetch(registerUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export function setAuthData(authData) {
  localStorage.setItem("auth", JSON.stringify(authData));
}
export function getAuthData() {
  return JSON.parse(localStorage.getItem("auth"));
}

function removeAuthData() {
  localStorage.removeItem("auth");
}

export async function getProductBoughtStatus(ctx) {
  const response = await fetch(
    buyProductStatusUrl(ctx.params.id, getAuthData()._id)
  );
  const data = await response.json();
  return data;
}
