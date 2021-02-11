// connect api
import axios from "axios";
import * as CONST from "../../../../Constants";
import { encodeURLWithParams } from "../../Common/components/ParamsEncode";

const PRODUCT_URL = `${CONST.API_URL}/Products`;

export const addProduct = (payload) => {
  return axios.post(`${PRODUCT_URL}`, payload);
};

export const editProduct = (payload, id) => {
  return axios.put(`${PRODUCT_URL}/${id}`, payload);
};

export const deleteProduct = (id) => {
  return axios.delete(`${PRODUCT_URL}/${id}`);
};

export const getProduct = (id) => {
  return axios.get(`${PRODUCT_URL}/${id}`);
};

export const getProductFilter = (
  orderingField,
  ascendingOrder,
  page,
  recordsPerPage,
  name,
  productGroupId,
  price,
  stock
) => {
  let payload = {
    page,
    recordsPerPage,
    orderingField,
    ascendingOrder,
    name,
    productGroupId,
    price,
    stock,
  };
  return axios.get(encodeURLWithParams(`${PRODUCT_URL}/filter`, payload));
};
