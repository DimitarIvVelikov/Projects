import { api } from "./api.js";

const dataEndpoints = {
  getAll: "data/fruits?sortBy=_createdOn%20desc",
  getFruit: "data/fruits/",
  getSearch: (query) => {
    return `data/fruits?where=name%20LIKE%20%22${query}%22`;
  },
};

async function getAllFruits() {
  return api.get(dataEndpoints.getAll);
}

async function getFruitById(id) {
  return api.get(dataEndpoints.getFruit + id);
}

async function createFruit(data) {
  return api.post(dataEndpoints.getFruit, data);
}

async function editFruit(id, data) {
  return api.put(dataEndpoints.getFruit + id, data);
}

async function deleteFruit(id) {
  return api.del(dataEndpoints.getFruit + id);
}

async function getSearchResult(query) {
  return api.get(dataEndpoints.getSearch(query));
}
export const dataService = {
  getAllFruits,
  getFruitById,
  createFruit,
  editFruit,
  deleteFruit,
  getSearchResult,
};
