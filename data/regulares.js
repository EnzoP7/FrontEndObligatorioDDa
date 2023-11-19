"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

const UsuariosRegulares = () => {
  const [USUARIOSREGULARES, setUsuariosRegulares] = useState([]);

  useEffect(() => {
    const fetchRegular = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/clients/regular"
        );
        setUsuariosRegulares(response.data);
      } catch (error) {
        console.error("Error fetching VIP:", error);
      }
    };

    fetchRegular();
  }, []);

  return USUARIOSREGULARES; // Retornar USUARIOSVIP para que puedan ser utilizados donde sea que uses este componente
};

export default UsuariosRegulares;
