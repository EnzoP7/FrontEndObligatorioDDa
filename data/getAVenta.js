"use client";
import { useEffect, useState } from "react";
import axios from "axios";

const laVenta = (elId) => {
  const [laVentaData, setLaVenta] = useState([]);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/venta/${elId}`);
        setLaVenta(response.data);
      } catch (error) {
        console.error("Error fetching VENTAS:", error);
      }
    };

    fetchClientes();
  }, []);

  return laVentaData;
};

export default laVenta;
