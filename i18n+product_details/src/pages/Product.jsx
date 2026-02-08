import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router";
import slugify from "slugify";
import { ApiContext } from "../context/ApiContext";

const Product = () => {
 
  const {data, setData}=useContext(ApiContext);

  return (
    <>
      {data.map((item) => (
        <div key={item.id} style={{marginBottom:"40px"}}>
          <h1>{item.title}</h1>
         <NavLink to={`/product/${slugify(item.title)}`}>View More</NavLink>
        </div>
      ))}
    </>
  );
};

export default Product;
