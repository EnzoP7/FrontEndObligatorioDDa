"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

const traerClientes = () => {
  const [LOSCLIENTES, setClientes] = useState([]);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await axios.get("http://localhost:5000/clients");
        setClientes(response.data);
      } catch (error) {
        console.error("Error fetching clientes:", error);
      }
    };

    fetchClientes();
  }, []);

  return LOSCLIENTES; // Retornar LOSCLIENTES para que puedan ser utilizados donde sea que uses este componente
};

export default traerClientes;
