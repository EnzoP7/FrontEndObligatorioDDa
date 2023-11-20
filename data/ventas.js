"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

const ventas = () => {
  const [lasVentas, setLasVEntas] = useState([]);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await axios.get("http://localhost:5000/venta");
        setLasVEntas(response.data);
      } catch (error) {
        console.error("Error fetching clientes:", error);
      }
    };

    fetchClientes();
  }, []);

  return lasVentas;
};

export default ventas;
