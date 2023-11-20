"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

const losProductos = () => {
  const [losProductos, setProductos] = useState([]);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await axios.get("http://localhost:5000/products");
        setProductos(response.data);
      } catch (error) {
        console.error("Error fetching clientes:", error);
      }
    };

    fetchClientes();
  }, []);

  return losProductos;
};

export default losProductos;
