"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

const useCliente = (id) => {
  const [elBelloCliente, setElBelloCliente] = useState([]);

  useEffect(() => {
    const fetchClientes = async () => {
      const elID = id;
      console.log("EL BELLO ID DE TRAER CLIENTE: ", elID);
      try {
        const response = await axios.get(
          `http://localhost:5000/clients/${elID}`
        );
        setElBelloCliente(response.data);
        console.log("Request Data:", response.config.data);
        console.log("Response Data:", response.data);
      } catch (error) {
        console.error("Error fetching clientes:", error);
      }
    };

    fetchClientes();
  }, []);

  return elBelloCliente; // Retor
};
export default useCliente;
