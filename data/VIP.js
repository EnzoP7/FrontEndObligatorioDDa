"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

const UsuariosVip = () => {
  const [USUARIOSVIP, setUsuariosVIP] = useState([]);

  useEffect(() => {
    const fetchVIP = async () => {
      try {
        const response = await axios.get("http://localhost:5000/clients/vip");
        setUsuariosVIP(response.data);
      } catch (error) {
        console.error("Error fetching VIP:", error);
      }
    };

    fetchVIP();
  }, []);

  return USUARIOSVIP; // Retornar USUARIOSVIP para que puedan ser utilizados donde sea que uses este componente
};

export default UsuariosVip;
