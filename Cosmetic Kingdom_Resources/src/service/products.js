import {
  createProductUrl,
  editProductUrl,
  getBuyCount,
  productsUrl,
  requestToAddBuy,
} from "../constants/index.js";
import * as authService from "./auth.js";
import page from "./../../node_modules/page/page.mjs";

export async function getProducts(ctx, next) {
  try {
    const response = await fetch(productsUrl);
    const data = await response.json();
    ctx.products = data;
  } catch (err) {
    alert(err);
  }
  next();
}

export async function createHandler(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const { name, imageUrl, category, description, price } =
    Object.fromEntries(formData);
  if (!name || !imageUrl || !category || !description || !price) {
    alert("All fields are required!");
    return;
  }
  try {
    const response = await createProduct({
      name,
      imageUrl,
      category,
      description,
      price,
    });
    if (response.status !== 200) {
      e.target.reset();
      alert("Creation Failed");
      return;
    }
    page.redirect("/products");
  } catch (err) {
    alert(err.message);
  }
}

async function createProduct(body) {
  return fetch(createProductUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-authorization": authService.getAuthData().accessToken,
    },
    body: JSON.stringify(body),
  });
}

export async function getProductDetails(ctx, next) {
  try {
    const response = await fetch(`${createProductUrl}/${ctx.params.id}`);
    const data = await response.json();
    ctx.productDetails = data;
  } catch (err) {
    alert(err);
  }
  next();
}

export async function editHandler(e, id) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const { name, imageUrl, category, description, price } =
    Object.fromEntries(formData);
  if (!name || !imageUrl || !category || !description || !price) {
    alert("All fields are required!");
    return;
  }
  try {
    const response = await editProduct(
      {
        name,
        imageUrl,
        category,
        description,
        price,
      },
      id
    );
    if (response.status !== 200) {
      e.target.reset();
      alert("Edit Failed");
      return;
    }
    page.redirect("/products");
  } catch (err) {
    alert(err.message);
  }
}

async function editProduct(body, id) {
  return fetch(editProductUrl(id), {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-authorization": authService.getAuthData().accessToken,
    },
    body: JSON.stringify(body),
  });
}
export async function getEditProductDetails(ctx, next) {
  try {
    const response = await fetch(editProductUrl(ctx.params.id));
    const data = await response.json();
    ctx.productEditDetails = data;
  } catch (err) {
    alert(err);
  }
  next();
}

export async function deleteProduct(id) {
  return await fetch(editProductUrl(id), {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "x-authorization": authService.getAuthData().accessToken,
    },
  });
}

export async function buyProduct(e, id) {
  const response = await fetch(requestToAddBuy, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-authorization": authService.getAuthData().accessToken,
    },
    body: JSON.stringify({ productId: id }),
  });
  page.redirect(`/products/${id}`);
}

export async function productBuyCount(productId) {
  const response = await fetch(getBuyCount(productId));
  const data = response.json();
  return data;
}
