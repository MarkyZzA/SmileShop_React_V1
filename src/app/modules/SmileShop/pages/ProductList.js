import React from "react";
import ProductTable from "../components/ProductTable";

function ProductList(props) {
  return <ProductTable history={props.history}></ProductTable>;
}

export default ProductList;
