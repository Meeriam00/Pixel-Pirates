import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import slugify from "slugify";
import { ApiContext } from "../context/ApiContext";

const ProductDetail = () => {
  // url-deki title
  const { slug } = useParams();
  const { data} = useContext(ApiContext);
  const findProduct = data.find((item) => slugify(item.title) === slug);
  return (
    <>
      <h1>{findProduct?.price}</h1>
    </>
  );
};

export default ProductDetail;
