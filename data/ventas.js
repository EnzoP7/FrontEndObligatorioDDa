"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

const ventas = () => {
  const [lasVentas, setLasVentas] = useState([]);

  useEffect(() => {
    const fetchVentas = async () => {
      try {
        const response = await axios.get("http://localhost:5000/venta");
        setLasVentas(response.data);
      } catch (error) {
        console.error("Error fetching ventas:", error);
      }
    };

    fetchVentas();
  }, []);

  return lasVentas;
};

export default ventas;
