"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

const useUnsoloProducto = (elId) => {
  const [losProductos, setProductos] = useState([]);
  console.log("ELID que se hace en el axios: ", elId);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/products/${elId}`,
          {
            maxRedirects: 0,
          }
        );
        setProductos(response.data);
      } catch (error) {
        console.error("Error fetching un solo CLIENTE:", error);
      }
    };

    fetchClientes();
  }, [elId]);

  return losProductos;
};

export default useUnsoloProducto;
