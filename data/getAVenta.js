"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

const laVenta = (elId) => {
  const [losProductos, setProductos] = useState([]);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/venta/${elId}`);
        setProductos(response.data);
      } catch (error) {
        console.error("Error fetching clientes:", error);
      }
    };

    fetchClientes();
  }, []);

  return losProductos;
};

export default laVenta;
