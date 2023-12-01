const baseUrl = "http://localhost:3030";
export const loginUrl = baseUrl + "/users/login";
export const registerUrl = baseUrl + "/users/register";
export const logoutUrl = baseUrl + "/users/logout";
export const productsUrl = baseUrl + "/data/products?sortBy=_createdOn%20desc";
export const createProductUrl = baseUrl + "/data/products";
export const buyProductStatusUrl = (productId, userId) => {
  return (
    baseUrl +
    `/data/bought?where=productId%3D%22${productId}%22%20and%20_ownerId%3D%22${userId}%22&count`
  );
};
export const editProductUrl = (id) => {
  return baseUrl + "/data/products/" + id;
};
export const requestToAddBuy = baseUrl + `/data/bought`;
export const getBuyCount = (productId) => {
  return (
    baseUrl +
    `/data/bought?where=productId%3D%22${productId}%22&distinct=_ownerId&count`
  );
};
