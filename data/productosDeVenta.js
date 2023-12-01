"use client";
import { useEffect, useState } from "react";
import axios from "axios";

const productosDeVenta = (elId) => {
  const [losproductosjeje, setLaVenta] = useState([]);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/venta/productos/${elId}`
        );
        setLaVenta(response.data);
      } catch (error) {
        console.error("Error fetching VENTAS:", error);
      }
    };

    fetchClientes();
  }, []);

  return losproductosjeje;
};

export default productosDeVenta;
